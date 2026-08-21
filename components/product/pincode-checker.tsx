"use client";

import { useState } from "react";
import { Truck, CheckCircle, AlertCircle, MapPin } from "lucide-react";

export function PincodeChecker() {
  const [pincode, setPincode] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "serviceable" | "unserviceable">("idle");
  const [resultMsg, setResultMsg] = useState<{ estDays: string; codAvailable: boolean } | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode.trim())) {
      setStatus("unserviceable");
      setResultMsg(null);
      return;
    }

    setStatus("checking");
    setTimeout(() => {
      // Mock Indian postal code lookup
      const isMetropolitan = ["110", "400", "560", "700", "600", "500", "380", "411"].some(prefix =>
        pincode.startsWith(prefix)
      );

      setStatus("serviceable");
      setResultMsg({
        estDays: isMetropolitan ? "2 - 3 Business Days (Express Air)" : "4 - 5 Business Days (Insured Surface)",
        codAvailable: true,
      });
    }, 400);
  };

  return (
    <div className="rounded-xl border border-ivory-300 bg-ivory-50 p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-plum-900">
        <MapPin size={15} className="text-gold-600" />
        <span>Check Delivery & Cash on Delivery (COD)</span>
      </div>

      <form onSubmit={handleCheck} className="mt-2 flex gap-2">
        <input
          type="text"
          maxLength={6}
          placeholder="Enter 6-digit Indian PIN Code"
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
          className="flex-1 rounded-lg border border-plum-200 bg-white px-3 py-1.5 text-sm text-plum-900 placeholder:text-plum-400 focus:border-gold-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "checking"}
          className="rounded-lg bg-plum-900 px-4 py-1.5 text-xs font-semibold text-gold-300 hover:bg-plum-950 transition-colors cursor-pointer"
        >
          {status === "checking" ? "Checking..." : "Check PIN"}
        </button>
      </form>

      {status === "serviceable" && resultMsg && (
        <div className="mt-3 text-xs space-y-1.5 border-t border-ivory-200 pt-2.5">
          <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <CheckCircle size={14} className="shrink-0" />
            <span>Delivery available to PIN {pincode} ({resultMsg.estDays})</span>
          </div>
          <div className="flex items-center gap-1.5 text-plum-700">
            <Truck size={14} className="text-gold-600 shrink-0" />
            <span>Cash on Delivery (COD) & Free Insured Transit available</span>
          </div>
        </div>
      )}

      {status === "unserviceable" && (
        <div className="mt-3 text-xs flex items-center gap-1.5 text-danger-700 border-t border-ivory-200 pt-2">
          <AlertCircle size={14} className="shrink-0" />
          <span>Please enter a valid 6-digit Indian pincode.</span>
        </div>
      )}
    </div>
  );
}
