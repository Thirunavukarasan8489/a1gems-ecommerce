import { Building2, User } from "lucide-react";
import { formatINR } from "@/lib/utils";

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ivory-100 font-display">
          Customer Directory (§4 & §12.4)
        </h1>
        <p className="text-xs text-gold-400 font-semibold uppercase tracking-wider">
          Personal Customers vs GST Registered Business Buyers
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="p-5 rounded-2xl border border-gold-500/30 bg-plum-900/60">
          <div className="flex items-center gap-3 border-b border-plum-800 pb-3 mb-3">
            <Building2 className="text-gold-400" size={24} />
            <div>
              <h3 className="font-bold text-ivory-100 text-sm">Sharma Jewellers Pvt Ltd</h3>
              <p className="text-xs text-gold-400 font-mono">GSTIN: 07AAAAA0000A1Z5</p>
            </div>
          </div>
          <p className="text-xs text-plum-300">Contact: Rajesh Sharma (+91 98200 55123)</p>
          <p className="text-xs text-plum-300">Address: Johari Bazaar, Jaipur, RJ - 302003</p>
          <div className="mt-3 pt-2 border-t border-plum-800 flex justify-between text-xs">
            <span className="text-plum-400">Total Spend:</span>
            <span className="font-mono font-bold text-gold-300">{formatINR(33732500)}</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-plum-800 bg-plum-900/60">
          <div className="flex items-center gap-3 border-b border-plum-800 pb-3 mb-3">
            <User className="text-emerald-400" size={24} />
            <div>
              <h3 className="font-bold text-ivory-100 text-sm">Ananya Iyer</h3>
              <p className="text-xs text-plum-400">Personal Customer</p>
            </div>
          </div>
          <p className="text-xs text-plum-300">Contact: +91 98401 22334 (ananya.iyer@example.com)</p>
          <p className="text-xs text-plum-300">Address: Indira Nagar, Bengaluru, KA - 560038</p>
          <div className="mt-3 pt-2 border-t border-plum-800 flex justify-between text-xs">
            <span className="text-plum-400">Total Spend:</span>
            <span className="font-mono font-bold text-gold-300">{formatINR(19467000)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
