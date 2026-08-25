import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Edit, ArrowLeft, Trash2, Tag, Box, Info, Image as ImageIcon, Layers, Settings, FileText, CheckCircle2 } from 'lucide-react';
import { getProductById } from '@/lib/actions/product.actions';
import StatusBadge from '@/components/admin/ui/StatusBadge';

export const dynamic = 'force-dynamic';

export default function ViewProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  
  return <ProductViewLoader id={productId} />;
}

async function ProductViewLoader({ id }: { id: string }) {
  const result = await getProductById(id);
  
  if (!result.success || !result.data) {
    notFound();
  }
  
  const product = result.data;
  
  const stockStatus = product.stockStatus ?? 'IN_STOCK';
  const status = product.status ?? 'ACTIVE';
  
  let statusLabel = 'Active';
  let statusVariant: 'success' | 'warning' | 'danger' | 'neutral' = 'success';
  if (status === 'DRAFT') { statusLabel = 'Draft'; statusVariant = 'neutral'; }
  else if (stockStatus === 'LOW_STOCK') { statusLabel = 'Low Stock'; statusVariant = 'warning'; }
  else if (stockStatus === 'OUT_OF_STOCK') { statusLabel = 'Out of Stock'; statusVariant = 'danger'; }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link href="/admin/products" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 mb-2 transition-colors">
            <ArrowLeft size={16} /> Back to Products
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              {product.name}
            </h1>
            <StatusBadge label={statusLabel} variant={statusVariant} />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
            <span>Slug: /{product.slug}</span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span>ID: {id}</span>
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link
            href={`/admin/products/${id}/edit`}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <Edit size={16} />
            Edit Product
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Main Info */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. Basic Info */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <Info size={18} className="text-slate-500 dark:text-slate-400" />
              <h2 className="font-semibold text-slate-800 dark:text-white">Basic Information</h2>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Category</h3>
                  <p className="text-slate-800 dark:text-slate-200 font-medium">{product.category?.name || 'Uncategorized'}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Short Summary</h3>
                  <p className="text-slate-800 dark:text-slate-200 truncate">{product.shortDescription || '—'}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Detailed Description</h3>
                <div className="text-slate-700 dark:text-slate-300 text-sm prose dark:prose-invert max-w-none bg-slate-50 dark:bg-slate-800/30 p-4 rounded-lg border border-slate-100 dark:border-slate-800 whitespace-pre-wrap">
                  {product.description || '—'}
                </div>
              </div>
            </div>
          </div>

          {/* 2. Pricing & Variants */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <Layers size={18} className="text-slate-500 dark:text-slate-400" />
              <h2 className="font-semibold text-slate-800 dark:text-white">Pricing & Inventory</h2>
            </div>
            
            {product.hasVariants && product.variants && product.variants.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 text-xs border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="px-4 py-3 font-medium">Carat</th>
                      <th className="px-4 py-3 font-medium">Size (mm)</th>
                      <th className="px-4 py-3 font-medium">Price</th>
                      <th className="px-4 py-3 font-medium">Compare At</th>
                      <th className="px-4 py-3 font-medium">Stock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {product.variants.map((variant: any, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">{variant.caratApprox || '—'}</td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{variant.size || '—'}</td>
                        <td className="px-4 py-3 text-slate-900 dark:text-white font-semibold">₹{variant.price?.toLocaleString('en-IN') || '0'}</td>
                        <td className="px-4 py-3 text-slate-500 dark:text-slate-400 line-through text-xs">
                          {variant.comparePrice ? `₹${variant.comparePrice.toLocaleString('en-IN')}` : '—'}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${variant.stock < (variant.lowStockThreshold || 5) ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
                            {variant.stock || 0} in stock
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">No variants configured for this product.</p>
              </div>
            )}
          </div>

          {/* 3. Media & Images */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <ImageIcon size={18} className="text-slate-500 dark:text-slate-400" />
              <h2 className="font-semibold text-slate-800 dark:text-white">Media Assets</h2>
            </div>
            <div className="p-5 flex flex-col md:flex-row gap-6">
              {/* Primary Cover */}
              <div className="w-full md:w-1/3 shrink-0">
                <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Primary Cover</h3>
                <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shadow-sm">
                  {product.primaryImage?.url ? (
                    <Image src={product.primaryImage.url} alt={product.primaryImage.altText || product.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-sm">
                      <ImageIcon size={24} className="mb-2 opacity-50" />
                      No cover image
                    </div>
                  )}
                </div>
              </div>

              {/* Gallery Images */}
              <div className="flex-1 min-w-0 border-l border-slate-100 dark:border-slate-800 pl-0 md:pl-6 pt-6 md:pt-0 mt-6 md:mt-0">
                <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Gallery ({product.gallery?.length || 0})</h3>
                {product.gallery && product.gallery.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {product.gallery.map((img: any, idx: number) => (
                      <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shadow-sm">
                        {img.url ? (
                          <Image src={img.url} alt={img.altText || `Gallery image ${idx+1}`} fill sizes="15vw" className="object-cover hover:scale-105 transition-transform" />
                        ) : (
                          <div className="w-full h-full" />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full min-h-[120px] flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/20">
                    <p className="text-sm text-slate-500 dark:text-slate-400">No gallery images uploaded.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* RIGHT COLUMN: Meta Info */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* 4. Specifications */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <Box size={18} className="text-slate-500 dark:text-slate-400" />
              <h2 className="font-semibold text-slate-800 dark:text-white">Specifications</h2>
            </div>
            <div className="p-0">
              <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                <li className="px-5 py-3 flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Gemstone Type</span>
                  <span className="text-sm text-slate-800 dark:text-slate-200 font-medium">{product.stone || '—'}</span>
                </li>
                <li className="px-5 py-3 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Weight</span>
                  <span className="text-sm text-slate-800 dark:text-slate-200 font-medium">{product.weight || '—'}</span>
                </li>
                <li className="px-5 py-3 flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Origin/Mine</span>
                  <span className="text-sm text-slate-800 dark:text-slate-200 font-medium">{product.origin || '—'}</span>
                </li>
                <li className="px-5 py-3 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Material</span>
                  <span className="text-sm text-slate-800 dark:text-slate-200 font-medium">{product.material || '—'}</span>
                </li>
                <li className="px-5 py-3 flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Dimensions</span>
                  <span className="text-sm text-slate-800 dark:text-slate-200 font-medium">{product.size || '—'}</span>
                </li>
                <li className="px-5 py-3 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Certification</span>
                  <span className="text-sm text-slate-800 dark:text-slate-200 font-medium">{product.certification || '—'}</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* 5. Purchase Rules */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <Settings size={18} className="text-slate-500 dark:text-slate-400" />
              <h2 className="font-semibold text-slate-800 dark:text-white">Purchase Rules</h2>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Checkout Mode</h3>
                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  <Tag size={16} className="text-slate-600 dark:text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {product.purchaseType === 'BUY_ONLY' ? 'Buy Only' : 
                       product.purchaseType === 'ENQUIRE_ONLY' ? 'Enquire Only' : 
                       'Buy & Enquire'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">WhatsApp Consultation</h3>
                <div className={`flex items-start gap-3 p-3 rounded-lg border ${product.whatsappEnabled ? 'bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-900/30' : 'bg-slate-50 border-slate-200 dark:bg-slate-800/50 dark:border-slate-700'}`}>
                  {product.whatsappEnabled ? (
                    <CheckCircle2 size={16} className="text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className={`text-sm font-semibold ${product.whatsappEnabled ? 'text-green-800 dark:text-green-400' : 'text-slate-600 dark:text-slate-400'}`}>
                      {product.whatsappEnabled ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 6. SEO Data */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <FileText size={18} className="text-slate-500 dark:text-slate-400" />
              <h2 className="font-semibold text-slate-800 dark:text-white">SEO</h2>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Meta Title</h4>
                <p className="text-slate-800 dark:text-slate-200 text-sm font-medium">
                  {product.metaTitle || product.name}
                </p>
              </div>
              
              <div>
                <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Meta Description</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm bg-slate-50 dark:bg-slate-800/30 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                  {product.metaDescription || product.shortDescription || '—'}
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
