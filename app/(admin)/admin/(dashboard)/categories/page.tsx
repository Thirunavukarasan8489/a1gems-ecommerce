'use client';

import DataTable from '@/components/admin/ui/DataTable';
import StatusBadge from '@/components/admin/ui/StatusBadge';
import { Edit, Trash2 } from 'lucide-react';

// Mock Data
const MOCK_CATEGORIES = [
  { id: 'C001', name: 'Rings', productCount: 45, status: 'Active' },
  { id: 'C002', name: 'Necklaces', productCount: 32, status: 'Active' },
  { id: 'C003', name: 'Bracelets', productCount: 18, status: 'Active' },
  { id: 'C004', name: 'Earrings', productCount: 27, status: 'Inactive' },
];

export default function CategoriesPage() {
  
  const columns = [
    {
      header: 'Category Name',
      cell: (item: typeof MOCK_CATEGORIES[0]) => (
        <div>
          <p className="font-medium text-slate-800 dark:text-slate-200">{item.name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">ID: {item.id}</p>
        </div>
      ),
    },
    {
      header: 'Total Products',
      accessorKey: 'productCount' as const,
    },
    {
      header: 'Status',
      cell: (item: typeof MOCK_CATEGORIES[0]) => {
        let variant: 'success' | 'warning' | 'danger' | 'neutral' = 'success';
        if (item.status === 'Inactive') variant = 'neutral';
        
        return <StatusBadge label={item.status} variant={variant} />;
      },
    },
    {
      header: 'Actions',
      cell: () => (
        <div className="flex items-center gap-2">
          <button className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Edit size={16} />
          </button>
          <button className="p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
            <Trash2 size={16} />
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
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Categories</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage product categories.</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors w-full sm:w-auto">
            + Add Category
          </button>
        </div>

        {/* Data Table */}
        <DataTable 
          title="All Categories" 
          columns={columns} 
          data={MOCK_CATEGORIES} 
        />
        
      </div>
  );
}
