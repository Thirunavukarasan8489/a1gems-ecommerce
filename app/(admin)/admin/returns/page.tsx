export default function AdminReturnsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ivory-100 font-display">
          Return Management (§19)
        </h1>
        <p className="text-xs text-gold-400 font-semibold uppercase tracking-wider">
          7-Day Return Requests & Gemstone Inspection Workflow
        </p>
      </div>

      <div className="rounded-2xl border border-plum-800 bg-plum-900/60 p-6 text-xs text-plum-300">
        <p className="text-ivory-100 font-medium">No active pending return requests.</p>
        <p className="mt-1">All delivered gemstones are within their 7-day guarantee period.</p>
      </div>
    </div>
  );
}
