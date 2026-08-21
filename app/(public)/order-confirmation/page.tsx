import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Truck, Package, MessageCircle, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { buttonStyles } from "@/components/ui/button";
import { whatsappLink } from "@/lib/data/nav";

export const metadata: Metadata = {
  title: "Order Confirmed · A1 Gems",
  description: "Thank you for your gemstone purchase with A1 Gems. Your order has been received.",
};

export default async function OrderConfirmationPage(props: {
  searchParams: Promise<{ id?: string; type?: string }>;
}) {
  const params = await props.searchParams;
  const orderId = params.id || "AG-ORD-98214";
  const purchaseType = params.type === "business" ? "Business Purchase (GST Tax Invoice)" : "Personal Purchase";

  return (
    <>
      <PageHeader
        eyebrow="Order Placed Successfully"
        title="Thank You for Your Order"
        body={`Your gemstone order #${orderId} has been confirmed. Our gemmologists are preparing your insured shipment.`}
        breadcrumbs={[{ label: "Order Confirmation" }]}
      />

      <section className="shell gutter py-10 max-w-3xl mx-auto">
        <div className="rounded-2xl border border-gold-500/30 bg-white p-6 sm:p-8 shadow-md">
          <div className="flex items-center gap-4 border-b border-ivory-200 pb-6">
            <div className="size-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <CheckCircle size={32} />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-700">
                Order #{orderId}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-plum-900">
                Payment Received & Inventory Reserved
              </h2>
              <p className="text-xs text-plum-600 mt-0.5">{purchaseType}</p>
            </div>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm">
            <div className="rounded-xl bg-ivory-50 p-4 border border-ivory-200">
              <span className="text-xs font-medium text-ink-muted uppercase">Dispatch Estimate</span>
              <p className="font-semibold text-plum-900 mt-1 flex items-center gap-2">
                <Truck size={16} className="text-gold-600" />
                Within 24 - 48 Hours
              </p>
              <p className="text-xs text-plum-600 mt-1">Live tracking sent via SMS & WhatsApp</p>
            </div>

            <div className="rounded-xl bg-ivory-50 p-4 border border-ivory-200">
              <span className="text-xs font-medium text-ink-muted uppercase">Authenticity Guarantee</span>
              <p className="font-semibold text-plum-900 mt-1 flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-600" />
                Laboratory Certificate Included
              </p>
              <p className="text-xs text-plum-600 mt-1">Sealed tamper-evident box</p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-ivory-200 p-4 text-xs text-plum-700 space-y-2">
            <div className="flex justify-between">
              <span>Order Number:</span>
              <span className="font-mono font-semibold text-plum-900">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <span className="font-semibold text-emerald-700">CONFIRMED (Processing)</span>
            </div>
            <div className="flex justify-between">
              <span>Payment Mode:</span>
              <span className="font-semibold text-plum-900">UPI / Insured Prepaid</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href={`/track-order?id=${orderId}`}
              className={buttonStyles({ size: "lg", className: "sm:flex-1" })}
            >
              <Package size={18} />
              Track Order Status
            </Link>

            <a
              href={whatsappLink(`Hi A1 Gems, I placed order #${orderId} and need help.`)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles({
                variant: "whatsapp",
                size: "lg",
                className: "sm:flex-1",
              })}
            >
              <MessageCircle size={18} />
              WhatsApp Support
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
