"use client";

import { useState } from "react";
import { Plus, Search, Edit2, X } from "lucide-react";
import { products as initialProducts } from "@/lib/data/products";
import type { Product, PurchaseType } from "@/lib/types";
import { formatINR } from "@/lib/utils";

export default function AdminProductsPage() {
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State (§24)
  const [name, setName] = useState("");
  const [categorySlug, setCategorySlug] = useState("ruby");
  const [sellingPrice, setSellingPrice] = useState("");
  const [sku, setSku] = useState("");
  const [stockQuantity] = useState("1");
  const [purchaseType, setPurchaseType] = useState<PurchaseType>("BUY_AND_ENQUIRE");
  const [stone] = useState("");
  const [weight, setWeight] = useState("");
  const [origin, setOrigin] = useState("");
  const [certification, setCertification] = useState("");

  const filteredProducts = productList.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newPrd: Product = {
      id: `prd_${Date.now()}`,
      name: name || "New Gemstone Piece",
      slug: (name || "new-gem").toLowerCase().replace(/\s+/g, "-"),
      categorySlug,
      shortDescription: `Natural lab certified ${stone || "Gemstone"} from ${origin || "Jaipur"}.`,
      description: "High clarity natural gemstone piece.",
      sellingPrice: parseFloat(sellingPrice || "100000") * 100, // INR to paise
      sku: sku || `AG-GEM-${Math.floor(Math.random() * 9000 + 1000)}`,
      stockQuantity: parseInt(stockQuantity || "1"),
      reservedQuantity: 0,
      lowStockThreshold: 1,
      purchaseType,
      enquiryEnabled: true,
      whatsappEnabled: true,
      specifications: {
        material: "Natural Gemstone",
        stone: stone || "Ruby",
        weight: weight || "3.5 ct",
        origin: origin || "Jaipur, India",
        certification: certification || "IGI Certified",
      },
      gemColor: "#c81e4a",
      gallery: 3,
      featured: true,
      bestseller: false,
      rating: 5,
      reviewCount: 0,
      published: true,
    };

    setProductList([newPrd, ...productList]);
    setShowAddModal(false);
    setName("");
    setSellingPrice("");
    setSku("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ivory-100 font-display">
            Catalogue & Product Management (§23 & §24)
          </h1>
          <p className="text-xs text-gold-400 font-semibold uppercase tracking-wider">
            Manage Gemstone Inventory, Specifications & Purchase Modes
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-4 py-2 text-xs font-bold text-plum-950 hover:bg-gold-400 transition-all cursor-pointer"
        >
          <Plus size={16} />
          Add New Product
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-2.5 size-4 text-plum-400" />
        <input
          type="text"
          placeholder="Search products by title, SKU..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-plum-700 bg-plum-900/60 pl-9 pr-3 py-1.5 text-xs text-ivory-100 placeholder:text-plum-400 focus:border-gold-400 focus:outline-none"
        />
      </div>

      {/* Products Table */}
      <div className="rounded-2xl border border-plum-800 bg-plum-900/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-plum-200">
            <thead className="bg-plum-950/80 text-gold-400 uppercase tracking-widest font-semibold border-b border-plum-800">
              <tr>
                <th className="p-3">Product Name</th>
                <th className="p-3">SKU</th>
                <th className="p-3">Price</th>
                <th className="p-3">Purchase Mode (§9)</th>
                <th className="p-3">Stock (§13)</th>
                <th className="p-3">Origin & Certificate</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-plum-800">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-plum-900/80 transition-colors">
                  <td className="p-3 font-semibold text-ivory-100 flex items-center gap-2">
                    <div
                      className="size-4 rounded-full shrink-0 border border-white/20"
                      style={{ backgroundColor: p.gemColor }}
                    />
                    <span>{p.name}</span>
                  </td>
                  <td className="p-3 font-mono text-gold-300">{p.sku}</td>
                  <td className="p-3 font-mono text-ivory-100 font-semibold">
                    {formatINR(p.sellingPrice)}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[0.625rem] font-bold bg-gold-500/20 text-gold-300 border border-gold-500/30">
                      {p.purchaseType}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="font-mono text-emerald-400 font-bold">
                      {p.stockQuantity} Available
                    </span>
                  </td>
                  <td className="p-3">
                    <p className="text-plum-300">{p.specifications.origin}</p>
                    <p className="text-[0.625rem] text-gold-400">{p.specifications.certification}</p>
                  </td>
                  <td className="p-3 text-right">
                    <button className="p-1 text-plum-400 hover:text-gold-300 transition-colors">
                      <Edit2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal (§24 Admin Fields) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-plum-900 border border-gold-500/40 rounded-2xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-plum-800 pb-3">
              <h3 className="text-lg font-bold text-ivory-100">
                Add Product (§24 Fields)
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-plum-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-plum-300 font-semibold mb-1 uppercase">Product Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ceylon Blue Sapphire 4.5 Carat"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-plum-700 bg-plum-950 p-2 text-ivory-100"
                  />
                </div>
                <div>
                  <label className="block text-plum-300 font-semibold mb-1 uppercase">Category</label>
                  <select
                    value={categorySlug}
                    onChange={(e) => setCategorySlug(e.target.value)}
                    className="w-full rounded-xl border border-plum-700 bg-plum-950 p-2 text-ivory-100"
                  >
                    <option value="ruby">Ruby (Manik)</option>
                    <option value="blue-sapphire">Blue Sapphire (Neelam)</option>
                    <option value="yellow-sapphire">Yellow Sapphire (Pukhraj)</option>
                    <option value="emerald">Emerald (Panna)</option>
                    <option value="bracelets">Gemstone Bracelets</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-plum-300 font-semibold mb-1 uppercase">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 150000"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                    className="w-full rounded-xl border border-plum-700 bg-plum-950 p-2 text-ivory-100"
                  />
                </div>
                <div>
                  <label className="block text-plum-300 font-semibold mb-1 uppercase">SKU</label>
                  <input
                    type="text"
                    placeholder="AG-BSP-4501"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full rounded-xl border border-plum-700 bg-plum-950 p-2 text-ivory-100"
                  />
                </div>
                <div>
                  <label className="block text-plum-300 font-semibold mb-1 uppercase">Purchase Mode (§9)</label>
                  <select
                    value={purchaseType}
                    onChange={(e) => setPurchaseType(e.target.value as PurchaseType)}
                    className="w-full rounded-xl border border-plum-700 bg-plum-950 p-2 text-ivory-100"
                  >
                    <option value="BUY_ONLY">BUY_ONLY</option>
                    <option value="ENQUIRY_ONLY">ENQUIRY_ONLY</option>
                    <option value="BUY_AND_ENQUIRE">BUY_AND_ENQUIRE</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 border-t border-plum-800 pt-3">
                <div>
                  <label className="block text-plum-300 font-semibold mb-1 uppercase">Weight (Carats / Ratti)</label>
                  <input
                    type="text"
                    placeholder="e.g. 4.5 ct (4.95 Ratti)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full rounded-xl border border-plum-700 bg-plum-950 p-2 text-ivory-100"
                  />
                </div>
                <div>
                  <label className="block text-plum-300 font-semibold mb-1 uppercase">Origin</label>
                  <input
                    type="text"
                    placeholder="e.g. Ratnapura, Sri Lanka"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full rounded-xl border border-plum-700 bg-plum-950 p-2 text-ivory-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-plum-300 font-semibold mb-1 uppercase">Lab Certificate Details</label>
                <input
                  type="text"
                  placeholder="e.g. IGI — Certified Natural & Unheated"
                  value={certification}
                  onChange={(e) => setCertification(e.target.value)}
                  className="w-full rounded-xl border border-plum-700 bg-plum-950 p-2 text-ivory-100"
                />
              </div>

              <div className="flex justify-end gap-2 border-t border-plum-800 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-plum-800 text-plum-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gold-500 font-bold text-plum-950 hover:bg-gold-400"
                >
                  Save & Publish Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
