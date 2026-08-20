import KpiCard from '@/components/admin/ui/KpiCard';
import { ShoppingCart, DollarSign, Users, Package } from 'lucide-react';
import { getDashboardKpis } from '@/lib/actions/dashboard';

// Fallback currency formatter
const formatINR = (amount: number) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
};

export default async function AdminDashboard() {
  const kpiData = await getDashboardKpis();
  const data = kpiData.data || { totalRevenue: 0, orderCount: 0, customerCount: 0, lowStockCount: 0 };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Welcome back, here&apos;s what&apos;s happening today.</p>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard 
          title="Total Revenue" 
          value={formatINR(data.totalRevenue)} 
          icon={DollarSign} 
          iconColor="green"
          trend="up"
          trendValue="+12.5%"
        />
        <KpiCard 
          title="Orders" 
          value={data.orderCount.toLocaleString()} 
          icon={ShoppingCart} 
          iconColor="blue"
          trend="up"
          trendValue="+5.2%"
        />
        <KpiCard 
          title="Customers" 
          value={data.customerCount.toLocaleString()} 
          icon={Users} 
          iconColor="purple"
          trend="neutral"
          trendValue="0.0%"
        />
        <KpiCard 
          title="Low Stock Items" 
          value={data.lowStockCount.toLocaleString()} 
          icon={Package} 
          iconColor="red"
          trend="down"
          trendValue="-2.1%"
        />
      </div>

      {/* Charts and Tables Placeholder Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-6 flex items-center justify-center min-h-[400px]">
          <p className="text-slate-500 dark:text-slate-400 text-sm">Revenue Chart Placeholder (Recharts)</p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-6 flex items-center justify-center min-h-[400px]">
          <p className="text-slate-500 dark:text-slate-400 text-sm">Recent Activity Placeholder</p>
        </div>
        
      </div>
    </div>
  );
}
