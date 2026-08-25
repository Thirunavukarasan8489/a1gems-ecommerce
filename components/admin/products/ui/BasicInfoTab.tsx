'use client';

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { AdminInput } from '@/components/admin/ui/AdminInput';
import { AdminSelect } from '@/components/admin/ui/AdminSelect';
import { ProductFormValues } from '../ProductForm';

interface BasicInfoTabProps {
  categories: { value: string; label: string }[];
  isActive: boolean;
}

export function BasicInfoTab({ categories, isActive }: BasicInfoTabProps) {
  const { register, control, formState: { errors } } = useFormContext<ProductFormValues>();

  return (
    <div className={isActive ? 'space-y-5' : 'hidden'}>
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
        Basic Details
      </h2>

      <AdminInput
        label="Product Title *"
        placeholder="e.g. Natural Ceylon Blue Sapphire 5.62 Carat"
        {...register('name')}
        error={errors.name?.message}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Controller
            control={control}
            name="categoryId"
            render={({ field }) => (
              <AdminSelect
                label="Category *"
                placeholder="Choose category"
                options={categories}
                value={categories.find(c => c.value === field.value) || null}
                onChange={(opt: any) => field.onChange(opt ? opt.value : '')}
                error={errors.categoryId?.message}
              />
            )}
          />
        </div>

        <div>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <AdminSelect
                label="Catalog Status"
                options={[
                  { value: 'ACTIVE', label: 'Active (Visible on Store)' },
                  { value: 'DRAFT', label: 'Draft (Hidden)' }
                ]}
                value={[
                  { value: 'ACTIVE', label: 'Active (Visible on Store)' },
                  { value: 'DRAFT', label: 'Draft (Hidden)' }
                ].find(o => o.value === field.value) || null}
                onChange={(opt: any) => field.onChange(opt ? opt.value : 'ACTIVE')}
              />
            )}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          Short Description
        </label>
        <input
          type="text"
          placeholder="Key highlight or one-sentence stone summary"
          {...register('shortDescription')}
          className="w-full rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2.5 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          Detailed Description
        </label>
        <textarea
          rows={5}
          placeholder="Full gemological details, origins, astrology recommendations..."
          {...register('description')}
          className="w-full rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2.5 text-sm"
        />
      </div>
    </div>
  );
}
