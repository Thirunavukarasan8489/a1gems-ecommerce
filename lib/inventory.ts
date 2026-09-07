import mongoose from 'mongoose';
import { Product } from './models/product';

/**
 * Calculates the available inventory based on stock minus reserved quantity.
 */
export function calculateAvailability(stockQuantity: number, reservedQuantity: number): number {
  return Math.max(0, stockQuantity - reservedQuantity);
}

/**
 * Recalculates product stockStatus based on variants
 */
function updateProductStockStatus(product: any) {
  let totalAvailable = 0;
  let lowestThreshold = Infinity;

  if (product.hasVariants && Array.isArray(product.variants)) {
    for (const v of product.variants) {
      const vStock = Number(v.stock) || 0;
      const vReserved = Number(v.reservedQuantity) || 0;
      totalAvailable += calculateAvailability(vStock, vReserved);
      if (v.lowStockThreshold < lowestThreshold) {
        lowestThreshold = v.lowStockThreshold;
      }
    }
  }

  if (lowestThreshold === Infinity) lowestThreshold = 5;

  if (totalAvailable === 0) {
    product.stockStatus = 'OUT_OF_STOCK';
  } else if (totalAvailable <= lowestThreshold) {
    product.stockStatus = 'LOW_STOCK';
  } else {
    product.stockStatus = 'IN_STOCK';
  }
}

/**
 * Reserves inventory for a product variant during checkout.
 * MUST be called within a MongoDB transaction session.
 */
export async function reserveInventory(productId: string, variantId: string, quantity: number, session: mongoose.ClientSession) {
  const product = await Product.findById(productId).session(session);
  
  if (!product) {
    throw new Error(`Product with ID ${productId} not found`);
  }

  let variant = null;
  if (product.hasVariants && variantId) {
    variant = product.variants.id(variantId);
  } else if (!product.hasVariants && product.variants.length > 0) {
    // Fallback if marked as no variants but has a default variant
    variant = product.variants[0];
  }

  if (!variant) {
    throw new Error(`Variant ${variantId} not found for product ${product.name}`);
  }

  const available = calculateAvailability(variant.stock, variant.reservedQuantity || 0);

  if (available < quantity) {
    throw new Error(`Insufficient stock for ${product.name}. Available: ${available}, Requested: ${quantity}`);
  }

  variant.reservedQuantity = (variant.reservedQuantity || 0) + quantity;
  
  // Also update root reservedQuantity for backward compatibility
  product.reservedQuantity = (product.reservedQuantity || 0) + quantity;

  updateProductStockStatus(product);

  await product.save({ session });
  return product;
}

/**
 * Releases reserved inventory (e.g., if checkout fails, order cancelled, or cart expires).
 * MUST be called within a MongoDB transaction session.
 */
export async function releaseInventory(productId: string, variantId: string, quantity: number, session: mongoose.ClientSession) {
  const product = await Product.findById(productId).session(session);
  
  if (!product) {
    throw new Error(`Product with ID ${productId} not found`);
  }

  let variant = null;
  if (product.hasVariants && variantId) {
    variant = product.variants.id(variantId);
  } else if (!product.hasVariants && product.variants.length > 0) {
    variant = product.variants[0];
  }

  if (!variant) {
    throw new Error(`Variant ${variantId} not found for product ${product.name}`);
  }

  // Prevent reservedQuantity from dropping below 0
  variant.reservedQuantity = Math.max(0, (variant.reservedQuantity || 0) - quantity);
  product.reservedQuantity = Math.max(0, (product.reservedQuantity || 0) - quantity);

  updateProductStockStatus(product);

  await product.save({ session });
  return product;
}

/**
 * Finalizes inventory (e.g., payment successful).
 * Decrements stock and clears the reservation.
 * MUST be called within a MongoDB transaction session.
 */
export async function finalizeInventory(productId: string, variantId: string, quantity: number, session: mongoose.ClientSession) {
  const product = await Product.findById(productId).session(session);
  
  if (!product) {
    throw new Error(`Product with ID ${productId} not found`);
  }

  let variant = null;
  if (product.hasVariants && variantId) {
    variant = product.variants.id(variantId);
  } else if (!product.hasVariants && product.variants.length > 0) {
    variant = product.variants[0];
  }

  if (!variant) {
    throw new Error(`Variant ${variantId} not found for product ${product.name}`);
  }

  // Deduct actual stock
  variant.stock = Math.max(0, (variant.stock || 0) - quantity);
  
  // Clear the reservation
  variant.reservedQuantity = Math.max(0, (variant.reservedQuantity || 0) - quantity);
  product.reservedQuantity = Math.max(0, (product.reservedQuantity || 0) - quantity);

  updateProductStockStatus(product);

  await product.save({ session });
  return product;
}

/**
 * Restocks finalized inventory (e.g., cancelled paid order or returned item).
 * Increments stock.
 * MUST be called within a MongoDB transaction session.
 */
export async function restockInventory(productId: string, variantId: string, quantity: number, session: mongoose.ClientSession) {
  const product = await Product.findById(productId).session(session);
  
  if (!product) {
    throw new Error(`Product with ID ${productId} not found`);
  }

  let variant = null;
  if (product.hasVariants && variantId) {
    variant = product.variants.id(variantId);
  } else if (!product.hasVariants && product.variants.length > 0) {
    variant = product.variants[0];
  }

  if (!variant) {
    throw new Error(`Variant ${variantId} not found for product ${product.name}`);
  }

  // Increment stock
  variant.stock = (variant.stock || 0) + quantity;

  updateProductStockStatus(product);

  await product.save({ session });
  return product;
}
