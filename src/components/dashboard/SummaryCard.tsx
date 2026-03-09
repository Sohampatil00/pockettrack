import { useEffect, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { formatINR } from '../../utils/currency';

interface SummaryCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: string;
  colorClass: 'brand' | 'accent' | 'danger';
}

export function SummaryCard({ title, value, icon: Icon, trend, colorClass }: SummaryCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  // Simple number animation effect
  useEffect(() => {
    let startTimestamp: number;
    const duration = 500; // ms
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      setDisplayValue(progress * value);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [value]);

  const bgClasses = {
    brand: 'bg-brand-50 text-brand-600',
    accent: 'bg-accent-50 text-accent-600',
    danger: 'bg-red-50 text-red-600',
  };

  const gradientClasses = {
    brand: 'gradient-brand',
    accent: 'gradient-accent',
    danger: 'gradient-danger',
  };

  return (
    <div className="card relative overflow-hidden flex flex-col p-6 animate-slide-up group">
      {/* Top accent strip */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 ${gradientClasses[colorClass]}`} />
      
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wide">
          {title}
        </h3>
        <div className={`p-2.5 rounded-xl ${bgClasses[colorClass]} transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      
      <div className="mt-auto">
        <div className="text-3xl font-bold text-slate-900 tracking-tight">
          {formatINR(displayValue)}
        </div>
        
        {trend && (
          <div className="mt-2 text-sm text-slate-500 font-medium flex items-center gap-1.5">
            <span className={trend.startsWith('+') ? 'text-brand-600' : 'text-slate-500'}>
              {trend}
            </span>
            <span>from last period</span>
          </div>
        )}
      </div>
    </div>
  );
}
