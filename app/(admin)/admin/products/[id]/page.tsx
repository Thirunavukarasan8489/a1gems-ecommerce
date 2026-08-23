import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Edit, ArrowLeft, Trash2, Tag, Box, Info, Image as ImageIcon } from 'lucide-react';
import { getProductById } from '@/lib/actions/product.actions';
import StatusBadge from '@/components/admin/ui/StatusBadge';
import DeleteConfirmButton from '@/components/admin/ui/DeleteConfirmButton';
import { deleteProduct } from '@/lib/actions/product.actions';

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
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <Link href="/admin/products" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 mb-3 transition-colors">
            <ArrowLeft size={16} /> Back to Products
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{product.name}</h1>
            <StatusBadge label={statusLabel} variant={statusVariant} />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">/{product.slug}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link
            href={`/admin/products/${id}/edit`}
            className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            <Edit size={16} />
            Edit Product
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Information */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex items-center gap-2">
              <Info size={18} className="text-slate-500" />
              <h2 className="font-semibold text-slate-800 dark:text-white">General Information</h2>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Category</h3>
                <p className="text-slate-800 dark:text-slate-200">{product.category?.name || 'Uncategorized'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Short Description</h3>
                <p className="text-slate-800 dark:text-slate-200">{product.shortDescription || '—'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Full Description</h3>
                <div className="text-slate-800 dark:text-slate-300 text-sm prose dark:prose-invert max-w-none border border-slate-100 dark:border-slate-800 p-4 rounded-lg bg-slate-50/30 dark:bg-slate-900/50 whitespace-pre-wrap">
                  {product.description || '—'}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex items-center gap-2">
              <Tag size={18} className="text-slate-500" />
              <h2 className="font-semibold text-slate-800 dark:text-white">Pricing & Inventory</h2>
            </div>
            <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Base Price</h3>
                <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">₹{product.basePrice?.toLocaleString('en-IN') || '0'}</p>
              </div>
              <div>
                <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Compare Price</h3>
                <p className="text-slate-800 dark:text-slate-200 line-through text-sm mt-1">{product.comparePrice ? `₹${product.comparePrice.toLocaleString('en-IN')}` : '—'}</p>
              </div>
              <div>
                <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Base SKU</h3>
                <p className="text-slate-800 dark:text-slate-200">{product.baseSku || '—'}</p>
              </div>
              <div>
                <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Stock Qty</h3>
                <p className={`text-lg font-semibold ${product.stockQuantity < (product.lowStockThreshold || 5) ? 'text-orange-600 dark:text-orange-400' : 'text-slate-800 dark:text-slate-200'}`}>
                  {product.stockQuantity || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex items-center gap-2">
              <Box size={18} className="text-slate-500" />
              <h2 className="font-semibold text-slate-800 dark:text-white">Specifications</h2>
            </div>
            <div className="p-0">
              <table className="w-full text-sm text-left">
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr className="bg-white dark:bg-slate-900">
                    <th className="px-5 py-3 font-medium text-slate-500 dark:text-slate-400 w-1/3">Material</th>
                    <td className="px-5 py-3 text-slate-800 dark:text-slate-200">{product.material || '—'}</td>
                  </tr>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/20">
                    <th className="px-5 py-3 font-medium text-slate-500 dark:text-slate-400">Stone</th>
                    <td className="px-5 py-3 text-slate-800 dark:text-slate-200">{product.stone || '—'}</td>
                  </tr>
                  <tr className="bg-white dark:bg-slate-900">
                    <th className="px-5 py-3 font-medium text-slate-500 dark:text-slate-400">Size</th>
                    <td className="px-5 py-3 text-slate-800 dark:text-slate-200">{product.size || '—'}</td>
                  </tr>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/20">
                    <th className="px-5 py-3 font-medium text-slate-500 dark:text-slate-400">Weight</th>
                    <td className="px-5 py-3 text-slate-800 dark:text-slate-200">{product.weight || '—'}</td>
                  </tr>
                  <tr className="bg-white dark:bg-slate-900">
                    <th className="px-5 py-3 font-medium text-slate-500 dark:text-slate-400">Origin</th>
                    <td className="px-5 py-3 text-slate-800 dark:text-slate-200">{product.origin || '—'}</td>
                  </tr>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/20">
                    <th className="px-5 py-3 font-medium text-slate-500 dark:text-slate-400">Certification</th>
                    <td className="px-5 py-3 text-slate-800 dark:text-slate-200">{product.certification || '—'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Variants (If Applicable) */}
          {product.hasVariants && product.variants && product.variants.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex items-center gap-2">
                <Box size={18} className="text-slate-500" />
                <h2 className="font-semibold text-slate-800 dark:text-white">Variants</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 uppercase text-xs">
                    <tr>
                      <th className="px-5 py-3">Name</th>
                      <th className="px-5 py-3">SKU</th>
                      <th className="px-5 py-3">Price</th>
                      <th className="px-5 py-3">Stock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {product.variants.map((variant: any, idx: number) => (
                      <tr key={idx} className="bg-white dark:bg-slate-900">
                        <td className="px-5 py-3 font-medium text-slate-800 dark:text-slate-200">{variant.name}</td>
                        <td className="px-5 py-3 text-slate-600 dark:text-slate-400">{variant.sku}</td>
                        <td className="px-5 py-3 text-slate-800 dark:text-slate-200">₹{variant.price?.toLocaleString('en-IN')}</td>
                        <td className="px-5 py-3 text-slate-800 dark:text-slate-200">{variant.stock}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Media & Config */}
        <div className="space-y-6">
          {/* Media Showcase */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex items-center gap-2">
              <ImageIcon size={18} className="text-slate-500" />
              <h2 className="font-semibold text-slate-800 dark:text-white">Media</h2>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Primary Cover</h3>
                <div className="relative aspect-square w-full rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
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
              
              {product.gallery && product.gallery.length > 0 && (
                <div>
                  <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Gallery ({product.gallery.length})</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {product.gallery.map((img: any, idx: number) => (
                      <div key={idx} className="relative aspect-square rounded-md overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                        {img.url ? (
                          <Image src={img.url} alt={img.altText || `Gallery image ${idx+1}`} fill sizes="(max-width: 768px) 33vw, 15vw" className="object-cover" />
                        ) : (
                          <div className="w-full h-full bg-slate-100 dark:bg-slate-800" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Purchase Settings */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex items-center gap-2">
              <Tag size={18} className="text-slate-500" />
              <h2 className="font-semibold text-slate-800 dark:text-white">Purchase Config</h2>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Purchase Mode</h3>
                <div className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300">
                  {product.purchaseType === 'BUY_ONLY' ? 'Buy Only' : 
                   product.purchaseType === 'ENQUIRE_ONLY' ? 'Enquire Only' : 'Buy + Enquire'}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">WhatsApp Chat</h3>
                <div className="inline-block px-3 py-1 bg-green-50 dark:bg-green-900/20 rounded-md text-sm font-medium text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/50">
                  {product.whatsappEnabled ? 'Enabled' : 'Disabled'}
                </div>
              </div>
            </div>
          </div>

          {/* SEO Metadata */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex items-center gap-2">
              <Info size={18} className="text-slate-500" />
              <h2 className="font-semibold text-slate-800 dark:text-white">SEO Data</h2>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Meta Title</h3>
                <p className="text-slate-800 dark:text-slate-200 text-sm">{product.metaTitle || product.name}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Meta Description</h3>
                <p className="text-slate-800 dark:text-slate-200 text-sm">{product.metaDescription || product.shortDescription || '—'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
