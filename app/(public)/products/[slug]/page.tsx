import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  BadgeCheck,
  MessageCircle,
  PackageCheck,
  RefreshCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { PincodeChecker } from "@/components/product/pincode-checker";
import { AddToCart } from "@/components/cart/add-to-cart";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductRail } from "@/components/product/product-rail";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/page-header";
import { Rating } from "@/components/ui/rating";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCategory } from "@/lib/data/categories";
import {
  getProduct,
  getRelatedProducts,
  products,
} from "@/lib/data/products";
import { whatsappLink } from "@/lib/data/nav";
import {
  availableQuantity,
  canBuy,
  canEnquire,
  stockStatus,
} from "@/lib/types";
import { discountPercent, formatINR } from "@/lib/utils";

export function generateStaticParams() {
  return products
    .filter((p) => p.published)
    .map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(
  props: PageProps<"/products/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      type: "website",
    },
  };
}

export default async function ProductDetailPage(
  props: PageProps<"/products/[slug]">,
) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.categorySlug);
  const off = discountPercent(product.sellingPrice, product.comparePrice);
  const status = stockStatus(product);
  const available = availableQuantity(product);
  const buyable = canBuy(product);
  const enquirable = canEnquire(product);
  const related = getRelatedProducts(product);

  // Extract Carats & calculate Indian Ratti (1 Ratti ~ 0.91 Ct)
  const ctMatch = product.specifications.weight?.match(/([\d.]+)/);
  const ctVal = ctMatch ? parseFloat(ctMatch[1]) : null;
  const rattiVal = ctVal ? (ctVal / 0.91).toFixed(2) : null;
  const weightDisplay = rattiVal
    ? `${product.specifications.weight} (${rattiVal} Ratti)`
    : product.specifications.weight;

  const specs = [
    ["Stone", product.specifications.stone],
    ["Material", product.specifications.material],
    ["Weight", weightDisplay],
    ["Dimensions", product.specifications.size],
    ["Origin", product.specifications.origin],
    ["SKU", product.sku],
  ].filter(([, value]) => Boolean(value)) as [string, string][];

  return (
    <>
      <div className="shell gutter pt-5">
        <Breadcrumbs
          items={[
            { label: "Products", href: "/products" },
            ...(category
              ? [
                  {
                    label: category.name.split(" / ")[0],
                    href: `/collections/${category.slug}`,
                  },
                ]
              : []),
            { label: product.name },
          ]}
        />
      </div>

      <div className="shell gutter py-6 lg:grid lg:grid-cols-2 lg:items-start lg:gap-12 lg:py-10">
        <div className="lg:sticky lg:top-28">
          <ProductGallery
            color={product.gemColor}
            count={product.gallery}
            name={product.name}
          />
        </div>

        <div className="mt-7 lg:mt-0">
          {category && (
            <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-gold-700 uppercase">
              {category.name}
            </p>
          )}

          <h1 className="mt-2 text-[1.75rem] leading-tight font-semibold text-plum-900 sm:text-4xl">
            {product.name}
          </h1>

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
              {formatINR(product.sellingPrice)}
            </span>
            {product.comparePrice && (
              <span className="text-lg text-plum-400 line-through tabular-nums">
                {formatINR(product.comparePrice)}
              </span>
            )}
            {off && <Badge tone="gold">Save {off}%</Badge>}
          </div>
          <p className="mt-1 text-xs text-ink-muted">
            Inclusive of all taxes. Free insured delivery across India.
          </p>

          <p className="mt-5 text-[0.9375rem] leading-relaxed text-plum-800">
            {product.shortDescription}
          </p>

          {/* Purchase CTA — driven by the product's purchase type (§9). */}
          <div className="mt-7 space-y-3" id="enquire">
            {buyable && <AddToCart product={product} />}

            {enquirable && (
              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  href={`/contact?product=${encodeURIComponent(product.name)}${category ? `&category=${encodeURIComponent(category.name)}` : ""}`}
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
                      `Hi A1 Gems, I am interested in ${product.name} (${product.sku}).`,
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

          {/* Indian PIN Code Delivery Checker */}
          <div className="mt-6">
            <PincodeChecker />
          </div>

          {/* Certification callout — the trust anchor of the whole page. */}
          {product.specifications.certification && (
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-gold-500/25 bg-gold-50 p-4">
              <BadgeCheck
                size={20}
                className="mt-0.5 shrink-0 text-gold-700"
                strokeWidth={2.25}
              />
              <div>
                <p className="text-sm font-semibold text-gold-900">
                  {product.specifications.certification}
                </p>
                <p className="mt-1 text-[0.8125rem] leading-relaxed text-gold-800">
                  The report number is issued to you before payment so you can
                  verify it on the laboratory&rsquo;s own website.
                </p>
              </div>
            </div>
          )}

          <ul className="mt-6 grid grid-cols-3 gap-3 border-y border-ivory-300 py-4">
            {[
              { icon: Truck, label: "Insured delivery" },
              { icon: RefreshCcw, label: "7-day returns" },
              { icon: ShieldCheck, label: "Natural, disclosed" },
            ].map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex flex-col items-center gap-1.5 text-center"
              >
                <Icon size={19} className="text-gold-700" strokeWidth={1.9} />
                <span className="text-[0.6875rem] leading-tight font-medium text-plum-800">
                  {label}
                </span>
              </li>
            ))}
          </ul>

          <section className="mt-7">
            <h2 className="font-display text-xl font-semibold text-plum-900">
              Specifications
            </h2>
            <dl className="mt-3 overflow-hidden rounded-xl border border-ivory-300 bg-white">
              {specs.map(([label, value], i) => (
                <div
                  key={label}
                  className={`flex gap-4 px-4 py-3 text-sm ${
                    i % 2 ? "bg-ivory-50" : ""
                  }`}
                >
                  <dt className="w-32 shrink-0 text-ink-muted">{label}</dt>
                  <dd className="font-medium text-plum-900">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-7">
            <h2 className="font-display text-xl font-semibold text-plum-900">
              About this stone
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-plum-800">
              {product.description}
            </p>
          </section>

          <section className="mt-7">
            <h2 className="font-display text-xl font-semibold text-plum-900">
              Shipping &amp; returns
            </h2>
            <ul className="mt-3 space-y-2 text-[0.9375rem] leading-relaxed text-plum-800">
              <li>
                Dispatched within 2 working days, fully insured with signature
                on delivery.
              </li>
              <li>
                Flat shipping fee, waived on orders above ₹25,000. Calculated at
                checkout.
              </li>
              <li>
                Unworn stones can be returned within 7 days in their original
                sealed packaging with the certificate intact.
              </li>
            </ul>
          </section>
        </div>
      </div>

      {related.length > 0 && (
        <section className="shell gutter py-12 sm:py-16">
          <SectionHeading
            eyebrow="You may also like"
            title="Similar stones"
            href="/products"
          />
          <div className="mt-7">
            <ProductRail products={related} />
          </div>
        </section>
      )}
    </>
  );
}
