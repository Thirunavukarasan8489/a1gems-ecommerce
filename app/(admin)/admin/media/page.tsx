import { Image as ImageIcon, Upload } from "lucide-react";

export default function AdminMediaPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ivory-100 font-display">
            Media Library (§29)
          </h1>
          <p className="text-xs text-gold-400 font-semibold uppercase tracking-wider">
            Cloudinary Integration & Gemstone Image Metadata Storage
          </p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-gold-500 text-xs font-bold text-plum-950 hover:bg-gold-400 flex items-center gap-2">
          <Upload size={16} /> Upload Image
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {[
          { name: "Ruby_Mogok_GRS.jpg", color: "#c81e4a", cat: "Products" },
          { name: "Sapphire_Ceylon_IGI.jpg", color: "#1f4fd8", cat: "Products" },
          { name: "Emerald_Zambia_GRS.jpg", color: "#10b481", cat: "Products" },
          { name: "YellowSapphire_SriLanka.jpg", color: "#eacb5c", cat: "Products" },
          { name: "Jaipur_Workshop_Banner.jpg", color: "#7e6394", cat: "Banners" },
          { name: "Lab_Certificate_Sample.jpg", color: "#ddb63a", cat: "General" },
        ].map((img) => (
          <div key={img.name} className="rounded-2xl border border-plum-800 bg-plum-900/60 overflow-hidden">
            <div
              className="h-28 w-full flex items-center justify-center text-white"
              style={{ backgroundColor: img.color }}
            >
              <ImageIcon size={32} className="opacity-60" />
            </div>
            <div className="p-3 text-[0.6875rem]">
              <p className="font-semibold text-ivory-100 truncate">{img.name}</p>
              <span className="text-[0.625rem] text-gold-400 block">{img.cat}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
