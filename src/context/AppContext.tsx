import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import type { Transaction, AppState, Totals } from '../types';

// ─── Actions ────────────────────────────────────────────────────────────────

// We'll manage transactions state locally via standard React state now 
// to easily sync with Supabase async calls without complex reducer patterns.

// ─── Utilities ──────────────────────────────────────────────────────────────

function computeTotals(transactions: Transaction[]): Totals {
  let income = 0;
  let expenses = 0;
  for (const tx of transactions) {
    if (tx.type === 'income') income += tx.amount;
    else expenses += tx.amount;
  }
  return { income, expenses, balance: income - expenses };
}

// ─── Context ────────────────────────────────────────────────────────────────

interface AppContextValue extends AppState {
  user: User | null;
  loading: boolean;
  addTransaction: (tx: Omit<Transaction, 'id' | 'createdAt'>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totals, setTotals] = useState<Totals>({ income: 0, expenses: 0, balance: 0 });

  // Update totals whenever transactions change
  useEffect(() => {
    setTotals(computeTotals(transactions));
  }, [transactions]);

  // Auth & Data fetching sequence
  useEffect(() => {
    const initialize = async () => {
      // Get current session
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchTransactions();
      }
      
      setLoading(false);
    };

    initialize();

    // Listen to Auth state changes auto-magically
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchTransactions();
      } else {
        setTransactions([]);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchTransactions = async () => {
    try {
      // Thanks to RLS, it'll only fetch the ones belonging to auth.uid()
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Map DB snake_case columns to camelCase types
      const mapped: Transaction[] = (data || []).map(row => ({
        id: row.id,
        type: row.type,
        date: row.date,
        description: row.description,
        amount: row.amount,
        category: row.category,
        createdAt: row.created_at
      }));
      setTransactions(mapped);
    } catch (err) {
      console.error('Error fetching transactions:', err);
    }
  };

  const addTransaction = useCallback(
    async (tx: Omit<Transaction, 'id' | 'createdAt'>) => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('transactions')
          .insert([{
             user_id: user.id,
             type: tx.type,
             date: tx.date,
             description: tx.description,
             amount: tx.amount,
             category: tx.category,
          }])
          .select()
          .single();

        if (error) throw error;

        const newTx: Transaction = {
          id: data.id,
          type: data.type,
          date: data.date,
          description: data.description,
          amount: data.amount,
          category: data.category,
          createdAt: data.created_at
        };

        setTransactions((prev: Transaction[]) => [newTx, ...prev]);
      } catch (err) {
        console.error('Error adding transaction:', err);
        throw err;
      }
    },
    [user]
  );

  const deleteTransaction = useCallback(
    async (id: string) => {
      try {
        const { error } = await supabase
          .from('transactions')
          .delete()
          .eq('id', id);

        if (error) throw error;
        setTransactions((prev: Transaction[]) => prev.filter((tx: Transaction) => tx.id !== id));
      } catch (err) {
        console.error('Error deleting transaction:', err);
        throw err;
      }
    },
    []
  );

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  return (
    <AppContext.Provider 
      value={{ 
        transactions, 
        totals, 
        user, 
        loading, 
        addTransaction, 
        deleteTransaction, 
        signOut 
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
