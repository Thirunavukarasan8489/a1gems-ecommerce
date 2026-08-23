export default function WebsiteCMSPage() {
  const sections = [
    { id: '1', type: 'HERO', enabled: true, order: 1 },
    { id: '2', type: 'TRUST_HIGHLIGHTS', enabled: true, order: 2 },
    { id: '3', type: 'FEATURED_CATEGORIES', enabled: true, order: 3 },
    { id: '4', type: 'PROMO_BANNER', enabled: false, order: 4 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Homepage CMS</h1>
        <button className="px-4 py-2 bg-slate-900 text-white rounded-md text-sm">Save Changes</button>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b">Announcement Bar</h2>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm font-medium text-slate-700">Enabled</span>
          </label>
          <input type="text" defaultValue="Free Shipping on all orders above ₹10,000" className="flex-1 border border-slate-300 rounded-md p-2 text-sm" />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b">Section Ordering</h2>
        <div className="space-y-3">
          {sections.map(section => (
            <div key={section.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-md bg-slate-50">
              <div className="flex items-center space-x-4">
                <span className="text-slate-400 cursor-move">⋮⋮</span>
                <span className="font-medium text-slate-700">{section.type.replace(/_/g, ' ')}</span>
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked={section.enabled} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-slate-600">Enabled</span>
                </label>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit Config</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
