'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createGuide } from '@/lib/actions/content.actions';
import { Save, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function GuideForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
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
    setError('');

    const data = {
      title: formData.get('title'),
      slug: formData.get('slug'),
      excerpt: formData.get('excerpt'),
      content: formData.get('content'),
      featuredImage: formData.get('featuredImage'),
      readTimeMinutes: formData.get('readTimeMinutes') ? Number(formData.get('readTimeMinutes')) : undefined,
      author: formData.get('author'),
      seoTitle: formData.get('seoTitle'),
      seoDescription: formData.get('seoDescription'),
      isActive: formData.get('isActive') === 'on',
    };

    try {
      const result = await createGuide(data);
      if (result.success) {
        router.push('/admin/content/guides');
      } else {
        setError(result.error || 'Failed to create guide');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/content/guides"
          className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Create Gemstone Guide</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Add an educational article to the knowledge base.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg text-sm border border-red-200 dark:border-red-800">
          {error}
        </div>
      )}

      <form action={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 space-y-8">
        
        {/* Core Info */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-2">Guide Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Title <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="title" 
                required
                onChange={handleTitleChange}
                placeholder="e.g. How to Buy a Ruby"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">URL Slug <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="slug" 
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. how-to-buy-a-ruby"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              />
            </div>
            
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Excerpt</label>
              <textarea 
                name="excerpt" 
                rows={2}
                placeholder="A short summary of the guide for preview cards."
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1 pt-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex justify-between">
              <span>Full Content (HTML or Markdown)</span>
            </label>
            <textarea 
              name="content" 
              rows={12}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              placeholder="<h1>Main Heading</h1><p>Paragraph content...</p>"
            />
          </div>
        </div>

        {/* Media & Meta */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-2">Media & Authorship</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Featured Image URL (Cloudinary)</label>
              <div className="flex gap-2">
                <input 
                  type="url" 
                  name="featuredImage" 
                  placeholder="https://res.cloudinary.com/..."
                  className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-600 dark:text-blue-400"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Author</label>
              <input 
                type="text" 
                name="author" 
                defaultValue="A1 Gems Editorial Team"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Estimated Read Time (Minutes)</label>
              <input 
                type="number" 
                name="readTimeMinutes" 
                defaultValue={5}
                min={1}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* SEO Data */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-2">SEO Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">SEO Meta Title</label>
              <input 
                type="text" 
                name="seoTitle" 
                placeholder="Leave blank to use Guide Title"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">SEO Meta Description</label>
              <textarea 
                name="seoDescription" 
                rows={3}
                placeholder="Leave blank to use Guide Excerpt"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Publish Guide Immediately (Is Active)
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
          <Link 
            href="/admin/content/guides"
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 font-medium transition-colors"
          >
            Cancel
          </Link>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-md font-medium transition-colors flex items-center gap-2"
          >
            {isSubmitting ? 'Saving...' : <><Save size={18} /> Save Guide</>}
          </button>
        </div>
      </form>
    </div>
  );
}
