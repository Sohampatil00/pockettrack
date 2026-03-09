import { useState, useMemo } from 'react';
import { Trash2, Search, Filter, History, PiggyBank } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatDate, formatINR } from '../utils/currency';
import type { TransactionType } from '../types';

export function Transactions() {
  const { transactions, deleteTransaction } = useApp();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<TransactionType | 'all'>('all');

  // Filter functionality
  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      const matchesSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            tx.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || tx.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [transactions, searchTerm, filterType]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <History className="w-6 h-6 text-brand-500" />
            Transaction History
          </h1>
          <p className="text-slate-500 mt-1">View and manage all your past records.</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="card p-4 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search descriptions or categories..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select 
            className="form-select w-40" 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as TransactionType | 'all')}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      {/* Transactions List */}
      <div className="card overflow-hidden">
        {filteredTransactions.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
               <PiggyBank className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-1">No transactions found</h3>
            <p className="text-slate-500 max-w-sm">
              {transactions.length === 0 
                ? "You haven't added any transactions yet. Go to the Dashboard to get started."
                : "No transactions match your current filters."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="py-4 px-6 font-semibold text-sm text-slate-600">Date</th>
                  <th className="py-4 px-6 font-semibold text-sm text-slate-600">Description</th>
                  <th className="py-4 px-6 font-semibold text-sm text-slate-600">Category</th>
                  <th className="py-4 px-6 font-semibold text-sm text-slate-600 text-right">Amount</th>
                  <th className="py-4 px-6 font-semibold text-sm text-slate-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-4 px-6 text-sm text-slate-500 whitespace-nowrap">
                      {formatDate(tx.date)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-slate-900">{tx.description}</div>
                      <div className="text-xs text-slate-500 sm:hidden mt-0.5">{tx.category}</div>
                    </td>
                    <td className="py-4 px-6 hidden sm:table-cell text-sm text-slate-600">
                      <span className="inline-flex py-1 px-2.5 bg-white border border-slate-200 rounded-lg shadow-sm font-medium">
                        {tx.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-medium whitespace-nowrap">
                      <span className={tx.type === 'income' ? 'text-brand-600' : 'text-slate-900'}>
                        {tx.type === 'income' ? '+' : '-'}{formatINR(tx.amount)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={() => deleteTransaction(tx.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="Delete transaction"
                        aria-label={`Delete ${tx.description}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
    </div>
  );
}
