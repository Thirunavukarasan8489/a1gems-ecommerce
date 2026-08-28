'use client';

import DataTable from '@/components/admin/ui/DataTable';
import StatusBadge from '@/components/admin/ui/StatusBadge';
import { Edit } from 'lucide-react';
import Link from 'next/link';
import { deleteHomepageSection } from '@/lib/actions/cms.actions';
import DeleteConfirmButton from '@/components/admin/ui/DeleteConfirmButton';

type HomepageSectionRow = {
  _id: string;
  name: string;
  type: string;
  displayOrder: number;
  isActive: boolean;
  updatedAt: string;
};

export default function HomepageSectionsTable({ sections }: { sections: HomepageSectionRow[] }) {
  const columns = [
    {
      header: 'Section Name',
      cell: (item: HomepageSectionRow) => (
        <span className="font-medium text-gold-800 dark:text-gold-200">{item.name}</span>
      ),
    },
    {
      header: 'Type',
      cell: (item: HomepageSectionRow) => (
        <span className="text-gold-600 dark:text-gold-400">{item.type.replace(/_/g, ' ')}</span>
      ),
    },
    {
      header: 'Order',
      cell: (item: HomepageSectionRow) => (
        <span className="text-gold-600 dark:text-gold-400">{item.displayOrder}</span>
      ),
    },
    {
      header: 'Status',
      cell: (item: HomepageSectionRow) => (
        <StatusBadge 
          label={item.isActive ? 'ACTIVE' : 'INACTIVE'} 
          variant={item.isActive ? 'success' : 'neutral'} 
        />
      ),
    },
    {
      header: 'Last Updated',
      cell: (item: HomepageSectionRow) => (
        <span className="text-gold-500 dark:text-gold-400 text-sm">
          {new Date(item.updatedAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: 'Actions',
      cell: (item: HomepageSectionRow) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/website/homepage/${item._id}/edit`}
            className="p-1 text-gold-400 hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
          >
            <Edit size={16} />
          </Link>
          <DeleteConfirmButton 
            entityId={item._id} 
            entityName={item.name} 
            deleteAction={deleteHomepageSection} 
          />
        </div>
      ),
    },
  ];

  return <DataTable title="Homepage Sections" columns={columns} data={sections} />;
}
