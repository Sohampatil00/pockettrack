import { BarChart3 } from 'lucide-react';
import { CategoryChart } from '../components/reports/CategoryChart';
import { MonthlyTrend } from '../components/reports/MonthlyTrend';
import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/currency';

export function Reports() {
  const { totals } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-brand-500" />
          Financial Reports
        </h1>
        <p className="text-slate-500 mt-1">Visualize your spending and track income over time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 mt-4">
        {/* Simple Summary Header inside the reports page */}
        <div className="card p-6 bg-gradient-to-br from-indigo-500 to-blue-600 text-white col-span-1 lg:col-span-2 shadow-indigo-200">
           <h3 className="text-indigo-100 font-medium mb-1">Net Balance Overview</h3>
           <p className="text-3xl font-bold">{formatINR(totals.balance)}</p>
           <div className="mt-4 flex flex-wrap gap-6 text-sm">
             <div>
               <p className="text-indigo-200">Total Income</p>
               <p className="font-semibold">{formatINR(totals.income)}</p>
             </div>
             <div>
               <p className="text-indigo-200">Total Expenses</p>
               <p className="font-semibold">{formatINR(totals.expenses)}</p>
             </div>
           </div>
        </div>

        <MonthlyTrend />
        <CategoryChart />
      </div>
    </div>
  );
}
