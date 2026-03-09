import { PieChart, AlertTriangle, Target } from 'lucide-react';
import { BudgetList } from '../components/budget/BudgetList';
import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/currency';

export function Budget() {
  const { totals } = useApp();
  
  // Example simplistic overall budget rule: 50/30/20 (Needs/Wants/Savings)
  // We'll just show a "Total Spending vs Income" metric conceptually
  const savingsRate = totals.income > 0 
    ? ((totals.income - totals.expenses) / totals.income) * 100 
    : 0;
    
  let statusColor = "text-emerald-500";
  let statusText = "You're on track to save!";
  let StatusIcon = Target;

  if (totals.expenses > totals.income) {
     statusColor = "text-red-500";
     statusText = "Warning: Spending exceeds income.";
     StatusIcon = AlertTriangle;
  } else if (savingsRate < 20 && totals.income > 0) {
     statusColor = "text-amber-500";
     statusText = "You're saving less than 20% of income.";
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <PieChart className="w-6 h-6 text-emerald-500" />
          Budget Tracker
        </h1>
        <p className="text-slate-500 mt-1">Set monthly limits, track category spending, and meet your savings goals.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 mt-4">
        {/* Overall Status Card */}
        <div className="card p-6 col-span-1 lg:col-span-3 border-l-4 border-l-emerald-500 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
           <div>
             <h3 className="text-slate-800 font-semibold flex items-center gap-2">
                <StatusIcon className={`w-5 h-5 ${statusColor}`} />
                Overall Status
             </h3>
             <p className="text-slate-600 mt-1">{statusText}</p>
           </div>
           
           <div className="flex gap-8 text-right bg-slate-50 p-4 rounded-xl w-full sm:w-auto">
              <div>
                <p className="text-sm text-slate-500">Savings Rate</p>
                <p className={`text-xl font-bold ${statusColor}`}>{savingsRate.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Left to budget</p>
                <p className="text-xl font-bold text-slate-800">{formatINR(totals.balance)}</p>
              </div>
           </div>
        </div>

        {/* Budget List */}
        <div className="col-span-1 lg:col-span-3">
          <BudgetList />
        </div>
      </div>
    </div>
  );
}
