export default function AdminRefundsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ivory-100 font-display">
          Refund Management (§20)
        </h1>
        <p className="text-xs text-gold-400 font-semibold uppercase tracking-wider">
          Prepaid Orders Refund & Payment Provider Ledger
        </p>
      </div>

      <div className="rounded-2xl border border-plum-800 bg-plum-900/60 p-6 text-xs text-plum-300">
        <p className="text-ivory-100 font-medium">0 Refunds Processing.</p>
        <p className="mt-1">All processed transactions are settled cleanly.</p>
      </div>
    </div>
  );
}
