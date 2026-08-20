import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Built on native <details>/<summary> so FAQs stay expandable with zero
 * JavaScript, remain accessible by default, and are findable by in-page search.
 */
export function Accordion({
  items,
  className,
  defaultOpenIndex,
}: {
  items: { q: string; a: string }[];
  className?: string;
  defaultOpenIndex?: number;
}) {
  return (
    <div
      className={cn(
        "divide-y divide-ivory-300 overflow-hidden rounded-xl border border-ivory-300 bg-white",
        className,
      )}
    >
      {items.map((item, i) => (
        <details
          key={item.q}
          open={i === defaultOpenIndex}
          className="group px-4 sm:px-6"
        >
          <summary className="flex cursor-pointer list-none items-start gap-4 py-4 [&::-webkit-details-marker]:hidden">
            <h3 className="flex-1 text-[0.9375rem] leading-snug font-semibold text-plum-900 sm:text-base">
              {item.q}
            </h3>
            <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-ivory-200 text-plum-700 transition-transform duration-300 ease-[var(--ease-out-soft)] group-open:rotate-45 group-open:bg-gold-500 group-open:text-plum-950">
              <Plus size={16} strokeWidth={2.5} />
            </span>
          </summary>
          <p className="pb-5 text-[0.9375rem] leading-relaxed text-ink-muted">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
