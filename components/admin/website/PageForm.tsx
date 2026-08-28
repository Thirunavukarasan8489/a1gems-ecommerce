'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createContentPage } from '@/lib/actions/content.actions';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function PageForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slug, setSlug] = useState('');

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only auto-generate slug if the user hasn't manually typed one yet
    if (!slug || slug === generateSlug(e.target.value.slice(0, -1))) {
      setSlug(generateSlug(e.target.value));
    }
  };

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);

    const data = {
      title: formData.get('title'),
      slug: formData.get('slug'),
      content: formData.get('content'),
      seoTitle: formData.get('seoTitle'),
      seoDescription: formData.get('seoDescription'),
      isActive: formData.get('isActive') === 'on',
    };

    try {
      const result = await createContentPage(data);
      if (result.success) {
        toast.success('Page created successfully');
        setTimeout(() => {
          router.push('/admin/website/pages');
        }, 1500);
      } else {
        toast.error(result.error || 'Failed to create page');
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
          href="/admin/website/pages"
          className="p-2 text-gold-500 hover:text-gold-700 dark:hover:text-gold-300 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gold-800 dark:text-white">Create Static Page</h1>
          <p className="text-sm text-gold-500 dark:text-gold-400">Add a new informational page (e.g., About Us, Privacy Policy).</p>
        </div>
      </div>

      <form action={handleSubmit} className="bg-white dark:bg-gold-800 rounded-xl shadow-sm border border-gold-200 dark:border-gold-700 p-6 space-y-8">
        
        {/* Core Info */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gold-800 dark:text-white border-b border-gold-100 dark:border-gold-700 pb-2">Page Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gold-700 dark:text-gold-300">Page Title <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="title" 
                required
                onChange={handleTitleChange}
                placeholder="e.g. Terms of Service"
                className="w-full px-3 py-2 bg-gold-50 dark:bg-gold-900 border border-gold-200 dark:border-gold-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gold-700 dark:text-gold-300">URL Slug <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="slug" 
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. terms-of-service"
                className="w-full px-3 py-2 bg-gold-50 dark:bg-gold-900 border border-gold-200 dark:border-gold-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 font-mono text-sm"
              />
            </div>
          </div>

          <div className="space-y-1 pt-2">
            <label className="text-sm font-medium text-gold-700 dark:text-gold-300 flex justify-between">
              <span>Page Content (HTML or Markdown)</span>
              <span className="text-xs text-gold-500">Supports basic formatting</span>
            </label>
            <textarea 
              name="content" 
              rows={15}
              className="w-full px-3 py-2 bg-gold-50 dark:bg-gold-900 border border-gold-200 dark:border-gold-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 font-mono text-sm"
              placeholder="<h1>Main Heading</h1><p>Paragraph content...</p>"
            />
          </div>
        </div>

        {/* SEO Data */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gold-800 dark:text-white border-b border-gold-100 dark:border-gold-700 pb-2">SEO Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium text-gold-700 dark:text-gold-300">SEO Meta Title</label>
              <input 
                type="text" 
                name="seoTitle" 
                placeholder="Leave blank to use Page Title"
                className="w-full px-3 py-2 bg-gold-50 dark:bg-gold-900 border border-gold-200 dark:border-gold-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium text-gold-700 dark:text-gold-300">SEO Meta Description</label>
              <textarea 
                name="seoDescription" 
                rows={3}
                placeholder="Brief summary for search engines (max 160 characters)"
                className="w-full px-3 py-2 bg-gold-50 dark:bg-gold-900 border border-gold-200 dark:border-gold-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
          </div>
        </div>

        {/* Visibility */}
        <div className="pt-2">
          <div className="flex items-center gap-3">
            <input 
              type="checkbox" 
              name="isActive" 
              id="isActive"
              defaultChecked
              className="w-4 h-4 text-gold-600 rounded border-gold-300 focus:ring-gold-500"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gold-700 dark:text-gold-300">
              Publish Page Immediately (Is Active)
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-gold-200 dark:border-gold-700 flex justify-end gap-3">
          <Link 
            href="/admin/website/pages"
            className="px-4 py-2 border border-gold-300 dark:border-gold-600 text-gold-700 dark:text-gold-300 rounded-md hover:bg-gold-50 dark:hover:bg-gold-800 font-medium transition-colors"
          >
            Cancel
          </Link>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-6 py-2 bg-gold-600 hover:bg-gold-700 disabled:opacity-50 text-white rounded-md font-medium transition-colors flex items-center gap-2"
          >
            {isSubmitting ? 'Saving...' : <><Save size={18} /> Save Page</>}
          </button>
        </div>
      </form>
    </div>
  );
}
