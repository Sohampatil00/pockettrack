import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/currency';

// Nice distinct colors for the segments
const COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', 
  '#8b5cf6', '#ec4899', '#6366f1', '#14b8a6', '#f97316'
];

export function CategoryChart() {
  const { transactions } = useApp();

  // Filter only expenses and aggregate by category
  const expensesByCategory = transactions
    .filter(tx => tx.type === 'expense')
    .reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {} as Record<string, number>);

  const data = Object.entries(expensesByCategory)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value); // Sort by largest expense first

  if (data.length === 0) {
    return (
      <div className="card p-6 lg:p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
        <p className="text-slate-500 mb-2">No expenses recorded yet.</p>
        <p className="text-sm text-slate-400">Add an expense to see your spending breakdown.</p>
      </div>
    );
  }

  return (
    <div className="card p-6 lg:p-8 h-full min-h-[400px] flex flex-col">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Expenses by Category</h3>
      
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
              animationBegin={0}
              animationDuration={800}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: any) => formatINR(Number(value))}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              wrapperStyle={{ paddingTop: '20px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
