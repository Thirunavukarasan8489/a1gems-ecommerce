import { CheckCircle2 } from "lucide-react";
import { categories as initialCategories } from "@/lib/data/categories";

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ivory-100 font-display">
            Category Management (§25)
          </h1>
          <p className="text-xs text-gold-400 font-semibold uppercase tracking-wider">
            Manage Gemstone Categories, Slugs, & Display Order
          </p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-gold-500 text-xs font-bold text-plum-950 hover:bg-gold-400">
          + New Category
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {initialCategories.map((cat) => (
          <div key={cat.id} className="p-5 rounded-2xl border border-plum-800 bg-plum-900/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="size-5 rounded-full border border-white/20"
                  style={{ backgroundColor: cat.gemColor }}
                />
                <h3 className="font-semibold text-ivory-100 text-sm">{cat.name}</h3>
              </div>
              <span className="text-[0.625rem] font-bold text-gold-400 px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/20">
                Order: #{cat.displayOrder}
              </span>
            </div>
            <p className="mt-2 text-xs text-plum-300 line-clamp-2">{cat.description}</p>
            <div className="mt-4 pt-3 border-t border-plum-800 flex items-center justify-between text-xs text-plum-400">
              <span>Slug: /{cat.slug}</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 size={12} /> Published
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
