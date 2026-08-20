"use client";

import * as React from "react";
import { GemImage } from "@/components/public/ui/gem-image";
import { cn } from "@/lib/utils";

/**
 * Swipe on mobile, thumbnails on desktop. Native scroll-snap does the paging so
 * the gesture stays at 60fps and works without JavaScript if hydration is slow;
 * an IntersectionObserver only keeps the dots and thumbnails in sync.
 */
export function ProductGallery({
  color,
  count,
  name,
}: {
  color: string;
  count: number;
  name: string;
}) {
  const [active, setActive] = React.useState(0);
  const trackRef = React.useRef<HTMLUListElement>(null);
  const slides = Array.from({ length: Math.max(1, count) }, (_, i) => i);

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

  const goTo = (index: number) => {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (!track || !slide) return;

    // Scroll the track itself, not scrollIntoView — scrollIntoView walks
    // every scrollable ancestor including the page, which can yank the whole
    // page vertically just to reveal a horizontally-scrolling gallery.
    track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
  };

  return (
    <div>
      <ul
        ref={trackRef}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory overflow-x-auto sm:mx-0 sm:rounded-2xl"
      >
        {slides.map((i) => (
          <li
            key={i}
            data-index={i}
            className="w-full shrink-0 snap-center px-4 sm:px-0"
          >
            <GemImage
              color={color}
              seed={i * 7 + 3}
              className="aspect-square w-full sm:rounded-2xl"
            />
            <span className="sr-only">
              {name} — view {i + 1} of {slides.length}
            </span>
          </li>
        ))}
      </ul>

      {slides.length > 1 && (
        <>
          <div className="mt-3 flex justify-center gap-1.5 sm:hidden">
            {slides.map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`View image ${i + 1}`}
                aria-current={active === i}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  active === i ? "w-6 bg-gold-500" : "w-1.5 bg-plum-300",
                )}
              />
            ))}
          </div>

          <ul className="mt-3 hidden gap-2.5 sm:grid sm:grid-cols-5">
            {slides.map((i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`View image ${i + 1}`}
                  className={cn(
                    "block w-full overflow-hidden rounded-lg ring-2 transition-[--tw-ring-color] duration-200",
                    active === i ? "ring-gold-500" : "ring-transparent hover:ring-plum-300",
                  )}
                >
                  <GemImage
                    color={color}
                    seed={i * 7 + 3}
                    className="aspect-square w-full"
                  />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
