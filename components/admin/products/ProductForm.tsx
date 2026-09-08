
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, useWatch, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  ArrowLeft,
  Save,
  UploadCloud,
  Plus,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  X,
  Sparkles,
  Layers,
  IndianRupee,
  Package
} from 'lucide-react';
import Image from 'next/image';
import { AdminButton } from '@/components/admin/ui/AdminButton';
import { AdminInput } from '@/components/admin/ui/AdminInput';
import { AdminSelect } from '@/components/admin/ui/AdminSelect';
import { createProduct, updateProduct } from '@/lib/actions/product.actions';
import { uploadMedia } from '@/lib/actions/media.actions';
import { toast } from 'react-hot-toast';

import { BasicInfoTab } from './ui/BasicInfoTab';
import { PricingVariantsTab } from './ui/PricingVariantsTab';
import { MediaUploadTab } from './ui/MediaUploadTab';
import { SpecificationsTab } from './ui/SpecificationsTab';
import { PurchaseRulesTab } from './ui/PurchaseRulesTab';
import { SeoTab } from './ui/SeoTab';
import { DiscountRulesTab } from './ui/DiscountRulesTab';

const variantSchema = z.object({
  variantValue: z.coerce.number().optional(),
  size: z.string().optional(),
  price: z.preprocess((val) => val === '' ? undefined : val, z.coerce.number().min(0, 'Selling Price is required')),
  comparePrice: z.preprocess((val) => val === '' ? undefined : val, z.coerce.number().optional()),
  stock: z.preprocess((val) => val === '' ? undefined : val, z.coerce.number().min(0, 'Stock must be 0 or more').int()),
  lowStockThreshold: z.preprocess((val) => val === '' ? undefined : val, z.coerce.number().int().optional()),
  image: z.object({ url: z.string().optional(), altText: z.string().optional() }).optional(),
});

const productSchema = z.object({
  // Basic
  name: z.string().min(3, 'Name must be at least 3 characters'),
  categoryId: z.string().min(1, 'Category is required'),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  // Variants
  hasVariants: z.boolean(),
  variants: z.array(variantSchema).optional(),

  // Purchase Rules
  purchaseType: z.enum(['BUY_ONLY', 'ENQUIRE_ONLY', 'BUY_ENQUIRE']),
  whatsappEnabled: z.boolean().optional(),
  discountRules: z.array(z.object({
    minQty: z.coerce.number().min(1, 'Min Qty is required'),
    maxQty: z.coerce.number().min(1, 'Max Qty is required'),
    discountPercentage: z.coerce.number().min(0).max(100, 'Invalid discount %'),
  })).optional(),

  // Specifications
  material: z.string().optional(),
  stone: z.string().optional(),
  size: z.string().optional(),
  weight: z.string().optional(),
  origin: z.string().optional(),
  certification: z.string().optional(),
  guide: z.string().optional(),

  // Images & Media
  primaryImage: z.object({ url: z.string(), altText: z.string().optional() }).optional(),
  gallery: z.array(z.object({ url: z.string(), altText: z.string().optional() })).optional(),

  // SEO
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),

  status: z.enum(['ACTIVE', 'DRAFT']),
});

export type ProductFormValues = z.infer<typeof productSchema>;

