"use client";

import DataTable from '@/components/admin/ui/DataTable';
import StatusBadge from '@/components/admin/ui/StatusBadge';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { deleteCategory } from '@/lib/actions/category.actions';

type CategoryRow = {
  _id: string;
  name: string;
  slug: string;
  isActive?: boolean;
  productCount?: number;
};

export default function CategoriesTable({ categories }: { categories: CategoryRow[] }) {
  const columns = [
    {
      header: 'Category Name',
      cell: (item: CategoryRow) => (
        <div>
          <p className="font-medium text-slate-800 dark:text-slate-200">{item.name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">/{item.slug}</p>
        </div>
      ),
    },
    {
      header: 'Total Products',
      cell: (item: CategoryRow) => (
        <span className="text-slate-700 dark:text-slate-300">{item.productCount ?? 0}</span>
      ),
    },
    {
      header: 'Status',
      cell: (item: CategoryRow) => {
        const isActive = item.isActive !== false;
        return <StatusBadge label={isActive ? 'Active' : 'Inactive'} variant={isActive ? 'success' : 'neutral'} />;
      },
    },
    {
      header: 'Actions',
      cell: (item: CategoryRow) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/categories/${item._id}/edit`}
            className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Edit size={16} />
          </Link>
          <form action={async () => { await deleteCategory(item._id); }}>
            <button
              type="submit"
              className="p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              title="Delete category"
            >
              <Trash2 size={16} />
            </button>
          </form>
        </div>
      ),
    },
  ];

  return <DataTable title="All Categories" columns={columns} data={categories} />;
}