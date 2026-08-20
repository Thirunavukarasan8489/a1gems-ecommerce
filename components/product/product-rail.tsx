import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/lib/types";

/**
 * Swipeable on phones, grid on desktop.
 *
 * The rail deliberately bleeds past the page gutter so a card is half-visible
 * at the right edge — that peek is what tells a mobile user the row scrolls.
 */
export function ProductRail({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <>
      <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pt-1 pb-2 sm:-mx-6 sm:px-6 lg:hidden">
        {products.map((product) => (
          <li
            key={product.id}
            className="w-[46%] min-w-[10.5rem] shrink-0 snap-start"
          >
            <ProductCard product={product} className="h-full" />
          </li>
        ))}
      </ul>

      <ul className="hidden gap-5 lg:grid lg:grid-cols-4">
        {products.slice(0, 8).map((product) => (
          <li key={product.id}>
            <ProductCard product={product} className="h-full" />
          </li>
        ))}
      </ul>
    </>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} className="h-full" />
        </li>
      ))}
    </ul>
  );
}
