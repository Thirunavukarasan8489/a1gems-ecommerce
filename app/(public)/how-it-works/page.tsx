import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { buttonStyles } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How It Works · A1 Gems Journey",
  description:
    "From selection and lab verification to insured dispatch and Vedic energization: how buying gemstones at A1 Gems works.",
};

const STEPS = [
  {
    num: "01",
    title: "Choose Your Stone or Rashi Ratan",
    desc: "Browse by gemstone category, cut, origin, or astrological Rashi requirements. Select between Buy-Only pieces or high-value Collector Grade gems available by enquiry.",
  },
  {
    num: "02",
    title: "Verify Certificate & Lab Number",
    desc: "Before making any payment, receive the exact Certificate ID (GIA, IGI, GRS, SSEF) and verify dimensions, carat weight, and treatment details directly on the laboratory portal.",
  },
  {
    num: "03",
    title: "Personal or Business GST Checkout",
    desc: "Choose between Personal checkout or Business purchase with your GSTIN for tax invoice input (CGST/SGST/IGST). Pay via UPI, Cards, Net Banking, COD, or Bank Transfer.",
  },
  {
    num: "04",
    title: "Vedic Energization & Insured Dispatch",
    desc: "Optional Pooja ritual performed by Vedic priests in Jaipur. Sealed in tamper-proof box and dispatched via insured courier with live tracking to your doorstep.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="Simple & Transparent"
        title="How Purchasing Works"
        body="Experience a transparent 4-step gemstone buying process built on trust, independent lab reports, and doorstep insured delivery across India."
        breadcrumbs={[{ label: "How It Works" }]}
      />

      <section className="shell gutter py-12 sm:py-16">
        <div className="space-y-8 max-w-4xl mx-auto">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="flex flex-col sm:flex-row items-start gap-6 p-6 sm:p-8 rounded-2xl border border-ivory-300 bg-white shadow-xs"
            >
              <div className="size-16 shrink-0 rounded-2xl bg-plum-950 flex items-center justify-center font-display text-2xl font-bold text-gold-400">
                {step.num}
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-semibold text-plum-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-plum-700 leading-relaxed">
                  {step.desc}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 size={16} />
                  <span>Guaranteed by A1 Gems Certificate Assurance</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/products" className={buttonStyles({ size: "lg" })}>
            Start Exploring Collection
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
