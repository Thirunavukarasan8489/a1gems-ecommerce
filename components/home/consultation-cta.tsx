import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { business, whatsappLink } from "@/lib/data/nav";

export function ConsultationCta() {
  return (
    <section className="shell gutter py-4">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gold-500 via-gold-400 to-gold-600 p-6 sm:p-10 lg:p-14">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-16 size-72 rounded-full bg-white/25 blur-3xl"
        />

        <div className="relative lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-xl">
            <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-plum-900/70 uppercase">
              Free consultation
            </p>
            <h2 className="mt-3 text-[1.75rem] leading-tight font-semibold text-plum-950 sm:text-4xl">
              Not sure which stone is right for you?
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-plum-900/80">
              Tell us your budget and what you are looking for. A gemmologist
              will come back within a few hours — and will happily tell you when
              a cheaper stone is the better buy.
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-3 lg:mt-0 lg:w-64 lg:shrink-0">
            <a
              href={whatsappLink(
                "Hi A1 Gems, I would like a free gemmologist consultation.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles({ variant: "dark", size: "lg", full: true })}
            >
              <MessageCircle size={18} />
              WhatsApp us
            </a>
            <a
              href={business.phoneHref}
              className={buttonStyles({
                variant: "outline",
                size: "lg",
                full: true,
                className:
                  "border-plum-950/25 bg-white/40 text-plum-950 hover:bg-white/70",
              })}
            >
              <Phone size={18} />
              {business.phone}
            </a>
            <Link
              href="/contact"
              className="text-center text-[0.8125rem] font-medium text-plum-900/70 underline underline-offset-4 hover:text-plum-950"
            >
              or send an enquiry form
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
