import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Clock } from "lucide-react";
import { GemImage } from "@/components/ui/gem-image";
import { PageHeader } from "@/components/ui/page-header";
import { guides } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Gemstone Guides",
  description:
    "Practical guides to buying gemstones — identifying natural stones, reading certificates, understanding treatments and choosing carat weight.",
};

export default function GuidesPage() {
  const [lead, ...rest] = guides;

  return (
    <>
      <PageHeader
        eyebrow="Gemstone guides"
        title="Learn before you buy"
        body="Everything we wish buyers knew before they walked into a shop. No sales pitch, just the mechanics of the trade."
        breadcrumbs={[{ label: "Gemstone Guides" }]}
      />

      <div className="shell gutter py-10 sm:py-14">
        <Link
          href={`/guides/${lead.slug}`}
          className="group grid overflow-hidden rounded-2xl border border-ivory-300 bg-white transition-[border-color,box-shadow] duration-300 hover:border-gold-300 hover:shadow-md lg:grid-cols-2"
        >
          <GemImage
            color={lead.gemColor}
            seed={1}
            className="aspect-16/9 w-full lg:aspect-auto lg:h-full lg:min-h-72"
          />
          <div className="flex flex-col justify-center p-5 sm:p-8">
            <p className="text-[0.625rem] font-semibold tracking-[0.16em] text-gold-700 uppercase">
              {lead.category} · Featured
            </p>
            <h2 className="mt-2.5 font-display text-2xl leading-tight font-semibold text-plum-900 sm:text-3xl">
              {lead.title}
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
              {lead.excerpt}
            </p>
            <span className="mt-5 flex items-center gap-4 text-[0.8125rem] font-semibold text-plum-700">
              <span className="flex items-center gap-1.5 text-ink-muted">
                <Clock size={14} />
                {lead.readMinutes} min read
              </span>
              <span className="flex items-center gap-1.5 text-gold-700">
                Read guide
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </span>
            </span>
          </div>
        </Link>

        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {rest.map((guide, i) => (
            <li key={guide.slug}>
              <Link
                href={`/guides/${guide.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ivory-300 bg-white transition-[border-color,box-shadow] duration-300 hover:border-gold-300 hover:shadow-md"
              >
                <GemImage
                  color={guide.gemColor}
                  seed={i * 6 + 2}
                  className="aspect-16/9 w-full transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-105"
                />
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-[0.625rem] font-semibold tracking-[0.14em] text-gold-700 uppercase">
                    {guide.category}
                  </p>
                  <h3 className="mt-2 font-display text-lg leading-tight font-semibold text-plum-900">
                    {guide.title}
                  </h3>
                  <p className="mt-2 line-2 text-[0.8125rem] leading-relaxed text-ink-muted">
                    {guide.excerpt}
                  </p>
                  <span className="mt-auto flex items-center gap-1.5 pt-4 text-xs text-ink-muted">
                    <Clock size={13} />
                    {guide.readMinutes} min read
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
