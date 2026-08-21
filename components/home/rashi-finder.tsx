"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

interface ZodiacSign {
  name: string;
  hindiName: string;
  rashi: string;
  rashiHindi: string;
  planet: string;
  planetHindi: string;
  primaryGem: string;
  primaryGemHindi: string;
  categorySlug: string;
  benefit: string;
  color: string;
}

const ZODIAC_SIGNS: ZodiacSign[] = [
  {
    name: "Aries",
    hindiName: "Mesh",
    rashi: "Mesh Rashi",
    rashiHindi: "मेष राशि",
    planet: "Mars (Mangal)",
    planetHindi: "मंगल ग्रह",
    primaryGem: "Red Coral",
    primaryGemHindi: "मूंगा",
    categorySlug: "ruby",
    benefit: "Enhances courage, leadership, vital energy, and removes obstacles in career.",
    color: "#c81e4a",
  },
  {
    name: "Taurus",
    hindiName: "Vrishabh",
    rashi: "Vrishabh Rashi",
    rashiHindi: "वृषभ राशि",
    planet: "Venus (Shukra)",
    planetHindi: "शुक्र ग्रह",
    primaryGem: "Diamond / White Sapphire",
    primaryGemHindi: "हीरा / सफ़ेद पुखराज",
    categorySlug: "yellow-sapphire",
    benefit: "Attracts luxury, artistic creativity, marital harmony, and financial prosperity.",
    color: "#eacb5c",
  },
  {
    name: "Gemini",
    hindiName: "Mithun",
    rashi: "Mithun Rashi",
    rashiHindi: "मिथुन राशि",
    planet: "Mercury (Budh)",
    planetHindi: "बुध ग्रह",
    primaryGem: "Emerald",
    primaryGemHindi: "पन्ना",
    categorySlug: "emerald",
    benefit: "Sharpens intellect, business acumen, communication skills, and focus.",
    color: "#10b481",
  },
  {
    name: "Cancer",
    hindiName: "Kark",
    rashi: "Kark Rashi",
    rashiHindi: "कर्क राशि",
    planet: "Moon (Chandra)",
    planetHindi: "चन्द्र ग्रह",
    primaryGem: "Natural Pearl",
    primaryGemHindi: "सच्चा मोती",
    categorySlug: "pearl",
    benefit: "Calms emotions, promotes peace of mind, improves intuition and mental stability.",
    color: "#7e6394",
  },
  {
    name: "Leo",
    hindiName: "Simha",
    rashi: "Simha Rashi",
    rashiHindi: "सिंह राशि",
    planet: "Sun (Surya)",
    planetHindi: "सूर्य ग्रह",
    primaryGem: "Burmese Ruby",
    primaryGemHindi: "माणिक्य (रुबी)",
    categorySlug: "ruby",
    benefit: "Bestows royal authority, self-confidence, fame, and strong immunity.",
    color: "#c81e4a",
  },
  {
    name: "Virgo",
    hindiName: "Kanya",
    rashi: "Kanya Rashi",
    rashiHindi: "कन्या राशि",
    planet: "Mercury (Budh)",
    planetHindi: "बुध ग्रह",
    primaryGem: "Zambian Emerald",
    primaryGemHindi: "पन्ना",
    categorySlug: "emerald",
    benefit: "Enhances analytical power, professional reputation, memory, and health.",
    color: "#10b481",
  },
  {
    name: "Libra",
    hindiName: "Tula",
    rashi: "Tula Rashi",
    rashiHindi: "तुला राशि",
    planet: "Venus (Shukra)",
    planetHindi: "शुक्र ग्रह",
    primaryGem: "Opal / White Sapphire",
    primaryGemHindi: "ओपल / सरेटा",
    categorySlug: "yellow-sapphire",
    benefit: "Brings balance, diplomatic elegance, marital joy, and wealth accumulation.",
    color: "#ddb63a",
  },
  {
    name: "Scorpio",
    hindiName: "Vrishchik",
    rashi: "Vrishchik Rashi",
    rashiHindi: "वृश्चिक राशि",
    planet: "Mars (Mangal)",
    planetHindi: "मंगल ग्रह",
    primaryGem: "Red Coral / Ruby",
    primaryGemHindi: "मूंगा / माणिक",
    categorySlug: "ruby",
    benefit: "Overcomes fear, protects against evil eyes, restores energy and stamina.",
    color: "#c81e4a",
  },
  {
    name: "Sagittarius",
    hindiName: "Dhanu",
    rashi: "Dhanu Rashi",
    rashiHindi: "धनु राशि",
    planet: "Jupiter (Guru)",
    planetHindi: "गुरु देव",
    primaryGem: "Yellow Sapphire (Pukhraj)",
    primaryGemHindi: "पीला पुखराज",
    categorySlug: "yellow-sapphire",
    benefit: "Brings higher wisdom, spiritual grace, auspicious marriage, and immense luck.",
    color: "#c99a26",
  },
  {
    name: "Capricorn",
    hindiName: "Makar",
    rashi: "Makar Rashi",
    rashiHindi: "मकर राशि",
    planet: "Saturn (Shani)",
    planetHindi: "शनि देव",
    primaryGem: "Ceylon Blue Sapphire (Neelam)",
    primaryGemHindi: "नीलम",
    categorySlug: "blue-sapphire",
    benefit: "Instantly accelerates career growth, discipline, protection, and windfall gains.",
    color: "#1f4fd8",
  },
  {
    name: "Aquarius",
    hindiName: "Kumbh",
    rashi: "Kumbh Rashi",
    rashiHindi: "कुंभ राशि",
    planet: "Saturn (Shani)",
    planetHindi: "शनि देव",
    primaryGem: "Blue Sapphire (Neelam)",
    primaryGemHindi: "इन्द्र नीलम",
    categorySlug: "blue-sapphire",
    benefit: "Fulfills desires, stabilizes finances, grants focus and strategic clarity.",
    color: "#1f4fd8",
  },
  {
    name: "Pisces",
    hindiName: "Meen",
    rashi: "Meen Rashi",
    rashiHindi: "मीन राशि",
    planet: "Jupiter (Guru)",
    planetHindi: "गुरु देव",
    primaryGem: "Yellow Sapphire (Pukhraj)",
    primaryGemHindi: "स्वर्ण पुखराज",
    categorySlug: "yellow-sapphire",
    benefit: "Fosters spiritual growth, fortune, happy family life, and academic success.",
    color: "#c99a26",
  },
];

