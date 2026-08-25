"use client";

import DataTable from '@/components/admin/ui/DataTable';
import StatusBadge from '@/components/admin/ui/StatusBadge';
import { Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import { deleteProduct } from '@/lib/actions/product.actions';
import DeleteConfirmButton from '@/components/admin/ui/DeleteConfirmButton';

import Image from 'next/image';

type ProductRow = {
  _id: string;
  name: string;
  slug: string;
  category?: { name: string } | null;
  stockQuantity?: number;
  stockStatus?: string;
  status?: string;
  primaryImage?: { url: string; altText?: string };
  variants?: { price?: number }[];
};

export default function ProductsTable({ products }: { products: ProductRow[] }) {
  const columns = [
    {
      header: 'Product',
      cell: (item: ProductRow) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-md overflow-hidden flex-shrink-0 border border-slate-200 dark:border-slate-700">
            {item.primaryImage?.url ? (
              <Image 
                src={item.primaryImage.url} 
                alt={item.primaryImage.altText || item.name} 
                width={40} 
                height={40} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">No img</div>
            )}
          </div>
          <div>
            <p className="font-medium text-slate-800 dark:text-slate-200">{item.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">/{item.slug}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Category',
      cell: (item: ProductRow) => (
        <span className="text-slate-700 dark:text-slate-300">{item.category?.name ?? '—'}</span>
      ),
    },
    {
      header: 'Price',
      cell: (item: ProductRow) => {
        let priceText = '—';
        if (item.variants && item.variants.length > 0) {
          const prices = item.variants.map((v: any) => Number(v.price) || 0).filter(p => p > 0);
          if (prices.length > 0) {
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            if (minPrice === maxPrice) {
              priceText = `₹${minPrice.toLocaleString('en-IN')}`;
            } else {
              priceText = `₹${minPrice.toLocaleString('en-IN')} - ₹${maxPrice.toLocaleString('en-IN')}`;
            }
          }
        }
        return (
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {priceText}
          </span>
        );
      },
    },
    {
      header: 'Stock',
      cell: (item: ProductRow) => {
        const qty = item.stockQuantity ?? 0;
        return (
          <span className={qty < 5 ? 'text-red-600 dark:text-red-400 font-medium' : 'text-slate-700 dark:text-slate-300'}>
            {qty}
          </span>
        );
      },
    },
    {
      header: 'Status',
      cell: (item: ProductRow) => {
        const stockStatus = item.stockStatus ?? 'IN_STOCK';
        const status = item.status ?? 'ACTIVE';
        let label = 'Active';
        let variant: 'success' | 'warning' | 'danger' | 'neutral' = 'success';
        if (status === 'DRAFT') { label = 'Draft'; variant = 'neutral'; }
        else if (stockStatus === 'LOW_STOCK') { label = 'Low Stock'; variant = 'warning'; }
        else if (stockStatus === 'OUT_OF_STOCK') { label = 'Out of Stock'; variant = 'danger'; }
        return <StatusBadge label={label} variant={variant} />;
      },
    },
    {
      header: 'Actions',
      cell: (item: ProductRow) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/products/${item._id}`}
            className="p-1 text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
          >
            <Eye size={16} />
          </Link>
          <Link
            href={`/admin/products/${item._id}/edit`}
            className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Edit size={16} />
          </Link>
          <DeleteConfirmButton 
            entityId={item._id} 
            entityName={item.name} 
            deleteAction={deleteProduct} 
          />
        </div>
      ),
    },
  ];

  return <DataTable title="All Products" columns={columns} data={products} />;
}
