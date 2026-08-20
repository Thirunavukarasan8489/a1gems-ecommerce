import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { getPolicy, policies } from "@/lib/data/policies";

export function generateStaticParams() {
  return policies.map((policy) => ({ slug: policy.slug }));
}

export async function generateMetadata(
  props: PageProps<"/policies/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const policy = getPolicy(slug);
  if (!policy) return { title: "Policy not found" };

  return { title: policy.title, description: policy.summary };
}

export default async function PolicyPage(
  props: PageProps<"/policies/[slug]">,
) {
  const { slug } = await props.params;
  const policy = getPolicy(slug);
  if (!policy) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={policy.title}
        body={policy.summary}
        breadcrumbs={[{ label: policy.title }]}
      />

      <div className="shell gutter py-10 sm:py-14">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs text-ink-muted">Last updated {policy.updated}</p>

          {policy.sections.map((section) => (
            <section key={section.heading} className="mt-8">
              <h2 className="font-display text-2xl leading-tight font-semibold text-plum-900">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="mt-3 text-[1.0625rem] leading-[1.75] text-plum-800"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <nav className="mt-12 border-t border-ivory-300 pt-6">
            <h2 className="text-[0.6875rem] font-semibold tracking-[0.14em] text-ink-muted uppercase">
              Other policies
            </h2>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {policies
                .filter((p) => p.slug !== policy.slug)
                .map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/policies/${p.slug}`}
                      className="text-sm font-medium text-gold-700 underline-offset-4 hover:underline"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
