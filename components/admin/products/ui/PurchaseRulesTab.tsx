'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ProductFormValues } from '../ProductForm';

interface PurchaseRulesTabProps {
  isActive: boolean;
}

export function PurchaseRulesTab({ isActive }: PurchaseRulesTabProps) {
  const { register } = useFormContext<ProductFormValues>();

  return (
    <div className={isActive ? 'space-y-5' : 'hidden'}>
      <h2 className="text-lg font-semibold text-gold-900 dark:text-white border-b border-gold-100 dark:border-gold-800 pb-3">
        Purchase & Consultation Settings
      </h2>

      <div className="space-y-3">
        <label className="flex items-start gap-3 p-4 border border-gold-200 dark:border-gold-700 rounded-xl cursor-pointer hover:bg-gold-50 dark:hover:bg-gold-800/50 transition-colors">
          <input type="radio" value="BUY_ENQUIRE" {...register('purchaseType')} className="mt-1" />
          <div>
            <p className="font-medium text-gold-900 dark:text-white">Buy & Enquire (Recommended)</p>
            <p className="text-xs text-gold-500">Customer can either Add to Cart directly or submit an enquiry lead.</p>
          </div>
        </label>

        <label className="flex items-start gap-3 p-4 border border-gold-200 dark:border-gold-700 rounded-xl cursor-pointer hover:bg-gold-50 dark:hover:bg-gold-800/50 transition-colors">
          <input type="radio" value="BUY_ONLY" {...register('purchaseType')} className="mt-1" />
          <div>
            <p className="font-medium text-gold-900 dark:text-white">Buy Only (Standard E-Commerce)</p>
            <p className="text-xs text-gold-500">Direct checkout only. No consultation form shown on product page.</p>
          </div>
        </label>

        <label className="flex items-start gap-3 p-4 border border-gold-200 dark:border-gold-700 rounded-xl cursor-pointer hover:bg-gold-50 dark:hover:bg-gold-800/50 transition-colors">
          <input type="radio" value="ENQUIRE_ONLY" {...register('purchaseType')} className="mt-1" />
          <div>
            <p className="font-medium text-gold-900 dark:text-white">Enquire Only (High-Value / Collector Stones)</p>
            <p className="text-xs text-gold-500">Disables direct cart checkout. Customer must submit an enquiry lead.</p>
          </div>
        </label>
      </div>

      <div className="pt-4 border-t border-gold-100 dark:border-gold-800 space-y-3">
        <label className="flex items-center gap-3 p-4 border border-gold-200 dark:border-gold-700 rounded-xl cursor-pointer hover:bg-gold-50 dark:hover:bg-gold-800/50 transition-colors">
          <input type="checkbox" {...register('whatsappEnabled')} className="w-4 h-4 rounded text-gold-600 focus:ring-gold-500" />
          <span className="text-sm font-medium text-gold-700 dark:text-gold-300">Enable 1-Click WhatsApp Consultation Button on product page</span>
        </label>
      </div>
    </div>
  );
}
