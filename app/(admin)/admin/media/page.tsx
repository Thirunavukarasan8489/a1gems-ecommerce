'use client';

import { useState, useEffect, useRef } from 'react';
import { UploadCloud, Search, Trash2, CheckCircle2, FileText, Image as ImageIcon, X, Copy } from 'lucide-react';
import Image from 'next/image';
import { AdminButton } from '@/components/admin/ui/AdminButton';
import { getMediaAssets, uploadMedia, deleteMediaAsset, checkCloudinaryConfig } from '@/lib/actions/media.actions';

export default function MediaLibraryPage() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isConfigured, setIsConfigured] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkConfigAndFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function checkConfigAndFetch() {
    setLoading(true);
    const config = await checkCloudinaryConfig();
    setIsConfigured(config.isConfigured);
    
    if (config.isConfigured) {
      await fetchMedia();
    }
    setLoading(false);
  };

  async function fetchMedia() {
    const res = await getMediaAssets();
    if (res.success) {
      setMedia(res.data);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    const res = await uploadMedia(formData);
    if (res.success) {
      await fetchMedia();
    } else {
      alert(`Upload failed: ${res.error}`);
    }
    
    setUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const handleDelete = async () => {
    if (selectedItems.size === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedItems.size} items?`)) return;

    for (const id of Array.from(selectedItems)) {
      await deleteMediaAsset(id);
    }
    
    setSelectedItems(new Set());
    fetchMedia();
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!');
  };

  const filteredMedia = media.filter(m => {
    const name = m.publicId.split('/').pop() || '';
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      
      {!isConfigured && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg border border-red-200 dark:border-red-900/50 flex flex-col gap-2">
          <h3 className="font-bold">Cloudinary Configuration Missing</h3>
          <p className="text-sm">Please add <code className="font-mono bg-red-100 dark:bg-red-900/50 px-1 rounded">CLOUDINARY_CLOUD_NAME</code>, <code className="font-mono bg-red-100 dark:bg-red-900/50 px-1 rounded">CLOUDINARY_API_KEY</code>, and <code className="font-mono bg-red-100 dark:bg-red-900/50 px-1 rounded">CLOUDINARY_API_SECRET</code> to your <code className="font-mono bg-red-100 dark:bg-red-900/50 px-1 rounded">.env.local</code> file to enable media uploads.</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gold-800 dark:text-white flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-purple-500" />
            Media Library
          </h1>
          <p className="text-sm text-gold-500 dark:text-gold-400 mt-1">Manage images, banners, and documents powered by Cloudinary.</p>
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileSelect}
          accept="image/*,video/*"
        />

        <AdminButton 
          onClick={() => fileInputRef.current?.click()} 
          disabled={!isConfigured || uploading}
          className="gap-2 bg-purple-600 hover:bg-purple-700 border-purple-700 text-white"
        >
          <UploadCloud size={18} />
          {uploading ? 'Uploading...' : 'Upload Media'}
        </AdminButton>
      </div>

      <div className="bg-white dark:bg-gold-900 border border-gold-200 dark:border-gold-800 shadow-sm rounded-xl overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-gold-200 dark:border-gold-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search size={16} className="text-gold-400" />
              </span>
              <input
                type="text"
                placeholder="Search media..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gold-200 dark:border-gold-700 rounded-md text-sm bg-gold-50 dark:bg-gold-800 text-gold-800 dark:text-gold-200 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-64 transition-colors"
              />
            </div>
          </div>

          {selectedItems.size > 0 && (
            <div className="flex items-center gap-3 bg-purple-50 dark:bg-purple-900/20 px-4 py-2 rounded-lg border border-purple-100 dark:border-purple-800">
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                {selectedItems.size} selected
              </span>
              <div className="h-4 w-px bg-purple-200 dark:bg-purple-700"></div>
              <button onClick={handleDelete} className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors">
                <Trash2 size={16} /> Delete
              </button>
            </div>
          )}
        </div>

        {/* Media Grid */}
        <div className="p-6">
          {loading ? (
            <div className="py-12 text-center text-gold-500">Loading media...</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              
              {/* Upload Box (First item in grid) */}
              <div 
                onClick={() => { if (isConfigured && !uploading) fileInputRef.current?.click(); }}
                className={`aspect-square rounded-xl border-2 border-dashed border-gold-300 dark:border-gold-700 bg-gold-50 dark:bg-gold-800/50 flex flex-col items-center justify-center transition-colors group ${
                  isConfigured && !uploading ? 'cursor-pointer hover:bg-gold-100 dark:hover:bg-gold-800' : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="h-10 w-10 bg-white dark:bg-gold-700 rounded-full flex items-center justify-center mb-2 shadow-sm border border-gold-200 dark:border-gold-600 group-hover:scale-110 transition-transform">
                  <UploadCloud className="text-purple-600 dark:text-purple-400" size={20} />
                </div>
                <span className="text-sm font-medium text-gold-600 dark:text-gold-300">
                  {uploading ? 'Uploading...' : 'Upload'}
                </span>
              </div>

              {/* Media Items */}
              {filteredMedia.map((item) => {
                const isSelected = selectedItems.has(item._id);
                const filename = item.publicId.split('/').pop() || 'file';
                const sizeKB = Math.round((item.bytes || 0) / 1024);
                
                return (
                  <div key={item._id} className="relative group">
                    <div 
                      onClick={() => toggleSelect(item._id)}
                      className={`relative aspect-square rounded-xl border-2 overflow-hidden cursor-pointer transition-all ${
                        isSelected ? 'border-purple-500 shadow-md' : 'border-gold-200 dark:border-gold-700 hover:border-gold-300 dark:hover:border-gold-600'
                      }`}
                    >
                      {/* Selection Indicator */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 z-20 bg-white rounded-full">
                          <CheckCircle2 className="text-purple-600" size={20} fill="currentColor" />
                        </div>
                      )}
                      
                      {/* Hover Overlay */}
                      <div className={`absolute inset-0 bg-gold-900/20 z-10 transition-opacity ${isSelected ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`} />

                      {/* Image/File Preview */}
                      {item.resourceType === 'image' ? (
                        <Image 
                          src={item.secureUrl || item.url} 
                          alt={filename} 
                          fill 
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                          className="object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gold-100 dark:bg-gold-800">
                          <FileText size={48} className="text-gold-400" />
                        </div>
                      )}

                      {/* Copy Link Button (Visible on hover) */}
                      <button 
                        onClick={(e) => { e.stopPropagation(); copyUrl(item.secureUrl || item.url); }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gold-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gold-50 text-gold-700"
                        title="Copy URL"
                      >
                        <Copy size={16} />
                      </button>

                      {/* File Info Bar */}
                      <div className="absolute bottom-0 inset-x-0 bg-white/90 dark:bg-gold-900/90 backdrop-blur-sm border-t border-gold-200 dark:border-gold-700 p-2 text-xs truncate z-20">
                        <p className="font-medium text-gold-800 dark:text-white truncate">{filename}</p>
                        <p className="text-gold-500 dark:text-gold-400 mt-0.5">{sizeKB} KB</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {!loading && filteredMedia.length === 0 && media.length > 0 && (
            <div className="text-center py-12 text-gold-500 dark:text-gold-400">
              No media found matching &quot;{searchTerm}&quot;
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
