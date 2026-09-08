'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { AdminInput } from '@/components/admin/ui/AdminInput';
import { ProductFormValues } from '../ProductForm';

interface SeoTabProps {
  isActive: boolean;
}

export function SeoTab({ isActive }: SeoTabProps) {
  const { register } = useFormContext<ProductFormValues>();

  return (
    <div className={isActive ? 'space-y-5' : 'hidden'}>
      <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-800 to-gold-500 dark:from-gold-300 dark:to-gold-500 border-b border-gold-200 dark:border-gold-800 pb-4">
        Search Engine Optimization (SEO)
      </h2>

      <div className="space-y-4">
        <AdminInput label="Meta Title" placeholder="Custom page title for search engines" {...register('metaTitle')} />
        <div>
          <label className="block text-sm font-medium text-gold-700 dark:text-gold-300 mb-1.5">Meta Description</label>
          <textarea
            rows={3}
            placeholder="Brief snippet shown in Google search results..."
            {...register('metaDescription')}
            className="w-full rounded-lg bg-white dark:bg-gold-900 text-gold-900 dark:text-white border border-gold-200 dark:border-gold-700 focus:outline-none focus:ring-2 focus:ring-gold-500 px-3 py-2 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