export function RashiFinder() {
  const [selectedSignIndex, setSelectedSignIndex] = useState(8); // Default: Dhanu (Yellow Sapphire)
  const sign = ZODIAC_SIGNS[selectedSignIndex];

  return (
    <section className="bg-plum-950 py-12 text-ivory-100 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Decorative Indian Mandala Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.25) 0%, transparent 60%)",
        }}
      />

      <div className="shell gutter relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <p className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold text-gold-300 uppercase tracking-widest">
            <Sparkles size={14} className="text-gold-400" />
            Vedic Astrology · राशि अनुसार रत्न परामर्श
          </p>
          <h2 className="mt-4 text-2xl sm:text-4xl font-semibold leading-tight">
            Find Your <span className="text-foil">Auspicious Rashi Ratan</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-plum-200">
            Select your Zodiac sign (राशि) to discover the prescribed Vedic gemstone verified by certified Indian gemmologists.
          </p>
        </div>

        {/* Zodiac Selector Grid */}
        <div className="mt-8 overflow-x-auto no-scrollbar pb-2">
          <div className="flex gap-2 sm:grid sm:grid-cols-6 lg:grid-cols-12 min-w-max sm:min-w-0 justify-center">
            {ZODIAC_SIGNS.map((z, idx) => {
              const active = idx === selectedSignIndex;
              return (
                <button
                  key={z.name}
                  onClick={() => setSelectedSignIndex(idx)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                    active
                      ? "border-gold-400 bg-gold-500/20 text-gold-200 shadow-gold scale-105"
                      : "border-plum-800 bg-plum-900/60 text-plum-300 hover:border-gold-500/40 hover:bg-plum-900"
                  }`}
                >
                  <span className="text-xs font-semibold uppercase">{z.name}</span>
                  <span className="text-[0.6875rem] text-gold-400 mt-0.5">{z.hindiName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Sign Gemstone Card */}
        <div className="mt-8 rounded-2xl border border-gold-500/30 bg-plum-900/80 p-6 sm:p-8 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center backdrop-blur-md">
          <div className="lg:col-span-4 flex flex-col items-center text-center lg:items-start lg:text-left">
            <div
              className="size-20 sm:size-24 rounded-2xl flex items-center justify-center shadow-lg border border-white/20 mb-4"
              style={{
                background: `radial-gradient(circle, ${sign.color} 0%, #130b1b 90%)`,
              }}
            >
              <Sparkles size={36} className="text-gold-300 animate-pulse" />
            </div>
            <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
              {sign.rashi} ({sign.rashiHindi}) · {sign.planet}
            </span>
            <h3 className="text-2xl sm:text-3xl font-semibold mt-1 text-ivory-100">
              {sign.primaryGem}
            </h3>
            <p className="text-sm text-gold-300 font-medium mt-0.5">
              {sign.primaryGemHindi}
            </p>
          </div>

          <div className="lg:col-span-8 mt-6 lg:mt-0 border-t lg:border-t-0 lg:border-l border-plum-800 pt-6 lg:pt-0 lg:pl-8">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-400">
              Astrological Benefits & Graha Effect (ज्योतिषीय लाभ)
            </h4>
            <p className="mt-2 text-sm sm:text-base text-plum-200 leading-relaxed">
              {sign.benefit}
            </p>

            <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-xs text-plum-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>100% Certified Unheated & Natural</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Govt Recognized Lab Report (IGI / GIA)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Optional Vedic Pooja & Energization</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Free Express Shipping Across India</span>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={`/collections/${sign.categorySlug}`}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-5 py-2.5 text-sm font-semibold text-plum-950 shadow-gold hover:from-gold-400 hover:to-gold-500 transition-all"
              >
                View {sign.primaryGem} Collection
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-plum-700 bg-plum-950/60 px-4 py-2.5 text-sm font-medium text-plum-200 hover:border-gold-400 hover:text-ivory-100 transition-all"
              >
                Speak to Astrologer / Gemmologist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
