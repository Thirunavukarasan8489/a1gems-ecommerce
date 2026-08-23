'use client';

import DataTable from '@/components/admin/ui/DataTable';
import StatusBadge from '@/components/admin/ui/StatusBadge';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

type GuideRow = {
  _id: string;
  title: string;
  slug: string;
  readTimeMinutes: number;
  isActive: boolean;
  publishedAt: string;
};

export default function GuidesTable({ guides }: { guides: GuideRow[] }) {
  const columns = [
    {
      header: 'Title',
      cell: (item: GuideRow) => (
        <span className="font-medium text-slate-800 dark:text-slate-200">{item.title}</span>
      ),
    },
    {
      header: 'Read Time',
      cell: (item: GuideRow) => (
        <span className="text-slate-600 dark:text-slate-400">{item.readTimeMinutes} min</span>
      ),
    },
    {
      header: 'Status',
      cell: (item: GuideRow) => (
        <StatusBadge 
          label={item.isActive ? 'PUBLISHED' : 'DRAFT'} 
          variant={item.isActive ? 'success' : 'neutral'} 
        />
      ),
    },
    {
      header: 'Published Date',
      cell: (item: GuideRow) => (
        <span className="text-slate-500 dark:text-slate-400 text-sm">
          {new Date(item.publishedAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: 'Actions',
      cell: (item: GuideRow) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/content/guides/${item._id}/edit`}
            className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Edit size={16} />
          </Link>
          <button
            type="button"
            className="p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            title="Delete guide"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return <DataTable title="Gemstone Guides" columns={columns} data={guides} />;
}
