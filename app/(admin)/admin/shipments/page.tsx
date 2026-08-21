import { Truck } from "lucide-react";

export default function AdminShipmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ivory-100 font-display">
          Shipment Management (§16)
        </h1>
        <p className="text-xs text-gold-400 font-semibold uppercase tracking-wider">
          Insured Courier Partners & Dispatch Tracking
        </p>
      </div>

      <div className="rounded-2xl border border-plum-800 bg-plum-900/60 overflow-hidden text-xs">
        <table className="w-full text-left text-plum-200">
          <thead className="bg-plum-950/80 text-gold-400 uppercase tracking-widest font-semibold border-b border-plum-800">
            <tr>
              <th className="p-3">Shipment ID</th>
              <th className="p-3">Order ID</th>
              <th className="p-3">Courier Partner</th>
              <th className="p-3">Tracking / AWB Number</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-plum-800">
            <tr className="hover:bg-plum-900/80">
              <td className="p-3 font-mono font-bold text-gold-300">SHP-8801</td>
              <td className="p-3 font-mono">AG-ORD-98213</td>
              <td className="p-3">BlueDart Express (Insured Air)</td>
              <td className="p-3 font-mono text-ivory-100">BLRD-994120</td>
              <td className="p-3 text-emerald-400 font-semibold flex items-center gap-1">
                <Truck size={14} /> SHIPPED (In Transit)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
