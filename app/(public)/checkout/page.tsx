import Link from "next/link";
import type { Metadata } from "next";
import { MessageCircle, Wrench } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { whatsappLink } from "@/lib/data/nav";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false },
};

/** §12 Checkout Flow. Each step below becomes a screen in Phase 08. */
const steps = [
  { title: "Customer information", body: "Name, phone and email. Guest checkout — no account required." },
  { title: "Purchase type", body: "Personal or business, which decides whether GST fields appear." },
  { title: "Addresses", body: "Shipping address, plus a separate billing address when it differs." },
  { title: "GST / business details", body: "GSTIN, legal business name and GST address for registered businesses." },
  { title: "Shipping", body: "Flat insured fee, waived above ₹25,000, configurable from Admin Settings." },
  { title: "Stock check & reservation", body: "Inventory is reserved before a pending order is created." },
  { title: "Order summary", body: "Line items, shipping, applicable tax and the final total." },
  { title: "Payment", body: "UPI, card, net banking, COD or bank transfer, verified server-side by webhook." },
];

export default function CheckoutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Checkout"
        title="Checkout is not wired up yet"
        body="The storefront, cart and enquiry flows are live. Payments, orders and inventory reservation are the next build phase."
        breadcrumbs={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]}
      />

      <div className="shell gutter py-10 sm:py-14">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-start gap-3 rounded-2xl border border-warning-500/30 bg-warning-50 p-5">
            <Wrench size={20} className="mt-0.5 shrink-0 text-warning-700" />
            <div>
              <h2 className="font-semibold text-warning-700">
                In development
              </h2>
              <p className="mt-1 text-[0.9375rem] leading-relaxed text-plum-800">
                Your cart is saved. To place an order today, send us the cart on
                WhatsApp and we will raise the invoice and payment link manually.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappLink(
                    "Hi A1 Gems, I would like to place an order from my cart.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonStyles({ variant: "whatsapp" })}
                >
                  <MessageCircle size={17} />
                  Order via WhatsApp
                </a>
                <Link
                  href="/cart"
                  className={buttonStyles({ variant: "outline" })}
                >
                  Back to cart
                </Link>
              </div>
            </div>
          </div>

          <h2 className="mt-10 font-display text-2xl font-semibold text-plum-900">
            What the checkout will do
          </h2>
          <ol className="mt-5 space-y-3">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="flex gap-4 rounded-xl border border-ivory-300 bg-white p-4"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ivory-200 font-display text-sm font-semibold text-plum-700 tabular-nums">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-[0.9375rem] font-semibold text-plum-900">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-[0.875rem] leading-relaxed text-ink-muted">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
