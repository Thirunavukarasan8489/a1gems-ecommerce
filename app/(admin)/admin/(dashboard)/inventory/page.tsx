'use client';

import DataTable from '@/components/admin/ui/DataTable';
import StatusBadge from '@/components/admin/ui/StatusBadge';
import { PackagePlus, RefreshCw } from 'lucide-react';

// Mock Data
const MOCK_INVENTORY = [
  { id: 'SKU-EMR-001', name: 'Emerald Ring', stock: 12, reserved: 2, available: 10, status: 'In Stock' },
  { id: 'SKU-RBY-002', name: 'Ruby Necklace', stock: 3, reserved: 1, available: 2, status: 'Low Stock' },
  { id: 'SKU-SPH-003', name: 'Sapphire Bracelet', stock: 0, reserved: 0, available: 0, status: 'Out of Stock' },
  { id: 'SKU-DIA-004', name: 'Diamond Studs', stock: 8, reserved: 0, available: 8, status: 'In Stock' },
];

export default function InventoryPage() {
  
  const columns = [
    {
      header: 'SKU / Product',
      cell: (item: typeof MOCK_INVENTORY[0]) => (
        <div>
          <p className="font-medium text-slate-800 dark:text-slate-200">{item.name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{item.id}</p>
        </div>
      ),
    },
    {
      header: 'Total Stock',
      accessorKey: 'stock' as const,
    },
    {
      header: 'Reserved',
      accessorKey: 'reserved' as const,
    },
    {
      header: 'Available',
      cell: (item: typeof MOCK_INVENTORY[0]) => (
        <span className="font-bold text-slate-800 dark:text-slate-200">{item.available}</span>
      ),
    },
    {
      header: 'Status',
      cell: (item: typeof MOCK_INVENTORY[0]) => {
        let variant: 'success' | 'warning' | 'danger' = 'success';
        if (item.status === 'Low Stock') variant = 'warning';
        if (item.status === 'Out of Stock') variant = 'danger';
        
        return <StatusBadge label={item.status} variant={variant} />;
      },
    },
    {
      header: 'Actions',
      cell: () => (
        <div className="flex items-center gap-2">
          <button className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" title="Adjust Stock">
            <RefreshCw size={16} />
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
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Inventory Management</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Track stock levels and reservations.</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors w-full sm:w-auto flex items-center gap-2 justify-center">
            <PackagePlus size={16} /> Add Stock
          </button>
        </div>

        {/* Data Table */}
        <DataTable 
          title="Stock Levels" 
          columns={columns} 
          data={MOCK_INVENTORY} 
        />
        
      </div>
  );
}
