'use client';

import DataTable from '@/components/admin/ui/DataTable';
import StatusBadge from '@/components/admin/ui/StatusBadge';
import { Eye, Edit } from 'lucide-react';

// Mock Data
const MOCK_ORDERS = [
  { id: 'ORD-1001', customer: 'John Doe', date: '2023-10-25', amount: '₹1,20,000', status: 'Pending' },
  { id: 'ORD-1002', customer: 'Jane Smith', date: '2023-10-24', amount: '₹45,000', status: 'Processing' },
  { id: 'ORD-1003', customer: 'Acme Corp', date: '2023-10-23', amount: '₹3,50,000', status: 'Shipped' },
  { id: 'ORD-1004', customer: 'Bob Wilson', date: '2023-10-22', amount: '₹85,000', status: 'Delivered' },
];

export default function OrdersPage() {
  
  const columns = [
    {
      header: 'Order ID',
      accessorKey: 'id' as const,
      cell: (item: typeof MOCK_ORDERS[0]) => (
        <span className="font-medium text-blue-600 dark:text-blue-400">{item.id}</span>
      ),
    },
    {
      header: 'Customer',
      accessorKey: 'customer' as const,
    },
    {
      header: 'Date',
      accessorKey: 'date' as const,
    },
    {
      header: 'Amount',
      accessorKey: 'amount' as const,
    },
    {
      header: 'Status',
      cell: (item: typeof MOCK_ORDERS[0]) => {
        let variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral' = 'neutral';
        if (item.status === 'Pending') variant = 'warning';
        if (item.status === 'Processing') variant = 'info';
        if (item.status === 'Shipped') variant = 'info';
        if (item.status === 'Delivered') variant = 'success';
        if (item.status === 'Cancelled') variant = 'danger';
        
        return <StatusBadge label={item.status} variant={variant} />;
      },
    },
    {
      header: 'Actions',
      cell: () => (
        <div className="flex items-center gap-2">
          <button className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Eye size={16} />
          </button>
          <button className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Edit size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Orders</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage customer orders and processing.</p>
          </div>
        </div>

        {/* Data Table */}
        <DataTable 
          title="Recent Orders" 
          columns={columns} 
          data={MOCK_ORDERS} 
        />
        
      </div>
  );
}
