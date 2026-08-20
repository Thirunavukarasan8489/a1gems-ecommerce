import { getLeads } from '@/lib/actions/admin-leads';
import LeadsTableClient from '@/components/admin/leads/LeadsTableClient';
import { LeadType } from '@/lib/types';

export default async function LeadsPage() {
  const result = await getLeads();
  const leads: LeadType[] = result.success ? result.data : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Lead Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and track customer enquiries</p>
        </div>
        <button className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-md text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors">
          Add Lead
        </button>
      </div>

      {result.success === false && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md border border-red-200 text-sm">
          Failed to load leads: {result.error}
        </div>
      )}

      <LeadsTableClient title="All Leads" data={leads} />
    </div>
  );
}
