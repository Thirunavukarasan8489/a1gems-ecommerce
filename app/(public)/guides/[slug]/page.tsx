import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, Clock } from "lucide-react";
import { EnquiryForm } from "@/components/public/lead/enquiry-form";
import { GemImage } from "@/components/public/ui/gem-image";
import { Breadcrumbs } from "@/components/public/ui/page-header";
import { guides, getGuide } from "@/lib/data/content";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata(
  props: PageProps<"/guides/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide not found" };

  return {
    title: guide.title,
    description: guide.excerpt,
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      type: "article",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: guide.title,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.excerpt,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function GuideDetailPage(
  props: PageProps<"/guides/[slug]">,
) {
  const { slug } = await props.params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const more = guides.filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="relative overflow-hidden bg-plum-950 text-ivory-100">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background: `radial-gradient(60% 70% at 80% 0%, ${guide.gemColor}66, transparent 70%)`,
            }}
          />
          <div className="shell gutter relative py-8 sm:py-12 lg:py-16">
            <Breadcrumbs
              items={[
                { label: "Gemstone Guides", href: "/guides" },
                { label: guide.title },
              ]}
              onDark
            />
            <p className="mt-5 text-[0.6875rem] font-semibold tracking-[0.18em] uppercase">
              <span className="text-foil">{guide.category}</span>
            </p>
            <h1 className="mt-2 max-w-3xl text-[2rem] leading-[1.1] font-semibold sm:text-5xl">
              {guide.title}
            </h1>
            <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-plum-200 sm:text-lg">
              {guide.excerpt}
            </p>
            <p className="mt-5 flex items-center gap-1.5 text-xs text-plum-300">
              <Clock size={14} />
              {guide.readMinutes} min read
            </p>
          </div>
        </header>

        <div className="shell gutter py-8 sm:py-12">
          <GemImage
            color={guide.gemColor}
            seed={3}
            className="aspect-16/9 w-full rounded-2xl sm:aspect-21/9"
          />

          <div className="mx-auto mt-10 max-w-2xl">
            {guide.body.map((section) => (
              <section key={section.heading} className="mb-9">
                <h2 className="font-display text-2xl leading-tight font-semibold text-plum-900 sm:text-3xl">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph, i) => (
                  <p
                    key={i}
                    className="mt-4 text-[1.0625rem] leading-[1.75] text-plum-800"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </article>

      <section className="bg-ivory-200 py-12 sm:py-16">
        <div className="shell gutter mx-auto max-w-2xl">
          <h2 className="text-center font-display text-2xl font-semibold text-plum-900 sm:text-3xl">
            Still have a question?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-[0.9375rem] leading-relaxed text-ink-muted">
            Send it over. A gemmologist will answer it properly, whether or not
            you end up buying anything.
          </p>
          <div className="mt-7">
            <EnquiryForm categoryName={guide.category} source="guide-page" />
          </div>
        </div>
      </section>

      <section className="shell gutter py-12 sm:py-16">
        <h2 className="font-display text-2xl font-semibold text-plum-900">
          More guides
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {more.map((item, i) => (
            <li key={item.slug}>
              <Link
                href={`/guides/${item.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ivory-300 bg-white transition-[border-color,box-shadow] duration-300 hover:border-gold-300 hover:shadow-md"
              >
                <GemImage
                  color={item.gemColor}
                  seed={i * 8 + 4}
                  className="aspect-16/9 w-full"
                />
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-display text-base leading-tight font-semibold text-plum-900">
                    {item.title}
                  </h3>
                  <span className="mt-auto flex items-center gap-1.5 pt-3 text-[0.8125rem] font-semibold text-gold-700">
                    Read
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
