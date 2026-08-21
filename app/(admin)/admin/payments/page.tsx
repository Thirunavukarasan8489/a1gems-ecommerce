"use client";

import { CheckCircle2, AlertCircle } from "lucide-react";
import { formatINR } from "@/lib/utils";

export default function AdminPaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ivory-100 font-display">
          Payments & Bank Transfer Verification (§14 & §14.2)
        </h1>
        <p className="text-xs text-gold-400 font-semibold uppercase tracking-wider">
          Supported: UPI, Cards, Net Banking, COD, Bank Transfer
        </p>
      </div>

      <div className="rounded-2xl border border-plum-800 bg-plum-900/60 overflow-hidden text-xs">
        <table className="w-full text-left text-plum-200">
          <thead className="bg-plum-950/80 text-gold-400 uppercase tracking-widest font-semibold border-b border-plum-800">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Method</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Payment Status</th>
              <th className="p-3 text-right">Verification Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-plum-800">
            <tr className="hover:bg-plum-900/80">
              <td className="p-3 font-mono font-bold text-gold-300">AG-ORD-98214</td>
              <td className="p-3 text-ivory-100 font-medium">Rajesh Sharma</td>
              <td className="p-3">UPI (PhonePe)</td>
              <td className="p-3 font-mono font-bold text-ivory-100">{formatINR(33732500)}</td>
              <td className="p-3 text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 size={14} /> VERIFIED
              </td>
              <td className="p-3 text-right">
                <span className="text-plum-400">Webhook Instant Confirmed</span>
              </td>
            </tr>
            <tr className="hover:bg-plum-900/80">
              <td className="p-3 font-mono font-bold text-gold-300">AG-ORD-98211</td>
              <td className="p-3 text-ivory-100 font-medium">Vikramaditya Singh</td>
              <td className="p-3 text-gold-400 font-semibold">Bank Transfer (NEFT/RTGS)</td>
              <td className="p-3 font-mono font-bold text-ivory-100">{formatINR(24500000)}</td>
              <td className="p-3 text-warning-400 font-semibold flex items-center gap-1">
                <AlertCircle size={14} /> PENDING ADMIN VERIFICATION (§14.2)
              </td>
              <td className="p-3 text-right">
                <button className="px-3 py-1 rounded bg-gold-500 text-plum-950 font-bold hover:bg-gold-400">
                  Verify Receipt
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
