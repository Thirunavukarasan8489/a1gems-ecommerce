"use client";

import { useState } from "react";
import { Truck, Percent, Building2, Save } from "lucide-react";

export default function AdminSettingsPage() {
  const [shippingFee, setShippingFee] = useState("200");
  const [freeThreshold, setFreeThreshold] = useState("25000");
  const [gstRate, setGstRate] = useState("3");
  const [businessName, setBusinessName] = useState("A1 Gems & Minerals Pvt Ltd");
  const [gstin, setGstin] = useState("08AAAAA0000A1Z5");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-ivory-100 font-display">
          Admin System Settings (§8, §12.6, §12.7)
        </h1>
        <p className="text-xs text-gold-400 font-semibold uppercase tracking-wider">
          Configure Fixed Shipping Fee, GST Tax Rates, & Business Legal Details
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Shipping Configuration (§12.6) */}
        <div className="p-6 rounded-2xl border border-plum-800 bg-plum-900/60 space-y-4">
          <div className="flex items-center gap-2 text-gold-400 font-bold uppercase tracking-wider text-sm">
            <Truck size={18} />
            <span>Shipping & Freight Config (§12.6)</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-plum-300 font-semibold mb-1">
                Fixed Shipping Fee (₹)
              </label>
              <input
                type="number"
                value={shippingFee}
                onChange={(e) => setShippingFee(e.target.value)}
                className="w-full rounded-xl border border-plum-700 bg-plum-950 p-2.5 text-ivory-100 font-mono text-sm"
              />
              <p className="text-[0.6875rem] text-plum-400 mt-1">
                Currently fixed-price fee per order.
              </p>
            </div>

            <div>
              <label className="block text-plum-300 font-semibold mb-1">
                Free Shipping Threshold (₹)
              </label>
              <input
                type="number"
                value={freeThreshold}
                onChange={(e) => setFreeThreshold(e.target.value)}
                className="w-full rounded-xl border border-plum-700 bg-plum-950 p-2.5 text-ivory-100 font-mono text-sm"
              />
              <p className="text-[0.6875rem] text-plum-400 mt-1">
                Orders above this amount qualify for Free Shipping.
              </p>
            </div>
          </div>
        </div>

        {/* GST / Tax Configuration (§12.7) */}
        <div className="p-6 rounded-2xl border border-plum-800 bg-plum-900/60 space-y-4">
          <div className="flex items-center gap-2 text-gold-400 font-bold uppercase tracking-wider text-sm">
            <Percent size={18} />
            <span>GST & Tax Treatment (§12.7)</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-plum-300 font-semibold mb-1">
                Gemstone GST Rate (%)
              </label>
              <input
                type="number"
                value={gstRate}
                onChange={(e) => setGstRate(e.target.value)}
                className="w-full rounded-xl border border-plum-700 bg-plum-950 p-2.5 text-ivory-100 font-mono text-sm"
              />
              <p className="text-[0.6875rem] text-plum-400 mt-1">
                Standard Indian GST rate on cut & polished precious stones (3%).
              </p>
            </div>

            <div>
              <label className="block text-plum-300 font-semibold mb-1">
                Company Legal GSTIN
              </label>
              <input
                type="text"
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                className="w-full rounded-xl border border-plum-700 bg-plum-950 p-2.5 text-ivory-100 font-mono text-sm"
              />
            </div>
          </div>
        </div>

        {/* Business Entity */}
        <div className="p-6 rounded-2xl border border-plum-800 bg-plum-900/60 space-y-4">
          <div className="flex items-center gap-2 text-gold-400 font-bold uppercase tracking-wider text-sm">
            <Building2 size={18} />
            <span>Business Entity Details</span>
          </div>

          <div>
            <label className="block text-plum-300 font-semibold mb-1">
              Legal Business Name
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full rounded-xl border border-plum-700 bg-plum-950 p-2.5 text-ivory-100 text-sm"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          {saved && (
            <span className="text-xs font-semibold text-emerald-400">
              ✓ Settings saved successfully!
            </span>
          )}
          <button
            type="submit"
            className="ml-auto inline-flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-2.5 text-xs font-bold text-plum-950 hover:bg-gold-400 transition-all cursor-pointer shadow-gold"
          >
            <Save size={16} />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
