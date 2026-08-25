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
    blue: 'bg-gold-500/15 text-gold-700 dark:bg-gold-500/20 dark:text-gold-300 border border-gold-500/30',
    green: 'bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-500/30',
    red: 'bg-red-500/15 text-red-700 dark:bg-red-500/20 dark:text-red-300 border border-red-500/30',
    purple: 'bg-plum-500/15 text-plum-700 dark:bg-plum-500/20 dark:text-plum-300 border border-plum-500/30',
    amber: 'bg-gold-400/20 text-gold-800 dark:bg-gold-400/25 dark:text-gold-200 border border-gold-400/40',
  };

  return (
    <div className={cn("bg-white dark:bg-plum-900 rounded-xl p-6 shadow-xs border border-ivory-300 dark:border-plum-800 transition-all hover:border-gold-400/40 hover:shadow-md", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-plum-600 dark:text-plum-300">{title}</p>
          <h3 className="text-2xl font-bold text-plum-900 dark:text-ivory-100 mt-2">{value}</h3>
        </div>
        <div className={cn("p-3 rounded-xl", colorMap[iconColor])}>
          <Icon size={24} />
        </div>
      </div>
      
      {trend && trendValue && (
        <div className="mt-4 flex items-center gap-1.5 text-sm">
          {trend === 'up' && <TrendingUp size={16} className="text-emerald-600 dark:text-emerald-400" />}
          {trend === 'down' && <TrendingDown size={16} className="text-red-600 dark:text-red-400" />}
          {trend === 'neutral' && <Minus size={16} className="text-plum-400" />}
          
          <span className={cn(
            "font-semibold",
            trend === 'up' ? "text-emerald-700 dark:text-emerald-400" : "",
            trend === 'down' ? "text-red-700 dark:text-red-400" : "",
            trend === 'neutral' ? "text-plum-600 dark:text-plum-300" : ""
          )}>
            {trendValue}
          </span>
          <span className="text-plum-500 dark:text-plum-400 ml-1">vs last month</span>
        </div>
      )}
    </div>
  );
}
