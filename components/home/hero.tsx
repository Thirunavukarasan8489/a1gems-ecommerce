import Link from "next/link";
import { ArrowRight, BadgeCheck, MessageCircle } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { GemImage } from "@/components/ui/gem-image";
import { categories } from "@/lib/data/categories";
import { stats } from "@/lib/data/content";
import { whatsappLink } from "@/lib/data/nav";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-plum-950 text-ivory-100">
      {/* Gem-coloured light bleeding through the velvet. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 45% at 15% 0%, rgba(31,79,216,.38), transparent 70%)," +
            "radial-gradient(55% 40% at 90% 10%, rgba(200,30,74,.32), transparent 70%)," +
            "radial-gradient(70% 50% at 60% 100%, rgba(201,154,38,.24), transparent 70%)",
        }}
      />

      <div className="shell gutter relative py-14 sm:py-20 lg:grid lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14 lg:py-24">
        <div className="animate-rise">
          <p className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1.5 text-[0.6875rem] font-semibold tracking-[0.14em] uppercase">
            <BadgeCheck size={14} className="text-gold-400" />
            <span className="text-foil">GIA · IGI · GRS · SSEF</span>
          </p>

          <h1 className="mt-6 text-[2.5rem] leading-[1.06] font-semibold sm:text-6xl lg:text-[4.25rem]">
            Stones you can
            <br />
            <span className="text-foil">verify</span>, not just admire.
          </h1>

          <p className="mt-5 max-w-lg text-[0.9375rem] leading-relaxed text-plum-200 sm:text-lg">
            Every gemstone we sell carries an independent laboratory report, and
            every treatment is disclosed on the page. You get the certificate
            number before you pay — verify it yourself.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className={buttonStyles({ size: "lg", className: "sm:w-auto" })}
            >
              Explore the collection
              <ArrowRight size={18} />
            </Link>
            <a
              href={whatsappLink(
                "Hi A1 Gems, I would like a free gemmologist consultation.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles({
                variant: "outline",
                size: "lg",
                className:
                  "border-ivory-100/25 bg-white/8 text-ivory-100 hover:border-ivory-100/50 hover:bg-white/14 sm:w-auto",
              })}
            >
              <MessageCircle size={18} />
              Free consultation
            </a>
          </div>

          <dl className="mt-10 grid grid-cols-4 gap-3 border-t border-white/10 pt-7">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-xl font-semibold text-gold-300 tabular-nums sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-[0.625rem] leading-tight text-plum-300 sm:text-xs">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Gem cluster. Mobile gets a compact three-up strip; desktop gets the
            staggered arrangement with room to breathe. */}
        <div className="mt-12 lg:mt-0">
          <ul className="grid grid-cols-3 gap-3 lg:gap-5">
            {categories.slice(0, 3).map((cat, i) => (
              <li
                key={cat.slug}
                className="animate-rise"
                style={{
                  animationDelay: `${120 + i * 90}ms`,
                  transform: `translateY(${i === 1 ? "-1.25rem" : "0"})`,
                }}
              >
                <Link
                  href={`/collections/${cat.slug}`}
                  className="group block overflow-hidden rounded-2xl ring-1 ring-white/12 transition-shadow duration-300 hover:ring-gold-400/50"
                >
                  <GemImage
                    color={cat.gemColor}
                    seed={i * 3}
                    className="aspect-3/4 w-full transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-105"
                  />
                  <p className="bg-white/6 px-2 py-2.5 text-center text-[0.625rem] leading-tight font-semibold tracking-wide text-ivory-100 uppercase backdrop-blur-sm sm:text-xs">
                    {cat.name.split(" / ")[0]}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
