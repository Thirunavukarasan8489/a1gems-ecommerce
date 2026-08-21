import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AboutSection } from "@/components/home/about-section";
import { ConsultationCta } from "@/components/home/consultation-cta";
import { FeaturedCategories } from "@/components/home/featured-categories";
import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { PromoBanners } from "@/components/home/promo-banners";
import { RashiFinder } from "@/components/home/rashi-finder";
import { Testimonials } from "@/components/home/testimonials";
import { TrustStrip } from "@/components/home/trust-strip";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { ProductRail } from "@/components/product/product-rail";
import { Accordion } from "@/components/ui/accordion";
import { buttonStyles } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/lib/data/content";
import {
  getBestsellers,
  getFeaturedProducts,
  getProductsByCategory,
} from "@/lib/data/products";

/**
 * §7 Homepage Flow. Section order matches the CMS specification so that when
 * the Homepage CMS lands (Phase 14) each block below maps to one editable,
 * reorderable section document.
 */
export default function HomePage() {
  const featured = getFeaturedProducts();
  const bestsellers = getBestsellers();
  const bracelets = getProductsByCategory("bracelets");
  const collectorPieces = featured.filter(
    (p) => p.purchaseType === "ENQUIRY_ONLY",
  );

  return (
    <>
      <Hero />
      <TrustStrip />

      <div className="pt-10 sm:pt-14">
        <PromoBanners />
      </div>

      <FeaturedCategories />
      <RashiFinder />

      <section className="shell gutter pb-12 sm:pb-16 lg:pb-20">
        <SectionHeading
          eyebrow="Handpicked"
          title="Featured this month"
          body="Stones our gemmologists would buy themselves."
          href="/products"
        />
        <div className="mt-7">
          <ProductRail products={featured} />
        </div>
      </section>

      <WhyChooseUs />

      {/* Gemstone showcase — the collector-grade, enquiry-only pieces. */}
      <section className="shell gutter py-12 sm:py-16 lg:py-20">
        <SectionHeading
          eyebrow="The vault"
          title="Collector grade, by enquiry"
          body="One-of-a-kind stones sold after a conversation, a viewing and independent verification — never from a cart button."
          href="/products?purchase=enquiry"
          hrefLabel="See all"
        />

        <ul className="mt-7 grid gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {collectorPieces.slice(0, 3).map((product, i) => (
            <li key={product.id}>
              <Link
                href={`/products/${product.slug}`}
                className="group relative flex min-h-64 flex-col justify-end overflow-hidden rounded-2xl bg-plum-950 p-5 text-ivory-100 sm:min-h-80"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 transition-transform duration-700 ease-out-soft group-hover:scale-105"
                  style={{
                    background: `radial-gradient(90% 70% at 50% 22%, ${product.gemColor} 0%, color-mix(in oklab, ${product.gemColor} 40%, #190a09) 55%, #190a09 100%)`,
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-30 mix-blend-overlay"
                  style={{
                    background: `conic-gradient(from ${180 + i * 60}deg at 50% 40%, transparent 0deg, rgba(255,255,255,.7) 45deg, transparent 100deg, rgba(255,255,255,.4) 170deg, transparent 240deg, rgba(255,255,255,.6) 300deg, transparent 355deg)`,
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-plum-950 via-plum-950/70 to-transparent" />

                <div className="relative">
                  <p className="text-[0.625rem] font-semibold tracking-[0.16em] text-gold-300 uppercase">
                    {product.specifications.origin}
                  </p>
                  <h3 className="mt-1.5 text-lg leading-tight font-semibold sm:text-xl">
                    {product.name}
                  </h3>
                  <p className="mt-2 line-2 text-[0.8125rem] leading-relaxed text-plum-200">
                    {product.shortDescription}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300">
                    Enquire
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Bracelet showcase */}
      <section className="bg-ivory-200 py-12 sm:py-16 lg:py-20">
        <div className="shell gutter">
          <SectionHeading
            eyebrow="Everyday pieces"
            title="Gemstone bracelets"
            body="Hand-strung to your wrist measurement and dispatched within 48 hours."
            href="/collections/bracelets"
          />
          <div className="mt-7">
            <ProductRail products={bracelets} />
          </div>
        </div>
      </section>

      <HowItWorks />
      <ConsultationCta />

      <section className="shell gutter py-12 sm:py-16 lg:py-20">
        <SectionHeading
          eyebrow="Bestsellers"
          title="What people are buying"
          href="/products?sort=popular"
        />
        <div className="mt-7">
          <ProductRail products={bestsellers} />
        </div>
      </section>

      <AboutSection />
      <Testimonials />

      <section className="shell gutter py-12 sm:py-16 lg:py-20">
        <div className="lg:grid lg:grid-cols-[0.9fr_1.4fr] lg:items-start lg:gap-14">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions we get asked"
            body="Still unsure? Message us on WhatsApp — a gemmologist replies, not a bot."
          />
          <div className="mt-7 lg:mt-0">
            <Accordion items={faqs.slice(0, 5)} defaultOpenIndex={0} />
            <Link
              href="/faqs"
              className={buttonStyles({
                variant: "ghost",
                size: "sm",
                className: "mt-4",
              })}
            >
              All FAQs
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
