export default function ReturnsPage() {
  const returns = [
    { id: 'RET-1001', order: 'ORD-9921', customer: 'Rahul Sharma', reason: 'Size too small', status: 'PENDING', date: '2026-08-20' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Returns Management</h1>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
            <tr>
              <th className="px-6 py-3 font-medium">Return ID</th>
              <th className="px-6 py-3 font-medium">Order</th>
              <th className="px-6 py-3 font-medium">Customer</th>
              <th className="px-6 py-3 font-medium">Reason</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {returns.map(ret => (
              <tr key={ret.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{ret.id}</td>
                <td className="px-6 py-4 text-slate-600">{ret.order}</td>
                <td className="px-6 py-4 text-slate-600">{ret.customer}</td>
                <td className="px-6 py-4 text-slate-600">{ret.reason}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    ret.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {ret.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500">{ret.date}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
