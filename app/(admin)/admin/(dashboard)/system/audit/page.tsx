export default function SystemAuditPage() {
  const logs = [
    { id: 'LOG-1', action: 'ORDER_CANCELLED', user: 'Admin User', entity: 'Order', entityId: 'ORD-991', date: '2026-08-20 14:30' },
    { id: 'LOG-2', action: 'PRODUCT_UPDATED', user: 'Content Manager', entity: 'Product', entityId: 'PRD-102', date: '2026-08-20 12:15' },
    { id: 'LOG-3', action: 'SETTINGS_CHANGED', user: 'Super Admin', entity: 'Settings', entityId: 'N/A', date: '2026-08-19 09:00' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">System Audit Logs</h1>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
            <tr>
              <th className="px-6 py-3 font-medium">Log ID</th>
              <th className="px-6 py-3 font-medium">Action</th>
              <th className="px-6 py-3 font-medium">Performed By</th>
              <th className="px-6 py-3 font-medium">Entity</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {logs.map(log => (
              <tr key={log.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{log.id}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-semibold">
                    {log.action}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600">{log.user}</td>
                <td className="px-6 py-4 text-slate-600">{log.entity} ({log.entityId})</td>
                <td className="px-6 py-4 text-slate-500">{log.date}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">View Diff</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
