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
import { AddToCart } from "@/components/public/cart/add-to-cart";
import { ProductGallery } from "@/components/public/product/product-gallery";
import { ProductRail } from "@/components/public/product/product-rail";
import { Badge } from "@/components/public/ui/badge";
import { Breadcrumbs } from "@/components/public/ui/page-header";
import { ProductPurchaseOptions } from "@/components/public/product/product-purchase-options";
import { Rating } from "@/components/public/ui/rating";
import { SectionHeading } from "@/components/public/ui/section-heading";
import { getCategory } from "@/lib/data/categories";
import {
  getProductBySlug,
  getProducts,
  getRelatedProducts,
} from "@/lib/services/product-service";
import {
  availableQuantity,
} from "@/lib/types";

export async function generateStaticParams() {
  const products = await getProducts();
  return products
    .filter((p) => p.published)
    .map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(
  props: PageProps<"/products/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };

  return {
    title: product.seo?.metaTitle || `${product.name} | A1 Gems`,
    description: product.seo?.metaDescription || product.shortDescription,
    keywords: product.seo?.keywords,
    openGraph: product.seo?.ogImage ? {
      images: [{ url: product.seo.ogImage }],
    } : undefined,
  };
}

export default async function ProductDetailPage(
  props: PageProps<"/products/[slug]">,
) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.categorySlug);
  const related = await getRelatedProducts(product.id, product.categorySlug);

  const specs = [
    ["Stone", product.specifications.stone],
    ["Material", product.specifications.material],
    ["Weight", product.specifications.weight],
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
            images={product.images && product.images.length > 0 ? product.images : (product.primaryImage ? [product.primaryImage] : undefined)}
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

          <p className="mt-5 text-[0.9375rem] leading-relaxed text-plum-800">
            {product.shortDescription}
          </p>

          <ProductPurchaseOptions product={product} category={category} />

          {/* Long Description */}
          {product.description && (
            <div className="mt-10 border-t border-plum-100 pt-8">
              <h2 className="text-lg font-semibold text-plum-900 mb-4">About this piece</h2>
              <div className="whitespace-pre-wrap text-[0.9375rem] leading-relaxed text-plum-800">
                {product.description}
              </div>
            </div>
          )}

          {/* Linked Guide */}
          {product.guide && (
            <div className="mt-8 rounded-xl bg-ivory-200 p-5">
              <h3 className="text-sm font-semibold text-plum-900">Gemstone Education</h3>
              <p className="mt-1 text-sm text-plum-700">
                Learn more about origin, treatment, and value in our guide.
              </p>
              <Link 
                href={`/guides/${product.guide.slug}`}
                className="mt-3 inline-flex text-sm font-medium text-gold-600 hover:text-gold-700 transition-colors underline underline-offset-4"
              >
                Read the {product.guide.name} Guide
              </Link>
            </div>
          )}

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
        <section className="relative w-full max-w-full overflow-hidden shell gutter py-12 sm:py-16">
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
