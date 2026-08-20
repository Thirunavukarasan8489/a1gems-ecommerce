"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, MessageCircle, Phone, X } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { buttonStyles } from "@/components/ui/button";
import { categories } from "@/lib/data/categories";
import { business, primaryNav, secondaryNav, whatsappLink } from "@/lib/data/nav";

export function MobileDrawer() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const panelRef = React.useRef<HTMLDivElement>(null);

  // Close on route change so the drawer never survives a navigation. Adjusted
  // during render rather than in an effect, so the drawer is already gone on
  // the first frame of the new route instead of flashing for one paint.
  const [renderedPath, setRenderedPath] = React.useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setOpen(false);
  }

  React.useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    // Lock the page behind the drawer without losing scroll position.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="grid size-10 place-items-center rounded-full text-plum-800 transition-colors hover:bg-plum-900/6 lg:hidden"
      >
        <Menu size={22} strokeWidth={2} />
      </button>

      {open && (
        <div className="fixed inset-0 z-60 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="absolute inset-0 animate-[rise_.2s_ease-out_both] bg-plum-950/55 backdrop-blur-sm"
          />

          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            tabIndex={-1}
            className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm translate-x-0 flex-col bg-ivory-100 shadow-lg outline-none"
            style={{ animation: "drawer-in .3s var(--ease-out-soft) both" }}
          >
            <div className="flex items-center justify-between border-b border-ivory-300 px-4 py-3">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-10 place-items-center rounded-full text-plum-700 hover:bg-plum-900/6"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-5">
              <p className="mb-3 text-[0.625rem] font-semibold tracking-[0.18em] text-gold-700 uppercase">
                Shop by stone
              </p>
              <ul className="mb-7 grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/collections/${cat.slug}`}
                      className="flex h-full items-center gap-2.5 rounded-xl border border-ivory-300 bg-white p-3 text-[0.8125rem] leading-tight font-medium text-plum-800 active:scale-[0.98]"
                    >
                      <span
                        aria-hidden
                        className="size-6 shrink-0 rotate-45 rounded-[0.3rem]"
                        style={{
                          background: `linear-gradient(135deg, ${cat.gemColor}, color-mix(in oklab, ${cat.gemColor} 45%, #130b1b))`,
                        }}
                      />
                      {cat.name.split(" / ")[0]}
                    </Link>
                  </li>
                ))}
              </ul>

              <ul className="mb-7 space-y-0.5">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center justify-between rounded-xl px-3 py-3.5 font-display text-xl font-medium text-plum-900 active:bg-plum-900/5"
                    >
                      {item.label}
                      <ArrowRight size={17} className="text-plum-300" />
                    </Link>
                  </li>
                ))}
              </ul>

              <ul className="flex flex-wrap gap-x-5 gap-y-2 border-t border-ivory-300 pt-5">
                {secondaryNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-ink-muted underline-offset-4 hover:text-plum-900 hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="safe-b border-t border-ivory-300 bg-white px-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={business.phoneHref}
                  className={buttonStyles({ variant: "outline", size: "sm" })}
                >
                  <Phone size={16} />
                  Call us
                </a>
                <a
                  href={whatsappLink("Hi A1 Gems, I have a question.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonStyles({ variant: "whatsapp", size: "sm" })}
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              </div>
              <p className="mt-3 text-center text-xs text-ink-muted">
                {business.hours}
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes drawer-in {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
