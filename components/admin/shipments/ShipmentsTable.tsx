'use client';

import DataTable from '@/components/admin/ui/DataTable';
import StatusBadge from '@/components/admin/ui/StatusBadge';
import { Eye } from 'lucide-react';
import Link from 'next/link';

type ShipmentRow = {
  _id: string;
  shipmentNumber: string;
  orderId?: { _id: string; orderNumber: string; customerName: string; shippingAddress?: any } | null;
  courierName?: string;
  trackingNumber?: string;
  status: 'PENDING' | 'SHIPPED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'RETURNED';
  dispatchDate?: string;
  deliveryDate?: string;
  createdAt: string;
};

export default function ShipmentsTable({ shipments }: { shipments: ShipmentRow[] }) {
  const columns = [
    {
      header: 'Shipment ID',
      cell: (item: ShipmentRow) => (
        <span className="font-medium text-slate-800 dark:text-slate-200">{item.shipmentNumber}</span>
      ),
    },
    {
      header: 'Order Details',
      cell: (item: ShipmentRow) => (
        <div>
          <Link href={`/admin/orders/${item.orderId?._id}`} className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
            {item.orderId?.orderNumber ?? '—'}
          </Link>
          <p className="text-xs text-slate-500 dark:text-slate-400">{item.orderId?.customerName}</p>
        </div>
      ),
    },
    {
      header: 'Courier Info',
      cell: (item: ShipmentRow) => (
        <div>
          <span className="font-medium text-slate-700 dark:text-slate-300">{item.courierName || '—'}</span>
          {item.trackingNumber && <p className="text-xs text-slate-500 dark:text-slate-400">{item.trackingNumber}</p>}
        </div>
      ),
    },
    {
      header: 'Status',
      cell: (item: ShipmentRow) => {
        let variant: 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';
        switch (item.status) {
          case 'DELIVERED': variant = 'success'; break;
          case 'PENDING': variant = 'warning'; break;
          case 'SHIPPED': 
          case 'OUT_FOR_DELIVERY': variant = 'success'; break; // Could use another color, but success works for active transit
          case 'RETURNED': variant = 'danger'; break;
        }
        return <StatusBadge label={item.status.replace(/_/g, ' ')} variant={variant} />;
      },
    },
    {
      header: 'Dispatch Date',
      cell: (item: ShipmentRow) => (
        <span className="text-slate-600 dark:text-slate-400 text-sm">
          {item.dispatchDate ? new Date(item.dispatchDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
        </span>
      ),
    },
    {
      header: 'Actions',
      cell: (item: ShipmentRow) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/shipments/${item._id}`}
            className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Eye size={16} />
          </Link>
        </div>
      ),
    },
  ];

  return <DataTable title="All Shipments" columns={columns} data={shipments} />;
}
