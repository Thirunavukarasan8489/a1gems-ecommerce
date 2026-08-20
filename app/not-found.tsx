import Link from "next/link";
import { buttonStyles } from "@/components/public/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex flex-1 items-center overflow-hidden bg-plum-950 text-ivory-100">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(55% 55% at 25% 10%, rgba(31,79,216,.32), transparent 70%)," +
            "radial-gradient(50% 50% at 85% 90%, rgba(201,154,38,.28), transparent 70%)",
        }}
      />

      <div className="shell gutter relative py-24 text-center">
        <p className="font-display text-6xl font-semibold sm:text-8xl">
          <span className="text-foil">404</span>
        </p>
        <h1 className="mt-5 text-[1.75rem] leading-tight font-semibold sm:text-4xl">
          This page is not in the vault
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-plum-200">
          The link may be out of date, or the stone may already have found an
          owner. Try the catalogue instead.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/products" className={buttonStyles({ size: "lg" })}>
            Browse gemstones
          </Link>
          <Link
            href="/"
            className={buttonStyles({
              variant: "outline",
              size: "lg",
              className:
                "border-ivory-100/25 bg-white/8 text-ivory-100 hover:border-ivory-100/50 hover:bg-white/14",
            })}
          >
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
