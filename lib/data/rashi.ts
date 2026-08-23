/**
 * Vedic astrology's standard rashi (moon sign) → ratna (gemstone) mapping —
 * the reason gemstone e-commerce exists as a category in India distinct from
 * "jewellery". This is the widely-taught mainstream mapping, shown with the
 * usual advisory disclaimer real gemstone sellers carry.
 */
export interface Rashi {
  slug: string;
  devanagari: string;
  transliteration: string;
  english: string;
  symbol: string;
  dateRange: string;
  planet: string;
  planetDevanagari: string;
  stoneName: string;
  /** null when the recommended stone (diamond) isn't in this catalogue. */
  categorySlug: string | null;
}

export const rashiList: Rashi[] = [
  {
    slug: "mesh",
    devanagari: "मेष",
    transliteration: "Mesh",
    english: "Aries",
    symbol: "♈",
    dateRange: "21 Mar – 19 Apr",
    planet: "Mars",
    planetDevanagari: "मंगल",
    stoneName: "Red Coral (Moonga)",
    categorySlug: "coral",
  },
  {
    slug: "vrishabh",
    devanagari: "वृषभ",
    transliteration: "Vrishabh",
    english: "Taurus",
    symbol: "♉",
    dateRange: "20 Apr – 20 May",
    planet: "Venus",
    planetDevanagari: "शुक्र",
    stoneName: "Diamond / White Sapphire",
    categorySlug: null,
  },
  {
    slug: "mithun",
    devanagari: "मिथुन",
    transliteration: "Mithun",
    english: "Gemini",
    symbol: "♊",
    dateRange: "21 May – 20 Jun",
    planet: "Mercury",
    planetDevanagari: "बुध",
    stoneName: "Emerald (Panna)",
    categorySlug: "emerald",
  },
  {
    slug: "kark",
    devanagari: "कर्क",
    transliteration: "Kark",
    english: "Cancer",
    symbol: "♋",
    dateRange: "21 Jun – 22 Jul",
    planet: "Moon",
    planetDevanagari: "चंद्र",
    stoneName: "Pearl (Moti)",
    categorySlug: "pearl",
  },
  {
    slug: "simha",
    devanagari: "सिंह",
    transliteration: "Simha",
    english: "Leo",
    symbol: "♌",
    dateRange: "23 Jul – 22 Aug",
    planet: "Sun",
    planetDevanagari: "सूर्य",
    stoneName: "Ruby (Manik)",
    categorySlug: "ruby",
  },
  {
    slug: "kanya",
    devanagari: "कन्या",
    transliteration: "Kanya",
    english: "Virgo",
    symbol: "♍",
    dateRange: "23 Aug – 22 Sep",
    planet: "Mercury",
    planetDevanagari: "बुध",
    stoneName: "Emerald (Panna)",
    categorySlug: "emerald",
  },
  {
    slug: "tula",
    devanagari: "तुला",
    transliteration: "Tula",
    english: "Libra",
    symbol: "♎",
    dateRange: "23 Sep – 22 Oct",
    planet: "Venus",
    planetDevanagari: "शुक्र",
    stoneName: "Diamond / White Sapphire",
    categorySlug: null,
  },
  {
    slug: "vrishchik",
    devanagari: "वृश्चिक",
    transliteration: "Vrishchik",
    english: "Scorpio",
    symbol: "♏",
    dateRange: "23 Oct – 21 Nov",
    planet: "Mars",
    planetDevanagari: "मंगल",
    stoneName: "Red Coral (Moonga)",
    categorySlug: "coral",
  },
  {
    slug: "dhanu",
    devanagari: "धनु",
    transliteration: "Dhanu",
    english: "Sagittarius",
    symbol: "♐",
    dateRange: "22 Nov – 21 Dec",
    planet: "Jupiter",
    planetDevanagari: "गुरु",
    stoneName: "Yellow Sapphire (Pukhraj)",
    categorySlug: "yellow-sapphire",
  },
  {
    slug: "makar",
    devanagari: "मकर",
    transliteration: "Makar",
    english: "Capricorn",
    symbol: "♑",
    dateRange: "22 Dec – 19 Jan",
    planet: "Saturn",
    planetDevanagari: "शनि",
    stoneName: "Blue Sapphire (Neelam)",
    categorySlug: "blue-sapphire",
  },
  {
    slug: "kumbh",
    devanagari: "कुम्भ",
    transliteration: "Kumbh",
    english: "Aquarius",
    symbol: "♒",
    dateRange: "20 Jan – 18 Feb",
    planet: "Saturn",
    planetDevanagari: "शनि",
    stoneName: "Blue Sapphire (Neelam)",
    categorySlug: "blue-sapphire",
  },
  {
    slug: "meen",
    devanagari: "मीन",
    transliteration: "Meen",
    english: "Pisces",
    symbol: "♓",
    dateRange: "19 Feb – 20 Mar",
    planet: "Jupiter",
    planetDevanagari: "गुरु",
    stoneName: "Yellow Sapphire (Pukhraj)",
    categorySlug: "yellow-sapphire",
  },
];

export function getRashi(slug: string) {
  return rashiList.find((r) => r.slug === slug);
}
