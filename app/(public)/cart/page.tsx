import type { Metadata } from "next";
import { CartView } from "./cart-view";
import { PageHeader } from "@/components/public/ui/page-header";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review the gemstones in your A1 Gems cart before checkout.",
};

export default function CartPage() {
  return (
    <>
      <PageHeader
        eyebrow="Cart"
        title="Your cart"
        breadcrumbs={[{ label: "Cart" }]}
      />
      <div className="shell gutter py-8 sm:py-12">
        <CartView />
      </div>
    </>
  );
}
