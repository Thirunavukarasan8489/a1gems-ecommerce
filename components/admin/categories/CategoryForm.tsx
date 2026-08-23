'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save, ArrowLeft, UploadCloud } from 'lucide-react';
import { createCategory } from '@/lib/actions/category.actions';
import { uploadMedia } from '@/lib/actions/media.actions';

export default function CategoryForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    status: 'ACTIVE',
    metaTitle: '',
    metaDescription: '',
    image: '',
  });
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');

  // Auto-generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      // Create local preview URL
      setImagePreview(URL.createObjectURL(file));
      // Clear out the manual image string just in case
      setFormData(prev => ({ ...prev, image: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      let finalImageUrl = formData.image;
      
      // If a file is selected, upload it first
      if (selectedFile) {
        const uploadData = new FormData();
        uploadData.append('file', selectedFile);
        
        const uploadResult = await uploadMedia(uploadData);
        if (uploadResult.success && uploadResult.data) {
          finalImageUrl = uploadResult.data.secureUrl || uploadResult.data.url;
        } else {
          throw new Error(uploadResult.error || 'Failed to upload image');
        }
      }

      // Then create the category with the new URL
      const categoryData = {
        ...formData,
        image: finalImageUrl,
      };

      const result = await createCategory(categoryData);
      if (result.success) {
        router.push('/admin/categories');
      } else {
        setError(result.error || 'Failed to create category');
        setIsSubmitting(false);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/categories"
            className="p-2 border border-slate-200 dark:border-slate-700 rounded-md text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Create Category</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Add a new product category to the catalogue
            </p>
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-5 py-2.5 rounded-md text-sm font-medium transition-colors"
        >
          <Save size={16} />
          {isSubmitting ? 'Saving...' : 'Save Category'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleNameChange}
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  placeholder="e.g. Ruby Rings"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Slug *
                </label>
                <input
                  type="text"
                  name="slug"
                  required
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  placeholder="e.g. ruby-rings"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  placeholder="Describe the category..."
                />
              </div>
            </div>
          </div>
          
          {/* SEO Details */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Search Engine Optimization</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Meta Title
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  placeholder="Leave blank to use category name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Meta Description
                </label>
                <textarea
                  name="metaDescription"
                  rows={3}
                  value={formData.metaDescription}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Status</h3>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Visibility
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="ACTIVE">Active (Visible)</option>
                <option value="DRAFT">Draft (Hidden)</option>
              </select>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Category Image</h3>
            <div className="space-y-4">
              
              <div className="flex flex-col items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 dark:hover:bg-bray-800 dark:bg-slate-800 hover:bg-slate-100 dark:border-slate-600 dark:hover:border-slate-500 dark:hover:bg-slate-700 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-8 h-8 mb-2 text-slate-400" />
                    <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange} 
                  />
                </label>
              </div>

              {/* Preview */}
              {(imagePreview || formData.image) && (
                <div className="relative w-full h-40 rounded-md overflow-hidden border border-slate-200 dark:border-slate-700 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={imagePreview || formData.image} 
                    alt="Category preview" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setImagePreview('');
                        setFormData(prev => ({ ...prev, image: '' }));
                      }}
                      className="text-white text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Or enter image URL manually
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={(e) => {
                    handleChange(e);
                    // Clear file selection if manual URL is entered
                    if (e.target.value) {
                      setSelectedFile(null);
                      setImagePreview('');
                    }
                  }}
                  disabled={!!selectedFile}
                  className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
                  placeholder="https://res.cloudinary.com/..."
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
