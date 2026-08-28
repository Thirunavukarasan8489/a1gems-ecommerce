import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { GemImage } from "@/components/public/ui/gem-image";
import { PageHeader } from "@/components/public/ui/page-header";
import { getCategories } from "@/lib/services/category-service";
import { getProducts } from "@/lib/services/product-service";
import { categoryTerms } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Browse A1 Gems collections by stone — ruby, blue sapphire, yellow sapphire, emerald, pearl, red coral, bracelets and rudraksha.",
};

export default async function CollectionsPage() {
  const categories = await getCategories();
  const products = await getProducts();
  return (
    <>
      <PageHeader
        eyebrow="Collections"
        title="Shop by stone"
        body="Eight collections, each sourced from the deposits that actually produce material worth owning."
        breadcrumbs={[{ label: "Collections" }]}
      />

      <div className="shell gutter py-10 sm:py-14">
        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {categories.map((cat, i) => {
            const count = products.filter(
              (p) => p.categorySlug === cat.slug && p.published,
            ).length;
            const terms = categoryTerms(cat.name);

            return (
              <li key={cat.slug}>
                <Link
                  href={`/collections/${cat.slug}`}
                  className="group flex h-full gap-4 overflow-hidden rounded-2xl border border-ivory-300 bg-white p-3 transition-[border-color,box-shadow] duration-300 hover:border-gold-300 hover:shadow-md sm:p-4"
                >
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="size-24 shrink-0 rounded-xl object-cover transition-transform duration-500 ease-out-soft group-hover:scale-105 sm:size-32"
                    />
                  ) : (
                    <GemImage
                      color={cat.gemColor}
                      seed={i * 4}
                      className="size-24 shrink-0 rounded-xl transition-transform duration-500 ease-out-soft group-hover:scale-105 sm:size-32"
                    />
                  )}

                  <div className="flex min-w-0 flex-1 flex-col">
                    <h2 className="font-display text-lg leading-tight font-semibold text-plum-900 sm:text-xl">
                      {terms.primary}
                      {terms.secondary && (
                        <span className="ml-2 font-sans text-sm font-normal text-ink-muted">
                          {terms.secondary}
                        </span>
                      )}
                    </h2>
                    <p className="mt-1.5 line-3 text-[0.8125rem] leading-relaxed text-ink-muted">
                      {cat.description}
                    </p>
                    <span className="mt-auto flex items-center gap-1.5 pt-3 text-[0.8125rem] font-semibold text-gold-700">
                      {count} {count === 1 ? "piece" : "pieces"}
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
