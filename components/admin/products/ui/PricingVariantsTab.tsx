'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';
import { Layers, X, Plus, Copy, Image as ImageIcon, Trash2 } from 'lucide-react';
import { AdminInput } from '@/components/admin/ui/AdminInput';
import { AdminButton } from '@/components/admin/ui/AdminButton';
import { ProductFormValues } from '../ProductForm';

interface PricingVariantsTabProps {
  isActive: boolean;
  categories?: { label: string; value: string; variantType?: string; calculateDiscountOnVariantValue?: boolean }[];
  variantFiles?: Record<number, { file: File; previewUrl: string; }>;
  onVariantFileSelect?: (index: number, file: File | null) => void;
}

export function PricingVariantsTab({ isActive, categories = [], variantFiles = {}, onVariantFileSelect }: PricingVariantsTabProps) {
  const { register, control, setValue, getValues, formState: { errors } } = useFormContext<ProductFormValues>();
  
  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
    control,
    name: 'variants'
  });

  const categoryId = useWatch({ control, name: 'categoryId' });
  const selectedCategory = categories.find(c => c.value === categoryId);
  const variantType = selectedCategory?.variantType || 'Variant Value';

  const [numVariantsToGenerate, setNumVariantsToGenerate] = useState(1);
  const [bulkBasePrice, setBulkBasePrice] = useState('');
  const [bulkComparePrice, setBulkComparePrice] = useState('');
  const [bulkStock, setBulkStock] = useState('');

  const handleGenerateVariants = () => {
    const newVariants = Array.from({ length: numVariantsToGenerate }).map(() => ({
      price: 0,
      stock: 1,
      lowStockThreshold: 5,
    }));
    appendVariant(newVariants);
  };

  const handleApplyBasePrice = () => {
    if (!bulkBasePrice) return;
    const price = Number(bulkBasePrice);
    if (isNaN(price)) return;

    variantFields.forEach((_, index) => {
      setValue(`variants.${index}.price`, price, { shouldValidate: true, shouldDirty: true });
    });
  };

  const handleApplyComparePrice = () => {
    if (!bulkComparePrice) return;
    const price = Number(bulkComparePrice);
    if (isNaN(price)) return;

    variantFields.forEach((_, index) => {
      setValue(`variants.${index}.comparePrice`, price, { shouldValidate: true, shouldDirty: true });
    });
  };

  const handleApplyStock = () => {
    if (!bulkStock) return;
    const stock = Number(bulkStock);
    if (isNaN(stock)) return;

    variantFields.forEach((_, index) => {
      setValue(`variants.${index}.stock`, stock, { shouldValidate: true, shouldDirty: true });
    });
  };

  const handleClearAllVariants = () => {
    if (confirm('Are you sure you want to clear all variants?')) {
      // Remove from the end to the beginning to avoid index shifting issues
      for (let i = variantFields.length - 1; i >= 0; i--) {
        removeVariant(i);
        if (onVariantFileSelect) onVariantFileSelect(i, null);
      }
    }
  };

  const handleApplyPrimaryImage = () => {
    const primaryImg = getValues('primaryImage');
    if (!primaryImg || !primaryImg.url) {
      alert('Please set a Primary Image in the Cover & Gallery tab first. If it is a newly uploaded file, you must save the product once before applying it to all variants.');
      return;
    }

    variantFields.forEach((_, index) => {
      setValue(`variants.${index}.image.url`, primaryImg.url, { shouldValidate: true, shouldDirty: true });
      setValue(`variants.${index}.image.altText`, primaryImg.altText || '', { shouldValidate: true, shouldDirty: true });
    });
  };

  return (
    <div className={isActive ? 'space-y-5' : 'hidden'}>
      <div className="flex items-center justify-between border-b border-gold-100 dark:border-gold-800 pb-3">
        <h2 className="text-lg font-semibold text-gold-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-gold-600" />
          Pricing & Variants
        </h2>
      </div>

      <div className="p-5 bg-gradient-to-br from-gold-50 to-white dark:from-gold-900/40 dark:to-gold-900/10 rounded-2xl border border-gold-200/60 dark:border-gold-800/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-none space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gold-600 dark:text-gold-400">Bulk Actions & Generation</h3>
        <div className="flex flex-wrap items-end gap-4">
          <div className="w-48">
            <label className="block text-xs font-medium text-gold-700 dark:text-gold-300 mb-1">Variants to Generate</label>
            <div className="flex gap-2">
              <input 
                type="number" 
                min={1} max={50}
                value={numVariantsToGenerate}
                onChange={e => setNumVariantsToGenerate(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-gold-200 dark:border-gold-700 rounded-md bg-white dark:bg-gold-900 text-gold-900 dark:text-white"
              />
              <AdminButton type="button" onClick={handleGenerateVariants} className="whitespace-nowrap">
                Generate
              </AdminButton>
            </div>
          </div>

          <div className="w-48">
            <label className="block text-xs font-medium text-gold-700 dark:text-gold-300 mb-1">Base Price (₹)</label>
            <div className="flex gap-2">
              <input 
                type="number" 
                min={0}
                value={bulkBasePrice}
                onChange={e => setBulkBasePrice(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gold-200 dark:border-gold-700 rounded-md bg-white dark:bg-gold-900 text-gold-900 dark:text-white"
              />
              <AdminButton type="button" onClick={handleApplyBasePrice} variant="outline" className="whitespace-nowrap">
                Apply
              </AdminButton>
            </div>
          </div>

          <div className="w-48">
            <label className="block text-xs font-medium text-gold-700 dark:text-gold-300 mb-1">Compare Price (₹)</label>
            <div className="flex gap-2">
              <input 
                type="number" 
                min={0}
                value={bulkComparePrice}
                onChange={e => setBulkComparePrice(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gold-200 dark:border-gold-700 rounded-md bg-white dark:bg-gold-900 text-gold-900 dark:text-white"
              />
              <AdminButton type="button" onClick={handleApplyComparePrice} variant="outline" className="whitespace-nowrap">
                Apply
              </AdminButton>
            </div>
          </div>

          <div className="w-48">
            <label className="block text-xs font-medium text-gold-700 dark:text-gold-300 mb-1">Current Stock</label>
            <div className="flex gap-2">
              <input 
                type="number" 
                min={0}
                value={bulkStock}
                onChange={e => setBulkStock(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gold-200 dark:border-gold-700 rounded-md bg-white dark:bg-gold-900 text-gold-900 dark:text-white"
              />
              <AdminButton type="button" onClick={handleApplyStock} variant="outline" className="whitespace-nowrap">
                Apply
              </AdminButton>
            </div>
          </div>

          <AdminButton type="button" onClick={handleApplyPrimaryImage} variant="outline" className="gap-2">
            <Copy size={16} />
            Apply Primary Image to All
          </AdminButton>

          <AdminButton 
            type="button" 
            onClick={handleClearAllVariants}
            variant="outline"
            className="flex items-center gap-1.5 whitespace-nowrap border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-300 dark:hover:bg-red-900/30 transition-colors ml-auto"
          >
            <Trash2 size={16} />
            Clear All
          </AdminButton>
        </div>
      </div>

      <div className="space-y-4">
        {variantFields.map((field, index) => (
          <div
            key={field.id}
            className="p-3 border border-gold-200 dark:border-gold-700 rounded-xl bg-gold-50/60 dark:bg-gold-800/40 flex items-start gap-2 relative"
          >
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
              <AdminInput
                label={variantType}
                placeholder={`e.g. 1.5`}
                type="number"
                step="0.01"
                {...register(`variants.${index}.variantValue`)}
                error={errors.variants?.[index]?.variantValue?.message}
              />
              <AdminInput
                label="Size Description"
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
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gold-700 dark:text-gold-300">Variant Image</label>
                <div className="flex flex-col gap-2">
                  {variantFiles[index] || getValues(`variants.${index}.image.url`) ? (
                    <div className="relative w-full h-24 rounded-md border border-gold-200 dark:border-gold-700 overflow-hidden group bg-white dark:bg-gold-900">
                      <Image 
                        src={variantFiles[index]?.previewUrl || getValues(`variants.${index}.image.url`)} 
                        alt="Variant preview" 
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (onVariantFileSelect) onVariantFileSelect(index, null);
                          setValue(`variants.${index}.image.url`, '', { shouldValidate: true, shouldDirty: true });
                        }}
                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gold-200 dark:border-gold-700 rounded-md cursor-pointer hover:bg-gold-50 dark:hover:bg-gold-800 transition-colors bg-white dark:bg-gold-900">
                      <div className="flex flex-col items-center justify-center pt-2 pb-3">
                        <ImageIcon className="w-6 h-6 text-gold-400 mb-1" />
                        <p className="text-[10px] text-gold-500 text-center px-2">Click to upload</p>
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file && onVariantFileSelect) {
                            onVariantFileSelect(index, file);
                          }
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>
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
