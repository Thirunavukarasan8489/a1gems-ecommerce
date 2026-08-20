/**
 * Domain types for the A1 Gems catalogue.
 *
 * These mirror the fields in the spec (§9 Purchase Type, §24 Product Admin
 * Fields, §25 Category Flow) so that swapping the mock data layer for MongoDB
 * later is a change of source, not a change of shape.
 */

export type PurchaseType = "ENQUIRY_ONLY" | "BUY_ONLY" | "BUY_AND_ENQUIRE";

export type StockStatus = "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  /** Hue anchor used to render the placeholder gem artwork. */
  gemColor: string;
  displayOrder: number;
  published: boolean;
}

export interface ProductSpecifications {
  material?: string;
  stone?: string;
  size?: string;
  weight?: string;
  origin?: string;
  certification?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  shortDescription: string;
  description: string;

  /** Money in paise. */
  sellingPrice: number;
  comparePrice?: number;

  sku: string;
  stockQuantity: number;
  reservedQuantity: number;
  lowStockThreshold: number;

  purchaseType: PurchaseType;
  enquiryEnabled: boolean;
  whatsappEnabled: boolean;

  specifications: ProductSpecifications;

  /** Hue anchor for the placeholder artwork until real media is uploaded. */
  gemColor: string;
  gallery: number;

  featured: boolean;
  bestseller: boolean;
  rating: number;
  reviewCount: number;
  published: boolean;
}

/** §13 Inventory Flow: available = stock - reserved */
export function availableQuantity(product: Product) {
  return Math.max(0, product.stockQuantity - product.reservedQuantity);
}

export function stockStatus(product: Product): StockStatus {
  const available = availableQuantity(product);
  if (available <= 0) return "OUT_OF_STOCK";
  if (available <= product.lowStockThreshold) return "LOW_STOCK";
  return "IN_STOCK";
}

export function canBuy(product: Product) {
  return (
    product.purchaseType === "BUY_ONLY" ||
    product.purchaseType === "BUY_AND_ENQUIRE"
  );
}

export function canEnquire(product: Product) {
  return (
    product.purchaseType === "ENQUIRY_ONLY" ||
    product.purchaseType === "BUY_AND_ENQUIRE"
  );
}

export interface CartLine {
  productId: string;
  slug: string;
  name: string;
  gemColor: string;
  /** Price snapshot at the time the line was added (§11.1). */
  unitPrice: number;
  quantity: number;
}
