"use client";

import DataTable from '@/components/admin/ui/DataTable';
import StatusBadge from '@/components/admin/ui/StatusBadge';
import { Eye, Mail } from 'lucide-react';
import Link from 'next/link';

type CustomerRow = {
  _id?: string;
  name: string;
  email?: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
};

export default function CustomersTable({ customers }: { customers: CustomerRow[] }) {
  const columns = [
    {
      header: 'Customer',
      cell: (item: CustomerRow) => (
        <div>
          <p className="font-medium text-slate-800 dark:text-slate-200">{item.name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{item.phone}</p>
        </div>
      ),
    },
    {
      header: 'Email',
      cell: (item: CustomerRow) => (
        <span className="text-slate-600 dark:text-slate-400 text-sm">{item.email ?? '—'}</span>
      ),
    },
    {
      header: 'Total Orders',
      cell: (item: CustomerRow) => (
        <span className="font-medium text-slate-700 dark:text-slate-300">{item.totalOrders}</span>
      ),
    },
    {
      header: 'Total Spent',
      cell: (item: CustomerRow) => (
        <span className="font-medium text-slate-700 dark:text-slate-300">
          ₹{(item.totalSpent ?? 0).toLocaleString('en-IN')}
        </span>
      ),
    },
    {
      header: 'Last Order',
      cell: (item: CustomerRow) => (
        <span className="text-slate-600 dark:text-slate-400 text-sm">
          {item.lastOrderDate
            ? new Date(item.lastOrderDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
            : '—'}
        </span>
      ),
    },
    {
      header: 'Status',
      cell: (item: CustomerRow) => {
        const isActive = item.totalOrders > 0;
        return <StatusBadge label={isActive ? 'Active' : 'Inactive'} variant={isActive ? 'success' : 'neutral'} />;
      },
    },
    {
      header: 'Actions',
      cell: (item: CustomerRow) => (
        <div className="flex items-center gap-2">
          {item.email && (
            <a
              href={`mailto:${item.email}`}
              className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="Send email"
            >
              <Mail size={16} />
            </a>
          )}
          <Link
            href={`/admin/customers/${encodeURIComponent(item.phone)}`}
            className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            title="View customer"
          >
            <Eye size={16} />
          </Link>
        </div>
      ),
    },
  ];

  return <DataTable title="Customer Directory" columns={columns} data={customers} />;
}
