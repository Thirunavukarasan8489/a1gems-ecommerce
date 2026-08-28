'use client';

import DataTable from '@/components/admin/ui/DataTable';
import StatusBadge from '@/components/admin/ui/StatusBadge';
import { Edit } from 'lucide-react';
import Link from 'next/link';
import { deleteContentPage } from '@/lib/actions/content.actions';
import DeleteConfirmButton from '@/components/admin/ui/DeleteConfirmButton';

type ContentPageRow = {
  _id: string;
  title: string;
  slug: string;
  isActive: boolean;
  updatedAt: string;
};

export default function PagesTable({ pages }: { pages: ContentPageRow[] }) {
  const columns = [
    {
      header: 'Title',
      cell: (item: ContentPageRow) => (
        <span className="font-medium text-gold-800 dark:text-gold-200">{item.title}</span>
      ),
    },
    {
      header: 'URL Slug',
      cell: (item: ContentPageRow) => (
        <span className="text-gold-600 dark:text-gold-400 font-mono text-sm">/{item.slug}</span>
      ),
    },
    {
      header: 'Status',
      cell: (item: ContentPageRow) => (
        <StatusBadge 
          label={item.isActive ? 'PUBLISHED' : 'DRAFT'} 
          variant={item.isActive ? 'success' : 'neutral'} 
        />
      ),
    },
    {
      header: 'Last Updated',
      cell: (item: ContentPageRow) => (
        <span className="text-gold-500 dark:text-gold-400 text-sm">
          {new Date(item.updatedAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: 'Actions',
      cell: (item: ContentPageRow) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/website/pages/${item._id}/edit`}
            className="p-1 text-gold-400 hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
          >
            <Edit size={16} />
          </Link>
          <DeleteConfirmButton 
            entityId={item._id} 
            entityName={item.title} 
            deleteAction={deleteContentPage} 
          />
        </div>
      ),
    },
  ];

  return <DataTable title="Content Pages" columns={columns} data={pages} />;
}
