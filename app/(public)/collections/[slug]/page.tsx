import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  FilterBar,
  FilterSidebar,
} from "@/components/public/product/product-filters";
import { ProductGrid } from "@/components/public/product/product-rail";
import { buttonStyles } from "@/components/public/ui/button";
import { EmptyState, PageHeader } from "@/components/public/ui/page-header";
import { getCategories, getCategoryBySlug } from "@/lib/services/category-service";
import { getProductsByCategory } from "@/lib/services/product-service";
import { applyFilters, toQuery } from "@/lib/filters";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories
    .map((category: any) => ({ slug: category.slug }));
}

export async function generateMetadata(
  props: PageProps<"/collections/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Collection not found" };

  return {
    title: category.name,
    description: category.description,
    openGraph: {
      title: category.name,
      description: category.description,
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: category.name,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: category.name,
      description: category.description,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function CollectionPage(
  props: PageProps<"/collections/[slug]">,
) {
  const { slug } = await props.params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const query = toQuery(await props.searchParams);
  const products = await getProductsByCategory(slug);
  const results = applyFilters(products, {
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
