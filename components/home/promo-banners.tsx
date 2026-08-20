import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";

/**
 * §27 Banner Flow — banner type "Promotional". These become CMS-scheduled
 * documents in Phase 14; the layout below is what the admin form will fill.
 */
const banners = [
  {
    eyebrow: "This month",
    title: "Unheated Ceylon sapphires",
    body: "A new parcel from Ratnapura, every stone with an IGI report confirming no heat.",
    cta: "See the parcel",
    href: "/collections/blue-sapphire",
    from: "#1f4fd8",
    to: "#2f2040",
  },
  {
    eyebrow: "Made to size",
    title: "Crystal bracelets under ₹2,500",
    body: "Hand-strung to your wrist measurement and dispatched within 48 hours.",
    cta: "Shop bracelets",
    href: "/collections/bracelets",
    from: "#8b5cf6",
    to: "#1e1329",
  },
];

export function PromoBanners() {
  return (
    <section className="shell gutter pb-2 sm:pb-4">
      <ul className="grid gap-3 sm:gap-4 lg:grid-cols-2 lg:gap-5">
        {banners.map((banner) => (
          <li key={banner.href}>
            <Link
              href={banner.href}
              className="group relative flex min-h-52 flex-col justify-end overflow-hidden rounded-2xl p-5 text-ivory-100 sm:min-h-60 sm:p-7"
              style={{
                background: `linear-gradient(135deg, ${banner.from} 0%, ${banner.to} 72%)`,
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-16 -right-12 size-52 rounded-full opacity-40 blur-2xl transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-125"
                style={{ background: banner.from }}
              />

              <div className="relative">
                <p className="text-[0.625rem] font-semibold tracking-[0.18em] text-gold-300 uppercase">
                  {banner.eyebrow}
                </p>
                <h3 className="mt-2 max-w-xs text-xl leading-tight font-semibold sm:text-2xl">
                  {banner.title}
                </h3>
                <p className="mt-2 max-w-sm text-[0.8125rem] leading-relaxed text-white/75 sm:text-sm">
                  {banner.body}
                </p>
                <span
                  className={buttonStyles({
                    variant: "outline",
                    size: "sm",
                    className:
                      "mt-5 border-white/25 bg-white/10 text-ivory-100 group-hover:border-white/50 group-hover:bg-white/18",
                  })}
                >
                  {banner.cta}
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
  );
}
