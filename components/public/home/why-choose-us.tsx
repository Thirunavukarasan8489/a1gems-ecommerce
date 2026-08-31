import { OrnamentalBg } from "@/components/public/ui/ornamental-bg";
import { SectionHeading } from "@/components/public/ui/section-heading";
import { getContentPage } from "@/lib/services/content-service";

export async function WhyChooseUs() {
  const whyChooseUs = await getContentPage("why-choose-us");
  if (!whyChooseUs) return null;
  return (
    <section className="relative overflow-hidden bg-plum-900 text-ivory-100">
      <OrnamentalBg glowPosition="88% 0%" />

      <div className="shell gutter relative py-14 sm:py-18 lg:py-22">
        <SectionHeading
          eyebrow="Why A1 Gems"
          title="Four things we do differently"
          body="The gemstone trade runs on information asymmetry. We would rather not."
          onDark
        />

        <ol className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:mt-12 lg:gap-y-10">
          {whyChooseUs.map((item: any, i: number) => (
            <li key={item.title} className="flex gap-4">
              <span className="font-display text-2xl leading-none font-semibold text-gold-500/60 tabular-nums sm:text-3xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 border-l border-white/12 pl-4">
                <h3 className="text-base font-semibold text-ivory-100 sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-plum-200">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
