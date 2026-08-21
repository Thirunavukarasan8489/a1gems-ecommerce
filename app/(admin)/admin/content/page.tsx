"use client";

import { FileText, BookOpen, HelpCircle, Star } from "lucide-react";

export default function AdminContentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ivory-100 font-display">
          Content Management (§28)
        </h1>
        <p className="text-xs text-gold-400 font-semibold uppercase tracking-wider">
          Manage About Page, Gemstone Guides, FAQs, & Customer Testimonials
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { name: "Gemstone Guides", count: "8 Articles", icon: BookOpen, href: "/guides" },
          { name: "Frequently Asked Questions", count: "12 FAQs", icon: HelpCircle, href: "/faqs" },
          { name: "Customer Testimonials", count: "24 Reviews", icon: Star, href: "/testimonials" },
          { name: "About & Heritage Page", count: "3 Sections", icon: FileText, href: "/about" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.name} className="p-5 rounded-2xl border border-plum-800 bg-plum-900/60">
              <div className="size-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mb-3">
                <Icon size={20} />
              </div>
              <h3 className="font-semibold text-ivory-100 text-sm">{item.name}</h3>
              <p className="text-xs text-plum-400 mt-1">{item.count}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
