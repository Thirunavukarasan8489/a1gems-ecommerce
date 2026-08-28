'use client';

import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Layers, X, Plus } from 'lucide-react';
import { AdminInput } from '@/components/admin/ui/AdminInput';
import { AdminButton } from '@/components/admin/ui/AdminButton';
import { ProductFormValues } from '../ProductForm';

interface PricingVariantsTabProps {
  isActive: boolean;
}

export function PricingVariantsTab({ isActive }: PricingVariantsTabProps) {
  const { register, control, formState: { errors } } = useFormContext<ProductFormValues>();
  
  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
    control,
    name: 'variants'
  });

  return (
    <div className={isActive ? 'space-y-5' : 'hidden'}>
      <div className="flex items-center justify-between border-b border-gold-100 dark:border-gold-800 pb-3">
        <h2 className="text-lg font-semibold text-gold-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-gold-600" />
          Pricing & Variants
        </h2>
      </div>

      <div className="space-y-4">
        {variantFields.map((field, index) => (
          <div
            key={field.id}
            className="p-3 border border-gold-200 dark:border-gold-700 rounded-xl bg-gold-50/60 dark:bg-gold-800/40 flex items-start gap-2 relative"
          >
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2">
              <AdminInput
                label="Carat Approx"
                placeholder="e.g. 4.05"
                type="number"
                step="0.01"
                {...register(`variants.${index}.caratApprox`)}
                error={errors.variants?.[index]?.caratApprox?.message}
              />
              <AdminInput
                label="Size (mm)"
                placeholder="e.g. 6x4mm"
                {...register(`variants.${index}.size`)}
                error={errors.variants?.[index]?.size?.message}
              />
              <AdminInput
                type="text"
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
                label="Selling Price (₹) *"
                placeholder=""
                {...register(`variants.${index}.price`)}
                error={errors.variants?.[index]?.price?.message}
              />
              <AdminInput
                type="text"
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
                label="Compare Price"
                placeholder=""
                {...register(`variants.${index}.comparePrice`)}
                error={errors.variants?.[index]?.comparePrice?.message}
              />
              <AdminInput
                type="text"
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
                label="Current Stock"
                placeholder=""
                {...register(`variants.${index}.stock`)}
                error={errors.variants?.[index]?.stock?.message}
              />
              <AdminInput
                type="text"
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
                label="Low Stock Alert"
                placeholder="5"
                {...register(`variants.${index}.lowStockThreshold`)}
                error={errors.variants?.[index]?.lowStockThreshold?.message}
              />
            </div>
            {variantFields.length > 1 && (
              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="mt-7 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors absolute -right-2 -top-2 bg-white shadow-sm border border-gold-200"
                title="Remove Variant"
              >
                <X size={16} />
              </button>
            )}
          </div>
        ))}

        <AdminButton
          type="button"
          variant="outline"
          onClick={() => appendVariant({ price: 0, stock: 1, lowStockThreshold: 5 })}
          className="w-full border-dashed border-2 py-3 text-gold-600 dark:text-gold-300"
        >
          <Plus size={16} className="mr-1.5" />
          Add Another Option / Size
        </AdminButton>
      </div>
    </div>
  );
}
