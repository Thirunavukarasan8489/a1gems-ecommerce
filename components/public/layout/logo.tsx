import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="A1 Gems — home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span className="relative grid size-9 shrink-0 place-items-center">
        <span
          aria-hidden
          className="absolute inset-0 rotate-45 rounded-[0.5rem] bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 shadow-gold transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:rotate-[135deg]"
        />
        <span className="relative font-display text-sm font-bold text-plum-950">
          A1
        </span>
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-lg font-semibold tracking-tight",
            onDark ? "text-ivory-100" : "text-plum-900",
          )}
        >
          A1 Gems
        </span>
        <span
          className={cn(
            "mt-0.5 text-[0.5625rem] font-semibold tracking-[0.22em] uppercase",
            onDark ? "text-gold-400" : "text-gold-700",
          )}
        >
          Certified
        </span>
      </span>
    </Link>
  );
}
