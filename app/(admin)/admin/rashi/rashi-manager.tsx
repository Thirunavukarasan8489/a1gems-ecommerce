"use client";

import { useState } from "react";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Trash2, Edit2, Plus } from "lucide-react";

export default function RashiManager({ initialData }: { initialData: any[] }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [rashis, setRashis] = useState<any[]>(initialData || []);
  
  const defaultForm = {
    slug: "", devanagari: "", transliteration: "", english: "", 
    symbol: "", dateRange: "", planet: "", planetDevanagari: "", 
    stoneName: "", categorySlug: ""
  };
  const [formData, setFormData] = useState(defaultForm);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleEdit = (rashi: any) => {
    setFormData(rashi);
    setEditingId(rashi._id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this Rashi?")) return;
    try {
      const res = await fetch(`/api/rashi/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Rashi deleted");
      setRashis(rashis.filter(r => r._id !== id));
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const url = editingId ? `/api/rashi/${editingId}` : "/api/rashi";
      const method = editingId ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) throw new Error("Failed to save");
      
      const savedRashi = await res.json();
      
      if (editingId) {
        setRashis(rashis.map(r => r._id === editingId ? savedRashi : r));
      } else {
        setRashis([...rashis, savedRashi]);
      }
      
      toast.success(editingId ? "Rashi updated" : "Rashi created");
      setIsFormOpen(false);
      setFormData(defaultForm);
      setEditingId(null);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {!isFormOpen && (
        <div className="flex justify-end">
          <AdminButton onClick={() => setIsFormOpen(true)}>
            <Plus size={16} className="mr-2" /> Add New Rashi
          </AdminButton>
        </div>
      )}

      {isFormOpen && (
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-medium text-plum-900">
            {editingId ? "Edit Rashi" : "Add New Rashi"}
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AdminInput label="Slug (e.g. mesha)" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} required />
              <AdminInput label="Devanagari (e.g. मेष)" value={formData.devanagari} onChange={(e) => setFormData({...formData, devanagari: e.target.value})} required />
              <AdminInput label="Transliteration (e.g. Mesha)" value={formData.transliteration} onChange={(e) => setFormData({...formData, transliteration: e.target.value})} required />
              <AdminInput label="English (e.g. Aries)" value={formData.english} onChange={(e) => setFormData({...formData, english: e.target.value})} required />
              <AdminInput label="Symbol (e.g. ♈︎)" value={formData.symbol} onChange={(e) => setFormData({...formData, symbol: e.target.value})} required />
              <AdminInput label="Date Range (e.g. Mar 21 - Apr 19)" value={formData.dateRange} onChange={(e) => setFormData({...formData, dateRange: e.target.value})} required />
              <AdminInput label="Planet (e.g. Mars)" value={formData.planet} onChange={(e) => setFormData({...formData, planet: e.target.value})} required />
              <AdminInput label="Planet Devanagari (e.g. मंगल)" value={formData.planetDevanagari} onChange={(e) => setFormData({...formData, planetDevanagari: e.target.value})} required />
              <AdminInput label="Stone Name (e.g. Red Coral)" value={formData.stoneName} onChange={(e) => setFormData({...formData, stoneName: e.target.value})} required />
              <AdminInput label="Category Slug (e.g. red-coral)" value={formData.categorySlug} onChange={(e) => setFormData({...formData, categorySlug: e.target.value})} />
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <AdminButton variant="outline" type="button" onClick={() => { setIsFormOpen(false); setFormData(defaultForm); setEditingId(null); }}>
                Cancel
              </AdminButton>
              <AdminButton type="submit" isLoading={isSaving}>
                {editingId ? "Update Rashi" : "Create Rashi"}
              </AdminButton>
            </div>
          </form>
        </section>
      )}

      <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-plum-900">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-plum-500">
              <tr>
                <th className="px-6 py-4 font-medium">Rashi</th>
                <th className="px-6 py-4 font-medium">English</th>
                <th className="px-6 py-4 font-medium">Planet</th>
                <th className="px-6 py-4 font-medium">Stone</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rashis.map((rashi) => (
                <tr key={rashi._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{rashi.symbol}</span>
                      <div>
                        <div className="font-semibold">{rashi.transliteration}</div>
                        <div className="text-xs text-gray-500">{rashi.devanagari}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {rashi.english}
                    <div className="text-xs text-gray-500">{rashi.dateRange}</div>
                  </td>
                  <td className="px-6 py-4">
                    {rashi.planet}
                    <div className="text-xs text-gray-500">{rashi.planetDevanagari}</div>
                  </td>
                  <td className="px-6 py-4">
                    {rashi.stoneName}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleEdit(rashi)} className="p-2 text-plum-400 hover:text-plum-600 hover:bg-plum-50 rounded-md transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(rashi._id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {rashis.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No Rashi entries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
