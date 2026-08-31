"use client";

import { useState } from "react";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Trash2, Plus } from "lucide-react";

export default function NavForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  
  const [business, setBusiness] = useState(initialData?.business || {
    phone: "", phoneHref: "", whatsapp: "", email: "", address: "", hours: ""
  });
  const [primaryNav, setPrimaryNav] = useState<any[]>(initialData?.primaryNav || []);
  const [secondaryNav, setSecondaryNav] = useState<any[]>(initialData?.secondaryNav || []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/nav", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ primaryNav, secondaryNav, business }),
      });
      if (!res.ok) throw new Error("Failed to save navigation config");
      toast.success("Navigation settings updated successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving");
    } finally {
      setIsSaving(false);
    }
  };

  const updateNavItem = (list: any[], setList: any, index: number, field: string, value: string) => {
    const updated = [...list];
    updated[index] = { ...updated[index], [field]: value };
    setList(updated);
  };

  const removeNavItem = (list: any[], setList: any, index: number) => {
    setList(list.filter((_, i) => i !== index));
  };

  const addNavItem = (setList: any) => {
    setList((prev: any[]) => [...prev, { label: "", href: "" }]);
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-medium text-plum-900">Primary Navigation</h2>
          <div className="space-y-4">
            {primaryNav.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <AdminInput
                  placeholder="Label (e.g. Collections)"
                  value={item.label}
                  onChange={(e) => updateNavItem(primaryNav, setPrimaryNav, index, "label", e.target.value)}
                />
                <AdminInput
                  placeholder="Href (e.g. /collections)"
                  value={item.href}
                  onChange={(e) => updateNavItem(primaryNav, setPrimaryNav, index, "href", e.target.value)}
                />
                <button type="button" onClick={() => removeNavItem(primaryNav, setPrimaryNav, index)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            <AdminButton variant="outline" type="button" onClick={() => addNavItem(setPrimaryNav)} className="w-full">
              <Plus size={16} className="mr-2" /> Add Primary Link
            </AdminButton>
          </div>
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-medium text-plum-900">Secondary Navigation (Footer)</h2>
          <div className="space-y-4">
            {secondaryNav.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <AdminInput
                  placeholder="Label (e.g. FAQs)"
                  value={item.label}
                  onChange={(e) => updateNavItem(secondaryNav, setSecondaryNav, index, "label", e.target.value)}
                />
                <AdminInput
                  placeholder="Href (e.g. /faqs)"
                  value={item.href}
                  onChange={(e) => updateNavItem(secondaryNav, setSecondaryNav, index, "href", e.target.value)}
                />
                <button type="button" onClick={() => removeNavItem(secondaryNav, setSecondaryNav, index)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            <AdminButton variant="outline" type="button" onClick={() => addNavItem(setSecondaryNav)} className="w-full">
              <Plus size={16} className="mr-2" /> Add Secondary Link
            </AdminButton>
          </div>
        </section>
      </div>

      <div className="space-y-6">
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-medium text-plum-900">Business Details</h2>
          <div className="space-y-4">
            <AdminInput
              label="Phone Number (Display)"
              value={business.phone}
              onChange={(e) => setBusiness({ ...business, phone: e.target.value })}
              placeholder="+91 98400 12345"
            />
            <AdminInput
              label="Phone Link (tel:)"
              value={business.phoneHref}
              onChange={(e) => setBusiness({ ...business, phoneHref: e.target.value })}
              placeholder="tel:+919840012345"
            />
            <AdminInput
              label="WhatsApp Number (wa.me)"
              value={business.whatsapp}
              onChange={(e) => setBusiness({ ...business, whatsapp: e.target.value })}
              placeholder="919840012345"
            />
            <AdminInput
              label="Email Address"
              value={business.email}
              onChange={(e) => setBusiness({ ...business, email: e.target.value })}
              placeholder="hello@a1gems.in"
            />
            <AdminInput
              label="Physical Address"
              value={business.address}
              onChange={(e) => setBusiness({ ...business, address: e.target.value })}
              placeholder="12, Radha Krishnan Salai..."
            />
            <AdminInput
              label="Working Hours"
              value={business.hours}
              onChange={(e) => setBusiness({ ...business, hours: e.target.value })}
              placeholder="Mon–Sat, 10:00 – 19:00 IST"
            />
          </div>
        </section>

        <div className="flex justify-end">
          <AdminButton onClick={handleSave} isLoading={isSaving} size="lg">
            Save Changes
          </AdminButton>
        </div>
      </div>
    </div>
  );
}
