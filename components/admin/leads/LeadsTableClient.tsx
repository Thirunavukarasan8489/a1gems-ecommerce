'use client';

import DataTable from '@/components/admin/ui/DataTable';
import StatusPill from '@/components/admin/ui/StatusPill';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { LeadType } from '@/lib/types';

interface LeadsTableClientProps {
  title: string;
  data: LeadType[];
}

export default function LeadsTableClient({ title, data }: LeadsTableClientProps) {
  const columns = [
    {
      header: 'Customer',
      cell: (lead: LeadType) => (
        <div>
          <p className="font-medium text-slate-900 dark:text-slate-100">{lead.customerName}</p>
          <p className="text-xs text-slate-500">{lead.phone}</p>
        </div>
      )
    },
    {
      header: 'Enquiry',
      cell: (lead: LeadType) => (
        <div>
          <p className="text-slate-800 dark:text-slate-200 line-clamp-1 max-w-[250px]">{lead.message}</p>
          <p className="text-xs text-slate-500">{lead.source}</p>
        </div>
      )
    },
    {
      header: 'Status',
      cell: (lead: LeadType) => <StatusPill status={lead.status} type="lead" />
    },
    {
      header: 'Date',
      cell: (lead: LeadType) => (
        <span className="text-slate-600 dark:text-slate-400">
          {new Date(lead.createdAt).toLocaleDateString()}
        </span>
      )
    },
    {
      header: 'Action',
      cell: (lead: LeadType) => (
        <Link 
          href={`/admin/leads/${lead._id}`} 
          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-md transition-colors"
        >
          <Eye size={14} /> View
        </Link>
      )
    }
  ];

  return <DataTable title={title} columns={columns} data={data} />;
}
