'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray, useWatch, Controller } from 'react-hook-form';
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
import { createProduct } from '@/lib/actions/product.actions';
import { getCategories } from '@/lib/actions/category.actions';
import { uploadMedia } from '@/lib/actions/media.actions';
import { toast } from 'react-hot-toast';

const variantSchema = z.object({
  name: z.string().min(1, 'Variant name is required'),
  sku: z.string().min(1, 'SKU is required'),
  price: z.coerce.number().min(0, 'Price must be positive'),
  stock: z.coerce.number().min(0, 'Stock must be 0 or more').int(),
});

const productSchema = z.object({
  // Basic
  name: z.string().min(3, 'Name must be at least 3 characters'),
  categoryId: z.string().min(1, 'Category is required'),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  
  // Pricing & Inventory (Base)
  basePrice: z.coerce.number().min(0, 'Price must be positive').optional(),
  comparePrice: z.coerce.number().optional(),
  baseSku: z.string().optional(),
  stockQuantity: z.coerce.number().min(0).int().optional(),
  lowStockThreshold: z.coerce.number().optional(),
  
  // Variants
  hasVariants: z.boolean(),
  variants: z.array(variantSchema).optional(),

  // Purchase Rules
  purchaseType: z.enum(['BUY_ONLY', 'ENQUIRE_ONLY', 'BUY_ENQUIRE']),
  whatsappEnabled: z.boolean().optional(),
  
  // Specifications
  material: z.string().optional(),
  stone: z.string().optional(),
  size: z.string().optional(),
  weight: z.string().optional(),
  origin: z.string().optional(),
  certification: z.string().optional(),
  
  // Images & Media
  primaryImage: z.object({ url: z.string(), altText: z.string().optional() }).optional(),
  gallery: z.array(z.object({ url: z.string(), altText: z.string().optional() })).optional(),

  // SEO
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  
  status: z.enum(['ACTIVE', 'DRAFT']),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function CreateProductPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('basic');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ label: string; value: string }[]>([]);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [coverFile, setCoverFile] = useState<{ file: File; previewUrl: string } | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<{ file: File; previewUrl: string; id: string }[]>([]);
  const [validationErrors, setValidationErrors] = useState<{ field: string; message: string; tabId: string }[] | null>(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      name: '',
      categoryId: '',
      shortDescription: '',
      description: '',
      basePrice: 0,
      baseSku: '',
      stockQuantity: 0,
      lowStockThreshold: 5,
      hasVariants: false,
      variants: [],
      purchaseType: 'BUY_ENQUIRE',
      whatsappEnabled: false,
      material: '',
      stone: '',
      size: '',
      weight: '',
      origin: '',
      certification: '',
      primaryImage: { url: '', altText: '' },
      gallery: [],
      metaTitle: '',
      metaDescription: '',
      status: 'ACTIVE',
    },
  });

  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
    control,
    name: 'variants',
  });

  const hasVariants = useWatch({ control, name: 'hasVariants' });
  const primaryImage = useWatch({ control, name: 'primaryImage' });
  const gallery = useWatch({ control, name: 'gallery' }) || [];

  useEffect(() => {
    getCategories().then(res => {
      if (res.success && res.data) {
        setCategories(res.data.map((c: any) => ({ label: c.name, value: c._id })));
      }
    });
  }, []);

  // Handle Cover Image Selection
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (coverFile) {
      URL.revokeObjectURL(coverFile.previewUrl);
    }

    setCoverFile({
      file,
      previewUrl: URL.createObjectURL(file)
    });
  };

  // Handle Gallery Images Selection
  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files).map(file => ({
      file,
      previewUrl: URL.createObjectURL(file),
      id: Math.random().toString(36).substring(7)
    }));

    setGalleryFiles(prev => [...prev, ...newFiles]);
    
    // We add placeholders in react-hook-form to render the alt text inputs
    const currentGallery = watch('gallery') || [];
    setValue('gallery', [...currentGallery, ...newFiles.map(() => ({ url: '', altText: '' }))], { shouldValidate: true });
  };

  const removeGalleryImage = (indexToRemove: number) => {
    const removed = galleryFiles[indexToRemove];
    if (removed) {
      URL.revokeObjectURL(removed.previewUrl);
    }
    setGalleryFiles(prev => prev.filter((_, idx) => idx !== indexToRemove));
    
    const currentGallery = watch('gallery') || [];
    setValue('gallery', currentGallery.filter((_, idx) => idx !== indexToRemove), { shouldValidate: true });
  };

  const onSubmit = async (data: ProductFormValues) => {
    setSubmitError(null);
    
    const uploadAndSubmit = async () => {
      let finalPrimaryImage = data.primaryImage;
      
      if (coverFile) {
        const formData = new FormData();
        formData.append('file', coverFile.file);
        const res = await uploadMedia(formData);
        if (res.success && res.data) {
          finalPrimaryImage = { url: res.data.secureUrl || res.data.url, altText: data.primaryImage?.altText || '' };
        } else {
          throw new Error(`Cover upload failed: ${res.error}`);
        }
      } else if (!finalPrimaryImage?.url) {
        throw new Error('Cover image is required');
      }

      const finalGallery = [...(data.gallery || [])];
      
      for (let i = 0; i < galleryFiles.length; i++) {
        const formData = new FormData();
        formData.append('file', galleryFiles[i].file);
        const res = await uploadMedia(formData);
        if (res.success && res.data) {
          finalGallery[i] = { url: res.data.secureUrl || res.data.url, altText: finalGallery[i]?.altText || '' };
        } else {
          throw new Error(`Gallery upload failed: ${res.error}`);
        }
      }

      const finalData = { ...data, primaryImage: finalPrimaryImage, gallery: finalGallery };
      const res = await createProduct(finalData);
      
      if (!res.success) {
        throw new Error(res.error || 'Failed to create product');
      }
      return res;
    };

    toast.promise(
      uploadAndSubmit(),
      {
        loading: 'Uploading media and saving product...',
        success: 'Product created successfully!',
        error: (err) => err.message || 'Failed to create product.',
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
    { id: 'basic', label: '1. Basic Info' },
    { id: 'pricing', label: '2. Pricing & Stock' },
    { id: 'variants', label: '3. Variants' },
    { id: 'media', label: '4. Cover & Gallery Images' },
    { id: 'specs', label: '5. Specifications & SEO' },
    { id: 'purchase', label: '6. Purchase Rules' },
  ];

  const currentTabIndex = tabs.findIndex(t => t.id === activeTab);
  
  const tabFields: Record<string, (keyof ProductFormValues)[]> = {
    basic: ['name', 'categoryId', 'status', 'shortDescription', 'description'],
    pricing: ['basePrice', 'comparePrice', 'baseSku', 'stockQuantity', 'lowStockThreshold'],
    variants: ['hasVariants', 'variants'],
    media: ['primaryImage', 'gallery'],
    specs: ['material', 'stone', 'size', 'weight', 'origin', 'certification', 'metaTitle', 'metaDescription'],
    purchase: ['purchaseType', 'whatsappEnabled'],
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

  const handleNext = async () => {
    if (currentTabIndex < tabs.length - 1) {
      const currentTabId = tabs[currentTabIndex].id;
      const fieldsToValidate = tabFields[currentTabId] || [];
      
      const isTabValid = await trigger(fieldsToValidate);
      
      if (isTabValid) {
        setActiveTab(tabs[currentTabIndex + 1].id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };
  
  const handlePrev = () => {
    if (currentTabIndex > 0) {
      setActiveTab(tabs[currentTabIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit as any, onInvalid)(e);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/products" 
            className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Package className="w-6 h-6 text-blue-600" />
              Create Product
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Unique slug is automatically generated in the backend from product title.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <AdminButton type="button" variant="outline" onClick={() => router.push('/admin/products')}>
            Cancel
          </AdminButton>
          <AdminButton onClick={handleSubmit(onSubmit as any, onInvalid)} isLoading={isSubmitting} className="gap-2">
            <Save size={18} />
            Publish Product
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
        <div className="w-full md:w-60 shrink-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-2 sticky top-24">
          <nav className="flex flex-col space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-semibold' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Form Content Area */}
        <div className="flex-1 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-6 lg:p-8">
          <form id="product-form" className="space-y-6" onSubmit={handleFormSubmit}>
            
            {/* 1. BASIC INFO */}
            <div className={activeTab === 'basic' ? 'space-y-5' : 'hidden'}>
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
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Catalog Status
                  </label>
                  <select 
                    {...register('status')} 
                    className="w-full rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2.5 text-sm"
                  >
                    <option value="ACTIVE">Active (Visible on Store)</option>
                    <option value="DRAFT">Draft (Hidden)</option>
                  </select>
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

            {/* 2. PRICING & STOCK */}
            <div className={activeTab === 'pricing' ? 'space-y-5' : 'hidden'}>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                Pricing & Inventory
              </h2>

              {!hasVariants ? (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <AdminInput 
                      type="text"
                      onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
                      label="Selling Price (₹) *" 
                      placeholder="e.g. 85000"
                      {...register('basePrice')} 
                      error={errors.basePrice?.message} 
                    />
                    <AdminInput 
                      type="text"
                      onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
                      label="Compare at Original Price (₹)" 
                      placeholder="e.g. 95000"
                      {...register('comparePrice')} 
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <AdminInput 
                      label="SKU Code *" 
                      placeholder="e.g. GEM-SPH-001"
                      {...register('baseSku')} 
                      error={errors.baseSku?.message} 
                    />
                    <AdminInput 
                      type="text"
                      onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
                      label="Stock Quantity *" 
                      placeholder="0"
                      {...register('stockQuantity')} 
                      error={errors.stockQuantity?.message} 
                    />
                    <AdminInput 
                      type="text"
                      onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
                      label="Low Stock Threshold" 
                      placeholder="5"
                      {...register('lowStockThreshold')} 
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-xl text-sm border border-blue-200 dark:border-blue-800 flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 shrink-0" />
                  <span>
                    Variants are enabled. Price and stock are calculated automatically across all active variants in the <strong>Variants tab</strong>.
                  </span>
                </div>
              )}
            </div>

            {/* 3. VARIANTS */}
            <div className={activeTab === 'variants' ? 'space-y-5' : 'hidden'}>
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-600" />
                  Product Variants
                </h2>
                <label className="flex items-center gap-2 cursor-pointer bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                  <input 
                    type="checkbox" 
                    id="hasVariants" 
                    {...register('hasVariants')} 
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4" 
                  />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Enable Variants (Size, Metal, Carat)
                  </span>
                </label>
              </div>

              {hasVariants ? (
                <div className="space-y-4">
                  {variantFields.map((field, index) => (
                    <div 
                      key={field.id} 
                      className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/60 dark:bg-slate-800/40 flex items-start gap-3"
                    >
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3">
                        <AdminInput 
                          label="Variant Name" 
                          placeholder="e.g. 5.5 Carat - Gold Ring"
                          {...register(`variants.${index}.name`)} 
                          error={errors.variants?.[index]?.name?.message} 
                        />
                        <AdminInput 
                          label="Variant SKU" 
                          placeholder="e.g. SPH-55-GLD"
                          {...register(`variants.${index}.sku`)} 
                          error={errors.variants?.[index]?.sku?.message} 
                        />
                        <AdminInput 
                          type="text"
                          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
                          label="Price (₹)" 
                          placeholder="0"
                          {...register(`variants.${index}.price`)} 
                          error={errors.variants?.[index]?.price?.message} 
                        />
                        <AdminInput 
                          type="text"
                          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
                          label="Stock Units" 
                          placeholder="0"
                          {...register(`variants.${index}.stock`)} 
                          error={errors.variants?.[index]?.stock?.message} 
                        />
                      </div>
                      <button 
                        type="button" 
                        onClick={() => removeVariant(index)}
                        className="mt-7 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        title="Remove Variant"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}

                  <AdminButton 
                    type="button" 
                    variant="outline" 
                    onClick={() => appendVariant({ name: '', sku: '', price: 0, stock: 0 })}
                    className="w-full border-dashed border-2 py-3 text-slate-600 dark:text-slate-300"
                  >
                    <Plus size={16} className="mr-1.5" />
                    Add Variant Option
                  </AdminButton>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                  <p className="font-medium text-slate-700 dark:text-slate-300">Single Item Product (No Variants)</p>
                  <p className="text-xs mt-1 text-slate-500">
                    Enable the checkbox above if this stone or jewellery piece comes in multiple sizes, carats, or metals.
                  </p>
                </div>
              )}
            </div>

            {/* 4. COVER & GALLERY IMAGES */}
            <div className={activeTab === 'media' ? 'space-y-6' : 'hidden'}>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                Cover Image & Feature Gallery
              </h2>

              {/* Cover (Primary) Image */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Cover Image (Primary Card & Catalog Thumbnail) *
                </label>
                
                {coverFile ? (
                  <div className="space-y-3 max-w-md">
                    <div className="relative w-48 h-48 rounded-xl border-2 border-blue-500 overflow-hidden shadow-md group">
                      <Image src={coverFile.previewUrl} alt="Cover Preview" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          URL.revokeObjectURL(coverFile.previewUrl);
                          setCoverFile(null);
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full shadow hover:bg-red-700 transition-colors"
                        title="Remove Cover Image"
                      >
                        <X size={16} />
                      </button>
                      <div className="absolute bottom-0 inset-x-0 bg-blue-600 text-white text-center py-1 text-xs font-semibold">
                        Primary Cover
                      </div>
                    </div>
                    <AdminInput
                      label="Cover Image Alt Text"
                      placeholder="e.g. Untreated Burmese Ruby gemstone"
                      {...register('primaryImage.altText')}
                    />
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center bg-slate-50 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors relative cursor-pointer group max-w-md">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleCoverUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
                    />
                    <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 mx-auto flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <UploadCloud size={24} />
                    </div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                      Click or drop cover image here
                    </p>
                    <p className="text-xs text-slate-400 mt-1">High resolution PNG, JPG, WebP</p>
                  </div>
                )}
              </div>

              {/* Gallery Images */}
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Feature Images (Gallery Views, Angles, Certificates)
                    </label>
                    <p className="text-xs text-slate-500">Upload multiple angle photos and certificates</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {galleryFiles.map((fileObj, idx) => (
                    <div key={fileObj.id} className="space-y-2">
                      <div className="relative aspect-square rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden group shadow-sm">
                        <Image src={fileObj.previewUrl} alt={`Gallery Preview ${idx + 1}`} fill sizes="(max-width: 768px) 50vw, 20vw" className="object-cover" />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(idx)}
                          className="absolute top-1.5 right-1.5 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                          title="Remove image"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <input 
                        type="text" 
                        placeholder="Alt text"
                        {...register(`gallery.${idx}.altText`)} 
                        className="w-full text-xs rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 px-2 py-1.5"
                      />
                    </div>
                  ))}

                  {/* Upload Box */}
                  <label className="aspect-square rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-800 flex flex-col items-center justify-center cursor-pointer transition-colors group">
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*" 
                      onChange={handleGalleryUpload}
                      className="hidden" 
                    />
                    <div className="w-9 h-9 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm text-blue-600 mb-1 group-hover:scale-110 transition-transform">
                      <Plus size={18} />
                    </div>
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                      Add Images
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* 5. SPECIFICATIONS & SEO */}
            <div className={activeTab === 'specs' ? 'space-y-5' : 'hidden'}>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
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

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Search Engine Optimization (SEO)
                </h3>
                <AdminInput label="Meta Title" placeholder="Custom page title for search engines" {...register('metaTitle')} />
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Meta Description</label>
                  <textarea 
                    rows={3} 
                    placeholder="Brief snippet shown in Google search results..."
                    {...register('metaDescription')} 
                    className="w-full rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2 text-sm" 
                  />
                </div>
              </div>
            </div>

            {/* 6. PURCHASE RULES */}
            <div className={activeTab === 'purchase' ? 'space-y-5' : 'hidden'}>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                Purchase & Consultation Settings
              </h2>

              <div className="space-y-3">
                <label className="flex items-start gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <input type="radio" value="BUY_ENQUIRE" {...register('purchaseType')} className="mt-1" />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Buy & Enquire (Recommended)</p>
                    <p className="text-xs text-slate-500">Customer can either Add to Cart directly or submit an enquiry lead.</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <input type="radio" value="BUY_ONLY" {...register('purchaseType')} className="mt-1" />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Buy Only (Standard E-Commerce)</p>
                    <p className="text-xs text-slate-500">Direct checkout only. No consultation form shown on product page.</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <input type="radio" value="ENQUIRE_ONLY" {...register('purchaseType')} className="mt-1" />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Enquire Only (High-Value / Collector Stones)</p>
                    <p className="text-xs text-slate-500">Disables direct cart checkout. Customers must speak with a gemmologist.</p>
                  </div>
                </label>
              </div>

              <div className="pt-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" {...register('whatsappEnabled')} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Enable 1-Click WhatsApp Consultation Button on product page</span>
                </label>
              </div>
            </div>

            {/* Next / Previous Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800 mt-8">
              <AdminButton
                type="button"
                variant="outline"
                onClick={handlePrev}
                disabled={currentTabIndex === 0}
              >
                Previous Step
              </AdminButton>
              
              {currentTabIndex < tabs.length - 1 ? (
                <AdminButton type="button" onClick={handleNext}>
                  Next Step
                </AdminButton>
              ) : (
                <AdminButton onClick={handleSubmit(onSubmit as any, onInvalid)} isLoading={isSubmitting} className="gap-2">
                  <Save size={18} />
                  Publish Product
                </AdminButton>
              )}
            </div>

          </form>
        </div>
      </div>

      {/* Validation Errors Modal */}
      {validationErrors && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-md w-full border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-red-50 dark:bg-red-900/20">
              <h3 className="font-semibold text-red-600 dark:text-red-400 flex items-center gap-2">
                <X size={18} /> Validation Errors
              </h3>
              <button onClick={() => setValidationErrors(null)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">Please fix the following required fields before saving:</p>
              <ul className="space-y-3">
                {validationErrors.map((err, i) => (
                  <li key={i} className="flex flex-col text-sm p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                    <span className="font-medium text-slate-800 dark:text-slate-200 capitalize">{err.field.replace(/\./g, ' ')}</span>
                    <span className="text-red-600 dark:text-red-400 mt-1">{err.message}</span>
                    <button 
                      type="button"
                      onClick={() => {
                        setValidationErrors(null);
                        setActiveTab(err.tabId);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-blue-600 text-xs font-semibold text-left mt-2 hover:underline"
                    >
                      Go to {tabs.find(t => t.id === err.tabId)?.label.replace(/^\d+\.\s/, '')} Tab &rarr;
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/20 flex justify-end">
              <AdminButton onClick={() => setValidationErrors(null)} variant="outline">Close</AdminButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
