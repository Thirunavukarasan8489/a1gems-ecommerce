import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type StatusVariant = 
  | 'success' // e.g. Delivered, Active, Paid
  | 'warning' // e.g. Pending, Low Stock
  | 'danger'  // e.g. Cancelled, Failed, Out of Stock
  | 'info'    // e.g. Processing, Shipped
  | 'neutral'; // e.g. Draft, Inactive

interface StatusBadgeProps {
  label: string;
  variant?: StatusVariant;
  className?: string;
}

export default function StatusBadge({ label, variant = 'neutral', className }: StatusBadgeProps) {
  
  const variantStyles = {
    success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800',
    warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800',
    danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800',
    info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800',
    neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700',
  };

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", variantStyles[variant], className)}>
      {label}
    </span>
  );
}
