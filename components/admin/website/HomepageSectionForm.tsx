'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createHomepageSection } from '@/lib/actions/cms.actions';
import { Save, X, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function HomepageSectionForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);

    const data = {
      name: formData.get('name'),
      type: formData.get('type'),
      title: formData.get('title'),
      subtitle: formData.get('subtitle'),
      description: formData.get('description'),
      mediaUrl: formData.get('mediaUrl'),
      ctaText: formData.get('ctaText'),
      ctaLink: formData.get('ctaLink'),
      displayOrder: formData.get('displayOrder') ? Number(formData.get('displayOrder')) : undefined,
      isActive: formData.get('isActive') === 'on',
    };

    try {
      const result = await createHomepageSection(data);
      if (result.success) {
        toast.success('Section created successfully');
        setTimeout(() => {
          router.push('/admin/website/homepage');
        }, 1500);
      } else {
        toast.error(result.error || 'Failed to create section');
      }
    } catch (err: any) {
      toast.error(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/website/homepage"
          className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Create Homepage Section</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Add a new section to the public homepage.</p>
        </div>
      </div>

      <form action={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden p-6 space-y-8">
        
        {/* Core Info */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-2">Basic Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Internal Name <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="name" 
                required
                placeholder="e.g. Summer Sale Banner"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Section Type <span className="text-red-500">*</span></label>
              <select 
                name="type" 
                required
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="HERO_BANNER">Hero Banner</option>
                <option value="PROMOTIONAL_BANNER">Promotional Banner</option>
                <option value="FEATURED_CATEGORY">Featured Category</option>
                <option value="TRUST_HIGHLIGHTS">Trust Highlights</option>
                <option value="CUSTOM">Custom Section</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-2">Content</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Display Title</label>
              <input 
                type="text" 
                name="title" 
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Subtitle</label>
              <input 
                type="text" 
                name="subtitle" 
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
              <textarea 
                name="description" 
                rows={3}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Media & Action */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-2">Media & Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Image/Media URL (Cloudinary)</label>
              <input 
                type="url" 
                name="mediaUrl" 
                placeholder="https://res.cloudinary.com/..."
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-600 dark:text-blue-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Button/CTA Text</label>
              <input 
                type="text" 
                name="ctaText" 
                placeholder="Shop Now"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Button/CTA Link</label>
              <input 
                type="text" 
                name="ctaLink" 
                placeholder="/collections/rubies"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-2">Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Display Order</label>
              <input 
                type="number" 
                name="displayOrder" 
                placeholder="Leave blank to add at the end"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-3 pt-6">
              <input 
                type="checkbox" 
                name="isActive" 
                id="isActive"
                defaultChecked
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Publish Immediately (Is Active)
              </label>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
          <Link 
            href="/admin/website/homepage"
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 font-medium transition-colors"
          >
            Cancel
          </Link>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-md font-medium transition-colors flex items-center gap-2"
          >
            {isSubmitting ? 'Saving...' : <><Save size={18} /> Save Section</>}
          </button>
        </div>
      </form>
    </div>
  );
}
