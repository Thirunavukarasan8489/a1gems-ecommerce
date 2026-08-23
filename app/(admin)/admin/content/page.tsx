import Link from 'next/link';
import { BookOpen, PhoneCall } from 'lucide-react';

export default function ContentOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Content Management</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your editorial content, guides, and contact information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link 
          href="/admin/content/guides"
          className="block p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-colors group"
        >
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
            <BookOpen size={24} />
          </div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Gemstone Guides</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Create and manage educational articles and buying guides.
          </p>
        </Link>

        <Link 
          href="/admin/content/contact"
          className="block p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-colors group"
        >
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
            <PhoneCall size={24} />
          </div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Contact Info</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Update phone numbers, email addresses, and physical locations.
          </p>
        </Link>
      </div>
    </div>
  );
}
