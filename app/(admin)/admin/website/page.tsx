"use client";

import { useState } from "react";

export default function AdminWebsitePage() {
  const [sections, setSections] = useState([
    { id: "s1", name: "Announcement Bar", enabled: true },
    { id: "s2", name: "Hero Banner", enabled: true },
    { id: "s3", name: "Trust Highlights", enabled: true },
    { id: "s4", name: "Vedic Rashi Finder", enabled: true },
    { id: "s5", name: "Promotional Banners", enabled: true },
    { id: "s6", name: "Featured Categories", enabled: true },
    { id: "s7", name: "Featured Products", enabled: true },
    { id: "s8", name: "Why Choose A1 Gems", enabled: true },
    { id: "s9", name: "Gemstone Showcase (Collector Vault)", enabled: true },
  ]);

  const toggleSection = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ivory-100 font-display">
            Homepage CMS & Banners (§26 & §27)
          </h1>
          <p className="text-xs text-gold-400 font-semibold uppercase tracking-wider">
            Reorder, Enable/Disable Sections, & Edit Promotional Banners
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-3">
          <h3 className="text-xs font-bold text-gold-400 uppercase tracking-widest">
            Homepage Sections (§26 Flow)
          </h3>
          {sections.map((sec, idx) => (
            <div
              key={sec.id}
              className="p-3.5 rounded-xl border border-plum-800 bg-plum-900/60 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="text-plum-400 font-mono">#{idx + 1}</span>
                <span className="font-semibold text-ivory-100">{sec.name}</span>
              </div>
              <button
                onClick={() => toggleSection(sec.id)}
                className={`px-3 py-1 rounded-lg font-bold text-[0.625rem] cursor-pointer transition-colors ${
                  sec.enabled
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-plum-800 text-plum-400 border border-plum-700"
                }`}
              >
                {sec.enabled ? "ENABLED" : "DISABLED"}
              </button>
            </div>
          ))}
        </div>

        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-bold text-gold-400 uppercase tracking-widest">
            Banner Management (§27)
          </h3>
          <div className="p-4 rounded-2xl border border-plum-800 bg-plum-900/60 space-y-3 text-xs">
            <div className="border-b border-plum-800 pb-2">
              <span className="text-gold-300 font-semibold block">Hero Festive Offer Banner</span>
              <p className="text-plum-400">Desktop + Mobile responsive banners</p>
            </div>
            <div className="border-b border-plum-800 pb-2">
              <span className="text-gold-300 font-semibold block">Jaipur Gem Artisans Banner</span>
              <p className="text-plum-400">Promotional category highlight</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
