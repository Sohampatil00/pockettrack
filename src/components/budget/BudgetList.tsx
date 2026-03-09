import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/currency';
import { IndianRupee } from 'lucide-react';
import type { Category } from '../../types';

// Simple hardcoded budget limits for demo purposes
const BUDGET_LIMITS: Partial<Record<Category, number>> = {
  'Food & Dining': 15000,
  'Transport': 5000,
  'Shopping': 10000,
  'Entertainment': 4000,
  'Bills & Utilities': 8000,
  'Healthcare': 5000,
  'Education': 10000,
};

export function BudgetList() {
  const { transactions } = useApp();

  // Calculate total spent per category this month (simplified: all time for demo)
  const spentByCategory = transactions
    .filter(tx => tx.type === 'expense')
    .reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {} as Record<string, number>);

  // Generate budget items
  const budgetItems = Object.entries(BUDGET_LIMITS).map(([category, limit]) => {
    const spent = spentByCategory[category] || 0;
    const progress = Math.min((spent / limit) * 100, 100);
    const isOver = spent > limit;
    
    // Determine color based on progress
    let colorClass = 'bg-brand-500'; // Green: Good
    if (isOver) {
      colorClass = 'bg-red-500'; // Red: Over budget
    } else if (progress > 85) {
      colorClass = 'bg-amber-500'; // Amber: Nearing limit
    }

    return {
      category,
      limit,
      spent,
      progress,
      isOver,
      colorClass
    };
  }).sort((a, b) => b.progress - a.progress); // Show most critical first

  return (
    <div className="card p-6 lg:p-8">
      <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
        <IndianRupee className="w-5 h-5 text-emerald-500" />
        Monthly Category Limits
      </h3>
      
      <div className="space-y-6">
        {budgetItems.map((item) => (
          <div key={item.category} className="group">
            <div className="flex justify-between items-end mb-2">
              <div>
                <span className="font-medium text-slate-800">{item.category}</span>
                {item.isOver && (
                   <span className="ml-2 text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full inline-block animate-pulse">
                     Over Budget
                   </span>
                )}
              </div>
              <div className="text-right">
                <span className={`font-semibold ${item.isOver ? 'text-red-600' : 'text-slate-900'}`}>
                  {formatINR(item.spent)}
                </span>
                <span className="text-sm text-slate-400 ml-1">
                  / {formatINR(item.limit)}
                </span>
              </div>
            </div>
            
            {/* Progress Bar Background */}
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              {/* Progress Bar Fill */}
              <div 
                className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${item.colorClass}`}
                style={{ width: `${item.progress}%` }}
              />
            </div>
            
            <p className="text-xs text-slate-500 mt-1.5 flex justify-between">
              <span>{item.progress.toFixed(1)}% consumed</span>
              <span>
                {item.isOver 
                  ? `Exceeded by ${formatINR(item.spent - item.limit)}` 
                  : `${formatINR(item.limit - item.spent)} remaining`}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
