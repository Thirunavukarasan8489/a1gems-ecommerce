"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BadgeCheck, MessageCircle, Sparkles } from "lucide-react";
import { buttonStyles } from "@/components/public/ui/button";
import { GemImage } from "@/components/public/ui/gem-image";
import { OrnamentalBg } from "@/components/public/ui/ornamental-bg";
import { cn, whatsappLink } from "@/lib/utils";

/**
 * Premium Hero Slider replacing the static text section.
 * Features auto-playing high-impact slides, category highlights, GIA/IGI trust badge,
 * smooth sliding transitions, and interactive controls.
 */
const heroSlides = [
  {
    badge: "Certified Unheated Gemstones",
    title: "Stones you can verify, not just admire.",
    subtitle: "Every gemstone carries an independent laboratory report. Verify your certificate number before you spend a rupee.",
    ctaText: "Explore Collection",
    ctaHref: "/products",
    secondaryCtaText: "Free Consultation",
    secondaryCtaHref: "/contact",
    gemColor: "#10b481",
    bgGradient: "from-plum-950 via-plum-900 to-emerald-950/80",
    glowColor: "#10b481",
  },
  {
    badge: "Ratnapura, Sri Lanka",
    title: "Unheated Ceylon Sapphires",
    subtitle: "Fresh parcel of royal blue and cornflower sapphires, each with an IGI report confirming zero thermal treatment.",
    ctaText: "Shop Sapphires",
    ctaHref: "/products?category=blue-sapphire",
    secondaryCtaText: "WhatsApp Gemmologist",
    secondaryCtaHref: "/contact",
    gemColor: "#1f4fd8",
    bgGradient: "from-plum-950 via-[#131f42] to-[#1f4fd8]/30",
    glowColor: "#1f4fd8",
  },
  {
    badge: "Mogok, Myanmar",
    title: "Certified Pigeon-Blood Rubies",
    subtitle: "Hand-selected unheated rubies displaying deep crimson saturation and remarkable light return.",
    ctaText: "Shop Rubies",
    ctaHref: "/products?category=ruby",
    secondaryCtaText: "Request Inspection",
    secondaryCtaHref: "/contact",
    gemColor: "#c81e4a",
    bgGradient: "from-plum-950 via-[#360e18] to-[#c81e4a]/30",
    glowColor: "#c81e4a",
  },
  {
    badge: "Panjshir & Zambia",
    title: "Natural Untreated Emeralds",
    subtitle: "Vivid green emeralds with exceptional clarity and origin verification from world-renowned mines.",
    ctaText: "Shop Emeralds",
    ctaHref: "/products?category=emerald",
    secondaryCtaText: "View Vault",
    secondaryCtaHref: "/products?purchase=enquiry",
    gemColor: "#33ce99",
    bgGradient: "from-plum-950 via-[#0a291f] to-[#10b481]/30",
    glowColor: "#33ce99",
  },
];

const AUTOPLAY_MS = 6000;

export function HeroSlider({ categories }: { categories?: any[] }) {
  const [active, setActive] = React.useState(0);
  const trackRef = React.useRef<HTMLUListElement>(null);
  const pausedRef = React.useRef(false);

  const goTo = React.useCallback((index: number) => {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (!track || !slide) return;
    track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
  }, []);

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { root: track, threshold: 0.6 },
    );

    for (const child of Array.from(track.children)) observer.observe(child);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      if (pausedRef.current) return;
      goTo((active + 1) % heroSlides.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(interval);
  }, [active, goTo]);

  return (
    <section className="relative w-full max-w-full overflow-hidden bg-plum-950 text-ivory-100">
      <OrnamentalBg glowPosition="50% 20%" />

      <div
        className="group relative w-full overflow-hidden"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
        onTouchStart={() => { pausedRef.current = true; }}
        onTouchEnd={() => { pausedRef.current = false; }}
      >
        <ul
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
        >
          {heroSlides.map((slide, i) => (
            <li
              key={slide.title}
              data-index={i}
              className="w-full shrink-0 snap-center"
            >
              <div
                className={cn(
                  "relative flex min-h-[480px] sm:min-h-[540px] lg:min-h-[580px] flex-col justify-center bg-gradient-to-br p-6 sm:p-12 lg:p-16",
                  slide.bgGradient
                )}
              >
                {/* Glow Backdrop Accent */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-24 right-1/4 size-96 rounded-full opacity-30 blur-3xl"
                  style={{ background: slide.glowColor }}
                />

                <div className="shell gutter relative z-10 grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                  {/* Text Content */}
                  <div className="animate-rise max-w-2xl">
                    <p className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1.5 text-[0.6875rem] font-semibold tracking-[0.14em] text-gold-300 uppercase">
                      <BadgeCheck size={14} className="text-gold-400" />
                      <span>{slide.badge}</span>
                    </p>

                    <h1 className="mt-5 text-3xl leading-[1.1] font-semibold sm:text-5xl lg:text-6xl text-ivory-100">
                      {slide.title}
                    </h1>

                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-plum-200 sm:text-base lg:text-lg">
                      {slide.subtitle}
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3">
                      <Link
                        href={slide.ctaHref}
                        className={buttonStyles({ size: "lg", className: "sm:w-auto font-semibold shadow-lg" })}
                      >
                        {slide.ctaText}
                        <ArrowRight size={18} />
                      </Link>

                      <a
                        href={whatsappLink(
                          null,
                          "Hi A1 Gems, I would like to consult a gemmologist."
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonStyles({
                          variant: "outline",
                          size: "lg",
                          className:
                            "border-ivory-100/25 bg-white/10 text-ivory-100 hover:border-ivory-100/50 hover:bg-white/15 sm:w-auto",
                        })}
                      >
                        <MessageCircle size={18} />
                        {slide.secondaryCtaText}
                      </a>
                    </div>
                  </div>

                  {/* Gemstone Graphic / Visual Preview */}
                  <div className="hidden lg:flex justify-center items-center relative">
                    <div className="relative size-72 lg:size-80 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gold-500/30">
                      <GemImage
                        color={slide.gemColor}
                        seed={i * 7 + 1}
                        framed
                        className="aspect-square w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-plum-950/80 via-transparent to-transparent p-4 flex flex-col justify-end">
                        <span className="inline-flex items-center gap-1 text-[0.6875rem] font-semibold tracking-wider text-gold-300 uppercase">
                          <Sparkles size={12} /> 100% Certified Natural
                        </span>
                        <p className="text-sm font-semibold text-ivory-100 mt-0.5">
                          {slide.badge}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Carousel Navigation Buttons */}
        <button
          type="button"
          onClick={() => goTo((active - 1 + heroSlides.length) % heroSlides.length)}
          aria-label="Previous slide"
          className="absolute top-1/2 left-4 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-plum-950/60 text-ivory-100 backdrop-blur-md transition-all duration-200 hover:bg-plum-950/80 sm:flex"
        >
          <ArrowLeft size={20} />
        </button>

        <button
          type="button"
          onClick={() => goTo((active + 1) % heroSlides.length)}
          aria-label="Next slide"
          className="absolute top-1/2 right-4 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-plum-950/60 text-ivory-100 backdrop-blur-md transition-all duration-200 hover:bg-plum-950/80 sm:flex"
        >
          <ArrowRight size={20} />
        </button>

        {/* Carousel Dots */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={active === i}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                active === i ? "w-8 bg-gold-400" : "w-2 bg-white/40 hover:bg-white/60"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
