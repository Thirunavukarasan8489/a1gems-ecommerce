import Link from 'next/link';
import { BookOpen, PhoneCall } from 'lucide-react';

export default function ContentOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gold-800 dark:text-white">Content Management</h1>
        <p className="text-sm text-gold-500 dark:text-gold-400 mt-1">
          Manage your editorial content, guides, and contact information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link 
          href="/admin/content/guides"
          className="block p-6 bg-white dark:bg-gold-800 border border-gold-200 dark:border-gold-700 rounded-xl hover:border-gold-500 dark:hover:border-gold-500 transition-colors group"
        >
          <div className="w-12 h-12 bg-gold-50 dark:bg-gold-900/30 rounded-lg flex items-center justify-center text-gold-600 dark:text-gold-400 mb-4 group-hover:scale-110 transition-transform">
            <BookOpen size={24} />
          </div>
          <h2 className="text-lg font-semibold text-gold-800 dark:text-white">Gemstone Guides</h2>
          <p className="text-sm text-gold-500 dark:text-gold-400 mt-2">
            Create and manage educational articles and buying guides.
          </p>
        </Link>

        <Link 
          href="/admin/content/contact"
          className="block p-6 bg-white dark:bg-gold-800 border border-gold-200 dark:border-gold-700 rounded-xl hover:border-gold-500 dark:hover:border-gold-500 transition-colors group"
        >
          <div className="w-12 h-12 bg-gold-50 dark:bg-gold-900/30 rounded-lg flex items-center justify-center text-gold-600 dark:text-gold-400 mb-4 group-hover:scale-110 transition-transform">
            <PhoneCall size={24} />
          </div>
          <h2 className="text-lg font-semibold text-gold-800 dark:text-white">Contact Info</h2>
          <p className="text-sm text-gold-500 dark:text-gold-400 mt-2">
            Update phone numbers, email addresses, and physical locations.
          </p>
        </Link>
      </div>
    </div>
  );
}