export default function ProductForm({ initialData, categories = [], guides = [] }: { initialData?: any; categories?: { label: string; value: string }[], guides?: { label: string; value: string }[] }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('basic');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [coverFile, setCoverFile] = useState<{ file?: File; previewUrl: string; isExisting: boolean } | null>(
    initialData?.primaryImage?.url ? { previewUrl: initialData.primaryImage.url, isExisting: true } : null
  );
  
  const [galleryItems, setGalleryItems] = useState<{ id: string; file?: File; previewUrl: string; isExisting: boolean }[]>(
    initialData?.gallery?.length > 0 
      ? initialData.gallery.filter((img: any) => img && img.url && img.url.trim() !== '').map((img: any, i: number) => ({
          id: `existing-${i}-${img.url.slice(-10).replace(/[^a-zA-Z0-9]/g, '')}`,
          previewUrl: img.url,
          isExisting: true
        }))
      : []
  );
  const [variantFiles, setVariantFiles] = useState<Record<number, { file: File; previewUrl: string; }>>({});
  const [validationErrors, setValidationErrors] = useState<{ field: string; message: string; tabId: string }[] | null>(null);

  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: initialData ? {
      ...initialData,
      categoryId: initialData.category?._id || initialData.categoryId || '',
      guide: initialData.guide?._id || initialData.guide || '',
    } : {
      name: '',
      categoryId: '',
      shortDescription: '',
      description: '',
      hasVariants: true,
      variants: [],
      purchaseType: 'BUY_ENQUIRE',
      whatsappEnabled: false,
      material: '',
      stone: '',
      size: '',
      weight: '',
      origin: '',
      certification: '',
      guide: '',
      primaryImage: { url: '', altText: '' },
      gallery: [],
      metaTitle: '',
      metaDescription: '',
      status: 'ACTIVE',
    },
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    trigger,
    formState: { errors, isSubmitting },
  } = methods;



  const hasVariants = useWatch({ control, name: 'hasVariants' });
  const primaryImage = useWatch({ control, name: 'primaryImage' });
  const gallery = useWatch({ control, name: 'gallery' }) || [];

  // Remove the useEffect for getCategories since categories are passed via props



  // Handle Variant Image Selection
  const handleVariantFileSelect = (index: number, file: File | null) => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setVariantFiles(prev => ({
        ...prev,
        [index]: { file, previewUrl }
      }));
    } else {
      setVariantFiles(prev => {
        const newFiles = { ...prev };
        if (newFiles[index]?.previewUrl) {
          URL.revokeObjectURL(newFiles[index].previewUrl);
        }
        delete newFiles[index];
        return newFiles;
      });
      // also clear it from form data
      const currentVariants = getValues('variants') || [];
      if (currentVariants[index]) {
        currentVariants[index].image = { url: '', altText: '' };
        setValue('variants', currentVariants, { shouldValidate: true });
      }
    }
  };

  // Handle Cover Image Selection
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (coverFile) {
      URL.revokeObjectURL(coverFile.previewUrl);
    }

    setCoverFile({
      file,
      previewUrl: URL.createObjectURL(file),
      isExisting: false
    });
  };

  // Handle Gallery Images Selection
  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files).map(file => ({
      file,
      previewUrl: URL.createObjectURL(file),
      id: Math.random().toString(36).substring(7),
      isExisting: false
    }));

    setGalleryItems(prev => [...prev, ...newFiles]);

    // We add placeholders in react-hook-form to render the alt text inputs
    const currentGallery = getValues('gallery') || [];
    setValue('gallery', [...currentGallery, ...newFiles.map(() => ({ url: '', altText: '' }))], { shouldValidate: true });
  };

  const removeGalleryImage = (indexToRemove: number) => {
    const removed = galleryItems[indexToRemove];
    if (removed && !removed.isExisting) {
      URL.revokeObjectURL(removed.previewUrl);
    }
    setGalleryItems(prev => prev.filter((_, idx) => idx !== indexToRemove));

    const currentGallery = getValues('gallery') || [];
    setValue('gallery', currentGallery.filter((_, idx) => idx !== indexToRemove), { shouldValidate: true });
  };

  const onSubmit = async (data: ProductFormValues) => {
    setSubmitError(null);

    const uploadAndSubmit = async () => {
      let finalPrimaryImage = data.primaryImage;

      if (coverFile && !coverFile.isExisting) {
        const formData = new FormData();
        formData.append('file', coverFile.file!);
        const res = await uploadMedia(formData);
        if (res.success && res.data) {
          finalPrimaryImage = { url: res.data.secureUrl || res.data.url, altText: data.primaryImage?.altText || '' };
        } else {
          throw new Error(`Cover upload failed: ${res.error}`);
        }
      } else if (!coverFile) {
        throw new Error('Cover image is required');
      }

      const finalGallery = [...(data.gallery || [])];

      const galleryUploadPromises = galleryItems.map(async (item, i) => {
        if (item.isExisting) return null;
        const formData = new FormData();
        formData.append('file', item.file!);
        const res = await uploadMedia(formData);
        if (res.success && res.data) {
          return { index: i, data: { url: res.data.secureUrl || res.data.url, altText: finalGallery[i]?.altText || item.file!.name } };
        } else {
          throw new Error(`Gallery upload failed: ${res.error}`);
        }
      });

      const uploadedGalleryImages = await Promise.all(galleryUploadPromises);
      uploadedGalleryImages.forEach(img => {
        if (img) finalGallery[img.index] = img.data;
      });

      const finalData = { ...data, primaryImage: finalPrimaryImage, gallery: finalGallery };

      let res;
      if (initialData?._id) {
        res = await updateProduct(initialData._id, finalData);
      } else {
        res = await createProduct(finalData);
      }

      if (!res.success) {
        throw new Error(res.error || `Failed to ${initialData ? 'update' : 'create'} product`);
      }
      return res;
    };

    return toast.promise(
      uploadAndSubmit(),
      {
        loading: 'Uploading media and saving product...',
        success: `Product ${initialData ? 'updated' : 'created'} successfully!`,
        error: (err) => err.message || `Failed to ${initialData ? 'update' : 'create'} product.`,
      }
    ).then(() => {
      setTimeout(() => {
        router.push('/admin/products');
      }, 1500);
    }).catch((err) => {
      setSubmitError(err.message);
    });
  };

  const tabs = [
    { id: 'basic', label: '1. Basic Details' },
    { id: 'media', label: '2. Cover Image & Gallery' },
    { id: 'variants', label: '3. Price & Variant' },
    { id: 'discount', label: '4. Discount Rule' },
    { id: 'purchase', label: '5. Purchase Rule' },
    { id: 'seo', label: '6. SEO' },
  ];

  const tabFields: Record<string, (keyof ProductFormValues)[]> = {
    basic: ['name', 'categoryId', 'status', 'shortDescription', 'description', 'material', 'stone', 'size', 'weight', 'origin', 'certification', 'guide'],
    media: ['primaryImage', 'gallery'],
    variants: ['hasVariants', 'variants'],
    discount: ['discountRules'],
    purchase: ['purchaseType', 'whatsappEnabled'],
    seo: ['metaTitle', 'metaDescription'],
  };

  const onInvalid = (formErrors: any) => {
    const extractedErrs: { field: string; message: string; tabId: string }[] = [];
    const getTabForField = (fieldName: string) => {
      for (const tab of Object.keys(tabFields)) {
        if (tabFields[tab].some(f => fieldName === f || fieldName.startsWith(f + '.'))) return tab;
      }
      return 'basic';
    };
    const traverseErrors = (obj: any, parentKey = '') => {
      for (const key in obj) {
        const fullKey = parentKey ? `${parentKey}.${key}` : key;
        if (obj[key]?.message) {
          extractedErrs.push({ field: fullKey, message: obj[key].message, tabId: getTabForField(fullKey) });
        } else if (typeof obj[key] === 'object') {
          traverseErrors(obj[key], fullKey);
        }
      }
    };
    traverseErrors(formErrors);

    // Explicit cover image validation check
    if (!coverFile) {
      extractedErrs.push({ field: 'Cover Image', message: 'Cover image is required', tabId: 'media' });
    }

    if (extractedErrs.length > 0) {
      setValidationErrors(extractedErrs);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit as any, onInvalid)(e);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 relative">

      {/* Sticky Top Action Bar */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-plum-950/80 backdrop-blur-md border-b border-gold-200 dark:border-gold-800 py-4 px-6 rounded-b-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 -mx-4 sm:mx-0 mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="p-2 border border-gold-200 dark:border-gold-700 rounded-lg hover:bg-gold-100 dark:hover:bg-gold-800 transition-colors text-gold-600 dark:text-gold-300"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gold-800 dark:text-white flex items-center gap-2">
              <Package className="w-6 h-6 text-gold-600" />
              {initialData ? 'Edit Product' : 'Create Product'}
            </h1>
            <p className="text-xs text-gold-500 dark:text-gold-400 mt-0.5">
              Unique slug is automatically generated in the backend from product title.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <AdminButton type="button" variant="outline" onClick={() => router.push('/admin/products')}>
            Cancel
          </AdminButton>
          <AdminButton onClick={handleFormSubmit} isLoading={isSubmitting} className="gap-2">
            <Save size={18} />
            {initialData ? 'Update Product' : 'Publish Product'}
          </AdminButton>
        </div>
      </div>

      {submitError && (
        <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm font-medium">
          {submitError}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6 items-start">

        {/* Navigation Tabs Sidebar */}
        <div className="w-full md:w-64 shrink-0 bg-gradient-to-b from-gold-50/50 to-transparent dark:from-gold-900/20 dark:to-transparent border border-gold-200/60 dark:border-gold-800/60 rounded-2xl shadow-sm p-3 sticky top-32">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-3 px-3">Form Steps</h3>
          <nav className="flex flex-col space-y-1.5">
            {tabs.map((tab, idx) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 overflow-hidden group ${isActive
                    ? 'text-gold-900 dark:text-gold-50 shadow-sm'
                    : 'text-gold-600 dark:text-gold-400 hover:bg-white dark:hover:bg-gold-800/50 hover:shadow-sm'
                    }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 bg-gradient-to-r from-gold-200 to-gold-100 dark:from-gold-800 dark:to-gold-900 opacity-50 border-l-4 border-gold-500 rounded-xl" />
                  )}
                  <span className="relative z-10 flex items-center justify-between">
                    <span>{tab.label}</span>
                    {isActive && <CheckCircle2 className="w-4 h-4 text-gold-600 dark:text-gold-400" />}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Form Content Area */}
        <div className="flex-1 w-full bg-white dark:bg-gold-950 border border-gold-200 dark:border-gold-800 rounded-2xl shadow-md p-6 lg:p-8 relative">
          {/* Subtle gradient background element for premium feel */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gold-50 dark:from-gold-900/30 to-transparent rounded-t-2xl pointer-events-none" />
          
          <form
            id="product-form"
            className="space-y-6"
            onSubmit={handleFormSubmit}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.target as any).tagName === 'INPUT') {
                e.preventDefault();
              }
            }}
          >

            <FormProvider {...methods}>
              {/* 1. BASIC DETAILS & SPECS */}
              <div className={activeTab === 'basic' ? 'space-y-6' : 'hidden'}>
                <BasicInfoTab categories={categories} isActive={true} />
                <SpecificationsTab isActive={true} guides={guides} />
              </div>

              {/* 2. COVER IMAGE & GALLERY */}
              <MediaUploadTab 
                isActive={activeTab === 'media'}
                coverFile={coverFile}
                setCoverFile={setCoverFile}
                galleryItems={galleryItems}
                handleCoverUpload={handleCoverUpload}
                handleGalleryUpload={handleGalleryUpload}
                removeGalleryImage={removeGalleryImage}
              />

              {/* 3. PRICE & VARIANT */}
              <PricingVariantsTab 
                isActive={activeTab === 'variants'} 
                categories={categories} 
                variantFiles={variantFiles}
                onVariantFileSelect={handleVariantFileSelect}
              />

              {/* 4. DISCOUNT RULE */}
              <DiscountRulesTab isActive={activeTab === 'discount'} />

              {/* 5. PURCHASE RULE */}
              <PurchaseRulesTab isActive={activeTab === 'purchase'} />

              {/* 6. SEO */}
              <SeoTab isActive={activeTab === 'seo'} />
            </FormProvider>

            {/* Form Navigation / Save */}
            <div className="flex items-center justify-between p-4 mt-6 bg-white dark:bg-gold-900 border-t border-gold-200 dark:border-gold-800 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] rounded-b-xl -mx-5 -mb-5 lg:-mx-6 lg:-mb-6">
              <div>
                {tabs.findIndex(t => t.id === activeTab) > 0 && (
                  <AdminButton
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const idx = tabs.findIndex(t => t.id === activeTab);
                      setActiveTab(tabs[idx - 1].id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Previous Step
                  </AdminButton>
                )}
              </div>
              <div className="flex items-center gap-3">
                {tabs.findIndex(t => t.id === activeTab) < tabs.length - 1 && (
                  <AdminButton
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const idx = tabs.findIndex(t => t.id === activeTab);
                      if (idx < tabs.length - 1) {
                        setActiveTab(tabs[idx + 1].id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                  >
                    Next Step
                  </AdminButton>
                )}
                
                <AdminButton type="button" onClick={handleFormSubmit} isLoading={isSubmitting} className="gap-2 bg-gold-600 hover:bg-gold-700 text-white">
                  <Save size={18} />
                  {initialData ? 'Update Product' : 'Publish Product'}
                </AdminButton>
              </div>
            </div>

          </form>
        </div>
      </div>

      {/* Validation Errors Modal */}
      {validationErrors && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gold-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gold-900 rounded-xl shadow-2xl max-w-md w-full border border-gold-200 dark:border-gold-800 overflow-hidden">
            <div className="p-4 border-b border-gold-100 dark:border-gold-800 flex justify-between items-center bg-red-50 dark:bg-red-900/20">
              <h3 className="font-semibold text-red-600 dark:text-red-400 flex items-center gap-2">
                <X size={18} /> Validation Errors
              </h3>
              <button onClick={() => setValidationErrors(null)} className="text-gold-400 hover:text-gold-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              <p className="text-sm text-gold-600 dark:text-gold-300 mb-4">Please fix the following required fields before saving:</p>
              <ul className="space-y-3">
                {validationErrors.map((err, i) => (
                  <li key={i} className="flex flex-col text-sm p-3 bg-gold-50 dark:bg-gold-800/50 rounded-lg border border-gold-100 dark:border-gold-800">
                    <span className="font-medium text-gold-800 dark:text-gold-200 capitalize">{err.field.replace(/\./g, ' ')}</span>
                    <span className="text-red-600 dark:text-red-400 mt-1">{err.message}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setValidationErrors(null);
                        setActiveTab(err.tabId);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-gold-600 text-xs font-semibold text-left mt-2 hover:underline"
                    >
                      Go to {tabs.find(t => t.id === err.tabId)?.label.replace(/^\d+\.\s/, '')} Tab &rarr;
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 border-t border-gold-100 dark:border-gold-800 bg-gold-50 dark:bg-gold-800/20 flex justify-end">
              <AdminButton onClick={() => setValidationErrors(null)} variant="outline">Close</AdminButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
