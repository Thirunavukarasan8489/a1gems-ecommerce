import { SectionHeading } from "@/components/ui/section-heading";
import { whyChooseUs } from "@/lib/data/content";

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-plum-900 text-ivory-100">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(50% 60% at 88% 0%, rgba(201,154,38,.22), transparent 70%)",
        }}
      />

      <div className="shell gutter relative py-14 sm:py-18 lg:py-22">
        <SectionHeading
          eyebrow="Why A1 Gems"
          title="Four things we do differently"
          body="The gemstone trade runs on information asymmetry. We would rather not."
          onDark
        />

        <ol className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:mt-12 lg:gap-y-10">
          {whyChooseUs.map((item, i) => (
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
