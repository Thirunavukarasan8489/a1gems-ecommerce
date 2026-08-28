'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { AdminInput } from '@/components/admin/ui/AdminInput';
import { AdminSelect } from '@/components/admin/ui/AdminSelect';
import { ProductFormValues } from '../ProductForm';

interface SpecificationsSeoTabProps {
  isActive: boolean;
  guides?: { label: string; value: string }[];
}

export function SpecificationsSeoTab({ isActive, guides = [] }: SpecificationsSeoTabProps) {
  const { register, watch, setValue } = useFormContext<ProductFormValues>();
  const currentGuide = watch('guide');

  return (
    <div className={isActive ? 'space-y-5' : 'hidden'}>
      <h2 className="text-lg font-semibold text-gold-900 dark:text-white border-b border-gold-100 dark:border-gold-800 pb-3">
        Specifications & Meta Tags
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AdminInput label="Gemstone Type" placeholder="e.g. Ruby, Sapphire" {...register('stone')} />
        <AdminInput label="Weight (Carat / Ratti)" placeholder="e.g. 4.05 Carat" {...register('weight')} />
        <AdminInput label="Origin Country / Mine" placeholder="e.g. Burma (Myanmar), Ceylon" {...register('origin')} />
        <AdminInput label="Material / Metal" placeholder="e.g. 18K Yellow Gold, Unmounted" {...register('material')} />
        <AdminInput label="Dimensions / Size" placeholder="e.g. 9.2 x 7.5 x 4.1 mm" {...register('size')} />
        <AdminInput label="Certification Lab" placeholder="e.g. GIA, IGI, IIGJ Certified" {...register('certification')} />
      </div>

      <div className="pt-4 border-t border-gold-100 dark:border-gold-800 space-y-4">
        <h3 className="text-sm font-semibold text-gold-800 dark:text-gold-200">
          Linked CMS Content
        </h3>
        <div className="max-w-md">
          <label className="block text-sm font-medium text-gold-700 dark:text-gold-300 mb-1.5">Gemstone Guide</label>
          <AdminSelect
            options={[{ label: 'None (Do not link a guide)', value: '' }, ...guides]}
            value={guides.find(g => g.value === currentGuide) || { label: 'None (Do not link a guide)', value: '' }}
            onChange={(opt: any) => setValue('guide', opt && !Array.isArray(opt) ? opt.value : '')}
            placeholder="Select a Gemstone Guide..."
          />
          <p className="mt-1.5 text-xs text-gold-500">
            Link a gemstone guide to this product to educate customers on this specific stone.
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-gold-100 dark:border-gold-800 space-y-4">
        <h3 className="text-sm font-semibold text-gold-800 dark:text-gold-200">
          Search Engine Optimization (SEO)
        </h3>
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
