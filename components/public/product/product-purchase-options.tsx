"use client";

import * as React from "react";
import Link from "next/link";
import { MessageCircle, PackageCheck } from "lucide-react";
import { AddToCart } from "@/components/public/cart/add-to-cart";
import { Badge } from "@/components/public/ui/badge";
import { buttonStyles } from "@/components/public/ui/button";
import { Rating } from "@/components/public/ui/rating";
import { whatsappLink } from "@/lib/data/nav";
import {
  canBuy,
  canEnquire,
  type Category,
  type Product,
  type ProductVariant,
} from "@/lib/types";
import { discountPercent, formatINR, cn } from "@/lib/utils";

export function ProductPurchaseOptions({
  product,
  category,
}: {
  product: Product;
  category?: Category;
}) {
  const [selectedVariantIdx, setSelectedVariantIdx] = React.useState(0);

  const hasVariants = product.hasVariants && product.variants && product.variants.length > 0;
  const activeVariant = hasVariants ? product.variants![selectedVariantIdx] : null;

  // Active pricing based on variant or fallback
  const sellingPrice = activeVariant ? activeVariant.price : product.sellingPrice;
  const comparePrice = activeVariant ? activeVariant.comparePrice : product.comparePrice;
  const off = discountPercent(sellingPrice, comparePrice);

  // Active stock based on variant or fallback
  const available = activeVariant 
    ? Math.max(0, activeVariant.stock) 
    : Math.max(0, product.stockQuantity - product.reservedQuantity);
    
  const threshold = activeVariant ? activeVariant.lowStockThreshold : product.lowStockThreshold;

  let status = "IN_STOCK";
  if (available <= 0) status = "OUT_OF_STOCK";
  else if (available <= threshold) status = "LOW_STOCK";

  const buyable = canBuy(product);
  const enquirable = canEnquire(product);

  return (
    <>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <Rating value={product.rating} count={product.reviewCount} />
        {status === "IN_STOCK" && (
          <Badge tone="emerald">
            <PackageCheck size={12} /> In stock
          </Badge>
        )}
        {status === "LOW_STOCK" && (
          <Badge tone="warning">Only {available} left</Badge>
        )}
        {status === "OUT_OF_STOCK" && <Badge tone="plum">Sold out</Badge>}
      </div>

      <div className="mt-5 flex flex-wrap items-end gap-x-3 gap-y-1">
        <span className="text-3xl font-semibold text-plum-900 tabular-nums sm:text-4xl">
          {formatINR(sellingPrice)}
        </span>
        {comparePrice && comparePrice > sellingPrice && (
          <span className="text-lg text-plum-400 line-through tabular-nums">
            {formatINR(comparePrice)}
          </span>
        )}
        {off && <Badge tone="gold">Save {off}%</Badge>}
      </div>
      <p className="mt-1 text-xs text-ink-muted">
        Inclusive of all taxes. Shipping calculated at checkout.
      </p>

      <p className="mt-5 text-[0.9375rem] leading-relaxed text-plum-800">
        {product.shortDescription}
      </p>

      {/* Variant Selector */}
      {hasVariants && (
        <div className="mt-7">
          <h3 className="text-sm font-medium text-plum-900 mb-3">Options</h3>
          <div className="flex flex-wrap gap-2">
            {product.variants!.map((variant, idx) => {
              const isActive = idx === selectedVariantIdx;
              const isSoldOut = variant.stock <= 0;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedVariantIdx(idx)}
                  className={cn(
                    "flex flex-col items-start rounded-xl border p-3 text-left transition-all duration-200",
                    isActive
                      ? "border-gold-500 bg-gold-50/50 shadow-sm ring-1 ring-gold-500"
                      : "border-plum-200 bg-white hover:border-gold-300 hover:bg-gold-50/30",
                    isSoldOut && !isActive && "opacity-60"
                  )}
                >
                  <span
                    className={cn(
                      "text-[0.8125rem] font-semibold leading-tight",
                      isActive ? "text-gold-900" : "text-plum-900"
                    )}
                  >
                    {variant.name}
                  </span>
                  {variant.caratApprox && (
                    <span className="mt-1 text-xs text-plum-500">
                      ~{variant.caratApprox} ct {variant.size ? `(${variant.size})` : ""}
                    </span>
                  )}
                  {isSoldOut && (
                    <span className="mt-1 text-[0.6875rem] font-medium text-plum-400 uppercase tracking-wide">
                      Sold Out
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Purchase CTA */}
      <div className="mt-7 space-y-3" id="enquire">
        {buyable && (
          <AddToCart 
            product={product} 
            variantName={activeVariant?.name} 
            variantPrice={activeVariant?.price} 
            maxQuantity={activeVariant ? activeVariant.stock : undefined}
          />
        )}

        {enquirable && (
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href={`/contact?product=${encodeURIComponent(product.name)}${category ? `&category=${encodeURIComponent(category.name)}` : ""}${activeVariant ? `&variant=${encodeURIComponent(activeVariant.name)}` : ""}`}
              className={buttonStyles({
                variant: buyable ? "outline" : "emerald",
                size: "lg",
                full: true,
              })}
            >
              <MessageCircle size={18} />
              Enquire now
            </Link>
            {product.whatsappEnabled && (
              <a
                href={whatsappLink(
                  `Hi A1 Gems, I am interested in ${product.name} (${product.sku})${activeVariant ? ` - ${activeVariant.name}` : ""}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles({
                  variant: "whatsapp",
                  size: "lg",
                  full: true,
                })}
              >
                WhatsApp us
              </a>
            )}
          </div>
        )}

        {!buyable && (
          <p className="rounded-xl bg-ivory-200 px-4 py-3 text-[0.8125rem] leading-relaxed text-plum-800">
            This is a one-of-a-kind piece sold by enquiry. We will walk you
            through origin, treatment and pricing, and arrange independent
            verification before any payment.
          </p>
        )}
      </div>
    </>
  );
}
