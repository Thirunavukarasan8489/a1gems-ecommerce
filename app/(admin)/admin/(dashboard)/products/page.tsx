'use client';

import DataTable from '@/components/admin/ui/DataTable';
import StatusBadge from '@/components/admin/ui/StatusBadge';
import { Edit, Trash2 } from 'lucide-react';

// Mock Data
const MOCK_PRODUCTS = [
  { id: '1', image: 'https://via.placeholder.com/40', name: 'Emerald Ring', category: 'Rings', price: '₹45,000', stock: 12, status: 'Active' },
  { id: '2', image: 'https://via.placeholder.com/40', name: 'Ruby Necklace', category: 'Necklaces', price: '₹1,20,000', stock: 3, status: 'Low Stock' },
  { id: '3', image: 'https://via.placeholder.com/40', name: 'Sapphire Bracelet', category: 'Bracelets', price: '₹85,000', stock: 0, status: 'Out of Stock' },
  { id: '4', image: 'https://via.placeholder.com/40', name: 'Diamond Studs', category: 'Earrings', price: '₹2,50,000', stock: 8, status: 'Active' },
];

export default function ProductsPage() {
  
  const columns = [
    {
      header: 'Product',
      cell: (item: typeof MOCK_PRODUCTS[0]) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-md overflow-hidden flex-shrink-0 border border-slate-200 dark:border-slate-700">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-medium text-slate-800 dark:text-slate-200">{item.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">ID: {item.id}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessorKey: 'category' as const,
    },
    {
      header: 'Price',
      accessorKey: 'price' as const,
    },
    {
      header: 'Stock',
      cell: (item: typeof MOCK_PRODUCTS[0]) => (
        <span className={item.stock < 5 ? 'text-red-600 dark:text-red-400 font-medium' : ''}>
          {item.stock}
        </span>
      ),
    },
    {
      header: 'Status',
      cell: (item: typeof MOCK_PRODUCTS[0]) => {
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
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Products</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your catalogue and inventory.</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors w-full sm:w-auto">
            + Add Product
          </button>
        </div>

        {/* Data Table */}
        <DataTable 
          title="All Products" 
          columns={columns} 
          data={MOCK_PRODUCTS} 
        />
        
      </div>
  );
}
