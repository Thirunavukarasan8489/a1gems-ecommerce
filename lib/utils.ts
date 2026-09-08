import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Product } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** Format Rupee amounts nicely with Indian numbering system (e.g. ₹3,27,500). */
export function formatINR(amount: number) {
  if (!amount && amount !== 0) return "₹0";
  return inr.format(amount);
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

export function flattenVariants(products: Product[]): Product[] {
  const flattened: Product[] = [];
  
  for (const product of products) {
    if (product.hasVariants && product.variants && product.variants.length > 0) {
      for (let i = 0; i < product.variants.length; i++) {
        const variant = product.variants[i];
        
        // Skip variants with 0 stock unless we explicitly want to show out of stock
        // Wait, normally we show all products, just marked as "Sold Out"
        
        const variantProduct: Product = {
          ...product,
          id: product.id, // keep the same base product id for cart
          slug: variant.slug || `${product.slug}-${slugify(variant.name)}`,
          name: `${product.name} - ${variant.name}`,
          sellingPrice: variant.price,
          comparePrice: variant.comparePrice,
          stockQuantity: variant.stock,
          lowStockThreshold: variant.lowStockThreshold || product.lowStockThreshold,
          primaryImage: variant.image?.url ? variant.image : product.primaryImage,
          selectedVariantName: variant.name,
          hasVariants: false,
          variants: [],
        };
        flattened.push(variantProduct);
      }
    } else {
      flattened.push(product);
    }
  }
  
  return flattened;
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

export const NAV_DATA = {
  primaryNav: [
    { label: "All Products", href: "/products" },
    { label: "Gemstone Guides", href: "/guides" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  secondaryNav: [
    { label: "FAQs", href: "/faqs" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Track Order", href: "/track-order" },
  ],
  business: {
    phone: "+91 98400 12345",
    phoneHref: "tel:+919840012345",
    whatsapp: "919840012345",
    email: "hello@a1gems.in",
    address: "12, Radha Krishnan Salai, Mylapore, Chennai 600004",
    hours: "Mon–Sat, 10:00 – 19:00 IST",
  },
};
