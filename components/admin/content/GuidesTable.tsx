'use client';

import DataTable from '@/components/admin/ui/DataTable';
import StatusBadge from '@/components/admin/ui/StatusBadge';
import { Edit } from 'lucide-react';
import Link from 'next/link';
import { deleteGuide } from '@/lib/actions/content.actions';
import DeleteConfirmButton from '@/components/admin/ui/DeleteConfirmButton';

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
        <span className="font-medium text-gold-800 dark:text-gold-200">{item.title}</span>
      ),
    },
    {
      header: 'Read Time',
      cell: (item: GuideRow) => (
        <span className="text-gold-600 dark:text-gold-400">{item.readTimeMinutes} min</span>
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
        <span className="text-gold-500 dark:text-gold-400 text-sm">
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
            className="p-1 text-gold-400 hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
          >
            <Edit size={16} />
          </Link>
          <DeleteConfirmButton 
            entityId={item._id} 
            entityName={item.title} 
            deleteAction={deleteGuide} 
          />
        </div>
      ),
    },
  ];

  return <DataTable title="Gemstone Guides" columns={columns} data={guides} />;
}
