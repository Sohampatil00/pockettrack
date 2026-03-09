import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/currency';

export function MonthlyTrend() {
  const { transactions } = useApp();

  // Group transactions by month
  const monthlyData = transactions.reduce((acc, tx) => {
    // Extract YYYY-MM
    const month = tx.date.substring(0, 7); 
    
    if (!acc[month]) {
      acc[month] = { name: month, income: 0, expense: 0 };
    }
    
    if (tx.type === 'income') {
      acc[month].income += tx.amount;
    } else {
      acc[month].expense += tx.amount;
    }
    
    return acc;
  }, {} as Record<string, { name: string, income: number, expense: number }>);

  // Convert to array and sort chronologically
  const data = Object.values(monthlyData)
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(-6); // Only show last 6 months

  // Format month label (e.g. 2026-03 -> Mar 2026)
  const formattedData = data.map(d => {
    const [year, monthNum] = d.name.split('-');
    const date = new Date(parseInt(year), parseInt(monthNum) - 1);
    const monthStr = date.toLocaleString('default', { month: 'short' });
    return {
      ...d,
      displayName: `${monthStr} ${year}`
    };
  });

  if (formattedData.length === 0) {
    return (
      <div className="card p-6 lg:p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
        <p className="text-slate-500 mb-2">No transactions recorded yet.</p>
        <p className="text-sm text-slate-400">Add income and expenses to see your trends over time.</p>
      </div>
    );
  }

  return (
    <div className="card p-6 lg:p-8 h-full min-h-[400px] flex flex-col">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Income vs Expenses</h3>
      
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={formattedData}
            margin={{ top: 10, right: 10, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="displayName" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickFormatter={(value) => `₹${value >= 1000 ? (value / 1000) + 'k' : value}`}
              dx={-10}
            />
            <Tooltip
              formatter={(value: any) => formatINR(Number(value))}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              cursor={{ fill: '#f1f5f9' }}
            />
            <Legend 
               wrapperStyle={{ paddingTop: '20px' }}
               iconType="circle" 
            />
            <Bar dataKey="income" name="Income" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={32} />
            <Bar dataKey="expense" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
