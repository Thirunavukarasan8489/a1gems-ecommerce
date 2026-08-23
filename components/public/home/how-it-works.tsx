import { SectionHeading } from "@/components/public/ui/section-heading";
import { howItWorks } from "@/lib/data/content";

export function HowItWorks() {
  return (
    <section className="shell gutter py-12 sm:py-16 lg:py-20">
      <SectionHeading
        eyebrow="How it works"
        title="From enquiry to your hand"
        body="Four steps, and you can stop at any of them without pressure."
        align="center"
      />

      <ol className="relative mt-9 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-5">
        {/* The connecting rule only makes sense once the steps sit in a row. */}
        <span
          aria-hidden
          className="absolute top-6 right-8 left-8 hidden h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent lg:block"
        />

        {howItWorks.map((step) => (
          <li key={step.step} className="relative text-center lg:text-left">
            <span className="relative z-10 mx-auto grid size-12 place-items-center rounded-full border border-gold-500/25 bg-ivory-100 font-display text-base font-semibold text-gold-700 lg:mx-0">
              {step.step}
            </span>
            <h3 className="mt-4 text-base font-semibold text-plum-900">
              {step.title}
            </h3>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-muted">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
