export type TransactionType = 'income' | 'expense';

export type Category =
  | 'Salary'
  | 'Food & Dining'
  | 'Transport'
  | 'Shopping'
  | 'Healthcare'
  | 'Entertainment'
  | 'Bills & Utilities'
  | 'Education'
  | 'Investment'
  | 'Other';

export interface Transaction {
  id: string;
  type: TransactionType;
  date: string;       // ISO date string YYYY-MM-DD
  description: string;
  amount: number;     // always positive; sign determined by type
  category: Category;
  createdAt: string;  // Timestamptz string from Supabase
}

export interface Totals {
  income: number;
  expenses: number;
  balance: number;
}

export interface AppState {
  transactions: Transaction[];
  totals: Totals;
}

export const CATEGORIES: Category[] = [
  'Salary',
  'Food & Dining',
  'Transport',
  'Shopping',
  'Healthcare',
  'Entertainment',
  'Bills & Utilities',
  'Education',
  'Investment',
  'Other',
];
