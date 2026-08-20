'use client';

import DataTable from '@/components/admin/ui/DataTable';
import StatusBadge from '@/components/admin/ui/StatusBadge';
import { Eye, Mail, Edit } from 'lucide-react';

// Mock Data
const MOCK_CUSTOMERS = [
  { id: 'CUST-001', name: 'John Doe', email: 'john.doe@example.com', type: 'Personal', orders: 5, status: 'Active' },
  { id: 'CUST-002', name: 'Acme Corp', email: 'billing@acmecorp.com', type: 'Business', orders: 12, status: 'Active' },
  { id: 'CUST-003', name: 'Jane Smith', email: 'jane.smith@example.com', type: 'Personal', orders: 1, status: 'Inactive' },
];

export default function CustomersPage() {
  
  const columns = [
    {
      header: 'Customer',
      cell: (item: typeof MOCK_CUSTOMERS[0]) => (
        <div>
          <p className="font-medium text-slate-800 dark:text-slate-200">{item.name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{item.id}</p>
        </div>
      ),
    },
    {
      header: 'Email',
      accessorKey: 'email' as const,
    },
    {
      header: 'Type',
      cell: (item: typeof MOCK_CUSTOMERS[0]) => {
        let variant: 'info' | 'neutral' = 'neutral';
        if (item.type === 'Business') variant = 'info';
        
        return <StatusBadge label={item.type} variant={variant} />;
      },
    },
    {
      header: 'Total Orders',
      accessorKey: 'orders' as const,
    },
    {
      header: 'Status',
      cell: (item: typeof MOCK_CUSTOMERS[0]) => {
        let variant: 'success' | 'danger' | 'neutral' = 'success';
        if (item.status === 'Inactive') variant = 'neutral';
        
        return <StatusBadge label={item.status} variant={variant} />;
      },
    },
    {
      header: 'Actions',
      cell: () => (
        <div className="flex items-center gap-2">
          <button className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Mail size={16} />
          </button>
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
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Customers</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">View and manage customer profiles.</p>
          </div>
        </div>

        {/* Data Table */}
        <DataTable 
          title="Customer Directory" 
          columns={columns} 
          data={MOCK_CUSTOMERS} 
        />
        
      </div>
  );
}
