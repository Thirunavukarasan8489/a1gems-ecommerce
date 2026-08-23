import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  iconColor?: 'blue' | 'green' | 'red' | 'purple' | 'amber';
  className?: string;
}

export default function KpiCard({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  iconColor = 'blue',
  className,
}: KpiCardProps) {
  
  const colorMap = {
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400',
    green: 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400',
    red: 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400',
    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400',
    amber: 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400',
  };

  return (
    <div className={cn("bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 transition-all hover:shadow-md", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-2">{value}</h3>
        </div>
        <div className={cn("p-3 rounded-lg", colorMap[iconColor])}>
          <Icon size={24} />
        </div>
      </div>
      
      {trend && trendValue && (
        <div className="mt-4 flex items-center gap-1.5 text-sm">
          {trend === 'up' && <TrendingUp size={16} className="text-emerald-500 dark:text-emerald-400" />}
          {trend === 'down' && <TrendingDown size={16} className="text-red-500 dark:text-red-400" />}
          {trend === 'neutral' && <Minus size={16} className="text-slate-400" />}
          
          <span className={cn(
            "font-medium",
            trend === 'up' ? "text-emerald-600 dark:text-emerald-400" : "",
            trend === 'down' ? "text-red-600 dark:text-red-400" : "",
            trend === 'neutral' ? "text-slate-500 dark:text-slate-400" : ""
          )}>
            {trendValue}
          </span>
          <span className="text-slate-500 dark:text-slate-400 ml-1">vs last month</span>
        </div>
      )}
    </div>
  );
}
