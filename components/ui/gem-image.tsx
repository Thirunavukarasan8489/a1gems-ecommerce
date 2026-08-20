import { cn } from "@/lib/utils";

/**
 * Placeholder artwork for products, categories and guides.
 *
 * Real photography goes through Cloudinary in Phase 16 (§29 Media Flow). Until
 * then this renders a faceted-gem gradient derived from the item's own colour,
 * so listings look deliberate rather than like broken images. Swap the internals
 * for <Image> when media lands — the call sites keep the same props.
 */
export function GemImage({
  color,
  className,
  seed = 0,
  vignette = true,
}: {
  color: string;
  className?: string;
  /** Rotates the facet pattern so a gallery of one stone still varies. */
  seed?: number;
  vignette?: boolean;
}) {
  const facetAngle = 200 + ((seed * 47) % 160);
  const lightX = 24 + ((seed * 13) % 34);

  return (
    <div
      aria-hidden
      className={cn("relative overflow-hidden bg-plum-950", className)}
    >
      {/* Body colour, brightest where the light hits. */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(115% 95% at ${lightX}% 18%, ${color} 0%, ${color} 28%, color-mix(in oklab, ${color} 55%, #130b1b) 62%, #17101f 100%)`,
        }}
      />

      {/* Facet planes. */}
      <div
        className="absolute inset-0 opacity-35 mix-blend-overlay"
        style={{
          background: `conic-gradient(from ${facetAngle}deg at 50% 44%, transparent 0deg, rgba(255,255,255,.75) 38deg, transparent 88deg, rgba(255,255,255,.45) 148deg, transparent 206deg, rgba(255,255,255,.65) 276deg, transparent 338deg)`,
        }}
      />

      {/* Table facet + specular glint. */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(38% 30% at ${lightX + 6}% 24%, rgba(255,255,255,.55) 0%, transparent 70%)`,
        }}
      />

      {vignette && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(75% 65% at 50% 45%, transparent 40%, rgba(19,11,27,.55) 100%)",
          }}
        />
      )}
    </div>
  );
}
