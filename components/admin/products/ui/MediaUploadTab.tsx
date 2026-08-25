'use client';

import React from 'react';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import { UploadCloud, X, Trash2, Plus } from 'lucide-react';
import { AdminInput } from '@/components/admin/ui/AdminInput';
import { ProductFormValues } from '../ProductForm';

interface MediaUploadTabProps {
  isActive: boolean;
  coverFile: { file: File; previewUrl: string } | null;
  setCoverFile: (val: { file: File; previewUrl: string } | null) => void;
  galleryFiles: { file: File; previewUrl: string; id: string }[];
  handleCoverUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGalleryUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeGalleryImage: (index: number) => void;
}

export function MediaUploadTab({
  isActive,
  coverFile,
  setCoverFile,
  galleryFiles,
  handleCoverUpload,
  handleGalleryUpload,
  removeGalleryImage
}: MediaUploadTabProps) {
  const { register } = useFormContext<ProductFormValues>();

  return (
    <div className={isActive ? 'space-y-6' : 'hidden'}>
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
  );
}
