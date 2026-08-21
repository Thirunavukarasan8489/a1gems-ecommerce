import { products } from "@/lib/data/products";
import { availableQuantity } from "@/lib/types";

export default function AdminInventoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ivory-100 font-display">
          Inventory & Reservation System (§13 & §13.1)
        </h1>
        <p className="text-xs text-gold-400 font-semibold uppercase tracking-wider font-mono">
          Available Stock Formula: available = stockQuantity - reservedQuantity
        </p>
      </div>

      <div className="rounded-2xl border border-plum-800 bg-plum-900/60 overflow-hidden">
        <table className="w-full text-left text-xs text-plum-200">
          <thead className="bg-plum-950/80 text-gold-400 uppercase tracking-widest font-semibold border-b border-plum-800">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">SKU</th>
              <th className="p-3">Total Stock</th>
              <th className="p-3">Reserved (Pending Order)</th>
              <th className="p-3">Available Quantity</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-plum-800">
            {products.map((p) => {
              const avail = availableQuantity(p);
              return (
                <tr key={p.id} className="hover:bg-plum-900/80 transition-colors">
                  <td className="p-3 font-semibold text-ivory-100">{p.name}</td>
                  <td className="p-3 font-mono text-gold-300">{p.sku}</td>
                  <td className="p-3 font-mono">{p.stockQuantity}</td>
                  <td className="p-3 font-mono text-warning-400">{p.reservedQuantity}</td>
                  <td className="p-3 font-mono font-bold text-emerald-400">{avail}</td>
                  <td className="p-3">
                    {avail > 0 ? (
                      <span className="px-2 py-0.5 rounded text-[0.625rem] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        IN STOCK
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[0.625rem] font-bold bg-danger-500/20 text-danger-300 border border-danger-500/30">
                        OUT OF STOCK
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
