import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, ShieldCheck, Award, Gem, Truck, HeartHandshake, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { buttonStyles } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Why A1 Gems · Certified Natural Gemstones",
  description:
    "Learn why collectors, jewelers, and astrology practitioners across India trust A1 Gems for 100% natural, lab-certified gemstones.",
};

export default function WhyA1GemsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Trust & Authenticity"
        title="Why Choose A1 Gems?"
        body="Founded in Jaipur's historic Johari Bazaar, A1 Gems brings 30+ years of gemological heritage, transparent pricing, and uncompromised lab certification."
        breadcrumbs={[{ label: "Why A1 Gems" }]}
      />

      <section className="shell gutter py-12 sm:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: BadgeCheck,
              title: "100% Natural & Unheated",
              desc: "Every gemstone in our vault is guaranteed 100% natural. We strictly disclose all treatments (such as heat or clarity enhancement) or offer completely untreated pieces.",
            },
            {
              icon: ShieldCheck,
              title: "Independent Lab Verification",
              desc: "We issue report numbers from globally recognized laboratories (IGI, GIA, GRS, SSEF) BEFORE payment. Verify your stone directly on the lab's official portal.",
            },
            {
              icon: Gem,
              title: "Jaipur Gemological Heritage",
              desc: "Sourced directly from mines in Sri Lanka, Myanmar, Zambia, and Colombia, processed by master lapidaries with decades of traditional craftsmanship.",
            },
            {
              icon: Award,
              title: "Vedic Astrology Approved",
              desc: "Prescribed according to Graha Shanti and Rashi requirements. Optional Vedic Pooja and energization certificates available for sacred wear.",
            },
            {
              icon: Truck,
              title: "Insured Pan-India Express Delivery",
              desc: "Packed in sealed, tamper-evident security boxes and shipped with 100% transit insurance across all 19,000+ Indian postal pincodes.",
            },
            {
              icon: HeartHandshake,
              title: "7-Day No-Questions Return",
              desc: "If the stone does not pass your independent appraisal or gemologist inspection, return it within 7 days in its original sealed box for a full refund.",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-ivory-300 bg-white p-6 shadow-xs hover:border-gold-400 hover:shadow-md transition-all"
              >
                <div className="size-12 rounded-xl bg-gold-100 flex items-center justify-center text-gold-700 mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-plum-900">{item.title}</h3>
                <p className="mt-2 text-sm text-plum-700 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-14 rounded-2xl bg-plum-950 p-8 sm:p-12 text-ivory-100 text-center relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: "radial-gradient(circle at 50% 50%, #d4af37 0%, transparent 70%)",
            }}
          />
          <h2 className="text-2xl sm:text-4xl font-semibold relative z-10">
            Ready to find your <span className="text-foil">perfect gemstone?</span>
          </h2>
          <p className="mt-3 text-plum-200 max-w-xl mx-auto text-sm sm:text-base relative z-10">
            Browse our certified collection or consult directly with a senior gemmologist over WhatsApp.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 relative z-10">
            <Link
              href="/products"
              className={buttonStyles({ size: "lg" })}
            >
              Explore Products
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className={buttonStyles({ variant: "outline", size: "lg", className: "border-white/30 text-white hover:bg-white/10" })}
            >
              Book Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
