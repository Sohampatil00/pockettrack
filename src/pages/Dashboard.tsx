
import { ArrowDownRight, ArrowUpRight, Wallet } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SummaryCard } from '../components/dashboard/SummaryCard';
import { TransactionForm } from '../components/dashboard/TransactionForm';
import { InsightsCard } from '../components/dashboard/InsightsCard';

export function Dashboard() {
  const { totals } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Financial Overview</h1>
        <p className="text-slate-500 mt-1">Track your daily income, expenses, and current balance.</p>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard 
          title="Total Income"
          value={totals.income}
          icon={ArrowUpRight}
          colorClass="brand"
        />
        <SummaryCard 
          title="Total Expenses"
          value={totals.expenses}
          icon={ArrowDownRight}
          colorClass="danger"
        />
        <SummaryCard 
          title="Net Balance"
          value={totals.balance}
          icon={Wallet}
          colorClass="accent"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Wider on Desktop) -> Add Transaction Form */}
        <div className="lg:col-span-2">
          <TransactionForm />
        </div>

        {/* Right Column -> Insights Card */}
        <div className="lg:col-span-1">
          <InsightsCard />
        </div>
        
      </div>
      
    </div>
  );
}
