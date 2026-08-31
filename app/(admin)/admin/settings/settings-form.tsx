"use client";

import { useState } from "react";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SettingsForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  
  const [settings, setSettings] = useState(initialData || {
    flatShippingFee: 20000,
    freeShippingThreshold: 2500000,
    currency: "INR"
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flatShippingFee: Number(settings.flatShippingFee),
          freeShippingThreshold: Number(settings.freeShippingThreshold),
          currency: settings.currency,
        }),
      });
      if (!res.ok) throw new Error("Failed to save settings");
      toast.success("Settings updated successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-medium text-plum-900">Commerce Details</h2>
          <div className="space-y-4">
            <AdminInput
              label="Flat Shipping Fee (Paise)"
              type="number"
              value={settings.flatShippingFee}
              onChange={(e) => setSettings({ ...settings, flatShippingFee: e.target.value })}
              placeholder="20000"
            />
            <p className="text-xs text-gray-500 mt-1">₹{Number(settings.flatShippingFee) / 100}</p>
            
            <AdminInput
              label="Free Shipping Threshold (Paise)"
              type="number"
              value={settings.freeShippingThreshold}
              onChange={(e) => setSettings({ ...settings, freeShippingThreshold: e.target.value })}
              placeholder="2500000"
            />
            <p className="text-xs text-gray-500 mt-1">₹{Number(settings.freeShippingThreshold) / 100}</p>

            <AdminInput
              label="Currency"
              value={settings.currency}
              onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
              placeholder="INR"
            />
          </div>
        </section>

        <div className="flex justify-start">
          <AdminButton onClick={handleSave} isLoading={isSaving} size="lg">
            Save Changes
          </AdminButton>
        </div>
      </div>
    </div>
  );
}
