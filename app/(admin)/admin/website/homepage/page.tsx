import { getHomepageSections } from '@/lib/actions/cms.actions';
import HomepageSectionsTable from '@/components/admin/website/HomepageSectionsTable';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HomepageCMSPage() {
  const result = await getHomepageSections();
  const sections = result.success && Array.isArray(result.data) ? result.data : [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gold-800 dark:text-white">Homepage Configuration</h1>
          <p className="text-sm text-gold-500 dark:text-gold-400 mt-1">
            Manage the content sections on the public homepage
          </p>
        </div>
        <Link
          href="/admin/website/homepage/create"
          className="inline-flex items-center gap-2 bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          Add Section
        </Link>
      </div>

      {!result.success && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-sm text-red-700 dark:text-red-400">
            Failed to load homepage sections: {(result as any).error}
          </p>
        </div>
      )}

      <HomepageSectionsTable sections={sections} />
    </div>
  );
}
