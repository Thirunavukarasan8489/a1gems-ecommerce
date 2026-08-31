import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** Prices are stored in paise so we never do float maths on money. */
export function formatINR(paise: number) {
  return inr.format(paise / 100);
}

export function discountPercent(sellingPaise: number, comparePaise?: number) {
  if (!comparePaise || comparePaise <= sellingPaise) return null;
  return Math.round(((comparePaise - sellingPaise) / comparePaise) * 100);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Category names are stored "English / Sanskrit" (e.g. "Ruby / Manik"). Buyers
 * in this market search the Sanskrit/rashi-ratna term as often as the English
 * one, so decorative labels (chips, cards, nav) lead with it while functional
 * wayfinding (breadcrumbs, page titles) keeps the full string.
 */
export function categoryTerms(name: string) {
  const [english, sanskrit] = name.split(" / ");
  return sanskrit
    ? { primary: sanskrit, secondary: english }
    : { primary: english, secondary: null as string | null };
}

export function whatsappLink(businessData: any, message: string) {
  const number = businessData?.whatsapp || "919840012345";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
