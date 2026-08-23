import mongoose from 'mongoose';
import { Product } from './models/product';

/**
 * Calculates the available inventory based on stock minus reserved quantity.
 */
export function calculateAvailability(stockQuantity: number, reservedQuantity: number): number {
  return Math.max(0, stockQuantity - reservedQuantity);
}

/**
 * Reserves inventory for a product during checkout.
 * MUST be called within a MongoDB transaction session.
 */
export async function reserveInventory(sku: string, quantity: number, session: mongoose.ClientSession) {
  const product = await Product.findOne({ sku }).session(session);
  
  if (!product) {
    throw new Error(`Product with SKU ${sku} not found`);
  }

  const available = calculateAvailability(product.stockQuantity, product.reservedQuantity);

  if (available < quantity) {
    throw new Error(`Insufficient stock for SKU ${sku}. Available: ${available}, Requested: ${quantity}`);
  }

  product.reservedQuantity += quantity;
  
  // Update stock status based on the new availability
  const newAvailable = calculateAvailability(product.stockQuantity, product.reservedQuantity);
  if (newAvailable === 0) {
    product.stockStatus = 'OUT_OF_STOCK';
  } else if (newAvailable <= product.lowStockThreshold) {
    product.stockStatus = 'LOW_STOCK';
  }

  await product.save({ session });
  return product;
}

/**
 * Releases reserved inventory (e.g., if checkout fails, order cancelled, or cart expires).
 * MUST be called within a MongoDB transaction session.
 */
export async function releaseInventory(sku: string, quantity: number, session: mongoose.ClientSession) {
  const product = await Product.findOne({ sku }).session(session);
  
  if (!product) {
    throw new Error(`Product with SKU ${sku} not found`);
  }

  // Prevent reservedQuantity from dropping below 0
  product.reservedQuantity = Math.max(0, product.reservedQuantity - quantity);

  // Update stock status
  const newAvailable = calculateAvailability(product.stockQuantity, product.reservedQuantity);
  if (newAvailable > product.lowStockThreshold) {
    product.stockStatus = 'IN_STOCK';
  } else if (newAvailable > 0) {
    product.stockStatus = 'LOW_STOCK';
  }

  await product.save({ session });
  return product;
}
