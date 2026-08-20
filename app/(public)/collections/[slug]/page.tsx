import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  FilterBar,
  FilterSidebar,
} from "@/components/product/product-filters";
import { ProductGrid } from "@/components/product/product-rail";
import { buttonStyles } from "@/components/ui/button";
import { EmptyState, PageHeader } from "@/components/ui/page-header";
import { categories, getCategory } from "@/lib/data/categories";
import { getProductsByCategory } from "@/lib/data/products";
import { applyFilters, toQuery } from "@/lib/filters";

export function generateStaticParams() {
  return categories
    .filter((c) => c.published)
    .map((category) => ({ slug: category.slug }));
}

export async function generateMetadata(
  props: PageProps<"/collections/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const category = getCategory(slug);
  if (!category) return { title: "Collection not found" };

  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CollectionPage(
  props: PageProps<"/collections/[slug]">,
) {
  const { slug } = await props.params;
  const category = getCategory(slug);
  if (!category) notFound();

  const query = toQuery(await props.searchParams);
  const results = applyFilters(getProductsByCategory(slug), {
    ...query,
    category: undefined,
  });

  return (
    <>
      <PageHeader
        eyebrow="Collection"
        title={category.name}
        body={category.description}
        breadcrumbs={[
          { label: "Collections", href: "/collections" },
          { label: category.name.split(" / ")[0] },
        ]}
      />

      <div className="shell gutter">
        <Suspense fallback={<div className="h-16" />}>
          <FilterBar total={results.length} lockCategory={slug} />
        </Suspense>

        <div className="py-8 lg:grid lg:grid-cols-[15rem_1fr] lg:gap-10">
          <Suspense fallback={null}>
            <FilterSidebar lockCategory={slug} />
          </Suspense>

          <div>
            {results.length > 0 ? (
              <ProductGrid products={results} />
            ) : (
              <EmptyState
                title="Nothing matches those filters"
                body="We restock this collection regularly. Tell us what you are after and we will let you know the moment it lands."
                action={
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={`/collections/${slug}`}
                      className={buttonStyles()}
                    >
                      Clear filters
                    </Link>
                    <Link
                      href="/contact"
                      className={buttonStyles({ variant: "outline" })}
                    >
                      Request a stone
                    </Link>
                  </div>
                }
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
