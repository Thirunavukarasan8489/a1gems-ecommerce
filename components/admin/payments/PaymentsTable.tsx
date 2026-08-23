'use client';

import DataTable from '@/components/admin/ui/DataTable';
import StatusBadge from '@/components/admin/ui/StatusBadge';
import { Eye, Edit } from 'lucide-react';
import Link from 'next/link';

type PaymentRow = {
  _id: string;
  paymentNumber: string;
  orderId?: { _id: string; orderNumber: string; customerName: string; total: number } | null;
  method: string;
  amount: number;
  transactionId: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  createdAt: string;
};

export default function PaymentsTable({ payments }: { payments: PaymentRow[] }) {
  const columns = [
    {
      header: 'Payment ID',
      cell: (item: PaymentRow) => (
        <span className="font-medium text-slate-800 dark:text-slate-200">{item.paymentNumber}</span>
      ),
    },
    {
      header: 'Order Details',
      cell: (item: PaymentRow) => (
        <div>
          <Link href={`/admin/orders/${item.orderId?._id}`} className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
            {item.orderId?.orderNumber ?? '—'}
          </Link>
          <p className="text-xs text-slate-500 dark:text-slate-400">{item.orderId?.customerName}</p>
        </div>
      ),
    },
    {
      header: 'Method',
      cell: (item: PaymentRow) => (
        <span className="text-slate-700 dark:text-slate-300">{item.method}</span>
      ),
    },
    {
      header: 'Amount',
      cell: (item: PaymentRow) => (
        <span className="font-medium text-slate-800 dark:text-slate-200">
          ₹{(item.amount ?? 0).toLocaleString('en-IN')}
        </span>
      ),
    },
    {
      header: 'Date',
      cell: (item: PaymentRow) => (
        <span className="text-slate-600 dark:text-slate-400 text-sm">
          {new Date(item.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
        </span>
      ),
    },
    {
      header: 'Status',
      cell: (item: PaymentRow) => {
        let variant: 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';
        switch (item.status) {
          case 'COMPLETED': variant = 'success'; break;
          case 'PENDING': variant = 'warning'; break;
          case 'FAILED': variant = 'danger'; break;
          case 'REFUNDED': variant = 'neutral'; break;
        }
        return <StatusBadge label={item.status} variant={variant} />;
      },
    },
    {
      header: 'Actions',
      cell: (item: PaymentRow) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/payments/${item._id}`}
            className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Eye size={16} />
          </Link>
        </div>
      ),
    },
  ];

  return <DataTable title="All Payments" columns={columns} data={payments} />;
}
