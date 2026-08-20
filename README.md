# A1 Gems

Mobile-first storefront for a certified natural gemstone business, built on
Next.js 16 (App Router) + React 19 + Tailwind CSS v4.

The full product specification lives in `A1 Gems - Feature.pdf` — 18 modules and
101 screens across a public website and an admin panel. This repository
currently implements the public storefront.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

---

## Design system — "Velvet & Gold"

All tokens live in [`app/globals.css`](app/globals.css) under `@theme`, so every
colour, radius, shadow and font is a single source of truth.

| Role | Token | Why |
| --- | --- | --- |
| Brand neutral | `plum-50…950` (`#130b1b` → `#faf7fb`) | The velvet interior of a jewellery box. Warm-neutral, so gemstone colours pop against it. |
| Primary action | `gold-500` `#c99a26` | In the Indian jewellery market gold reads as value and trust. Used sparingly so it stays precious. |
| Secondary / success | `emerald-700` `#067354` | Literally "the gem". Also carries in-stock and certification meaning. |
| Page surface | `ivory-100` `#fbf8f3` | A warm off-white rather than `#fff` — printed-catalogue feel, easier on the eye on mobile OLED. |

Type: **Playfair Display** for headings (high-contrast serif, reads as
jewellery), **Plus Jakarta Sans** for UI (wide apertures, holds up at small
mobile sizes). Both self-hosted via `next/font`.

### Mobile-first rules baked into the tokens

- Every interactive control is **≥44px tall** (`sizes` in `components/ui/button.tsx`).
- Form controls are locked to **≥16px** so iOS Safari never zooms on focus.
- A fixed **bottom tab bar** carries the five highest-intent destinations;
  `pb-tabbar` and `safe-b` utilities respect the iOS home indicator.
- Product rows are **swipeable rails** on phones and grids from `lg` up, with a
  deliberate half-card peek at the right edge to signal scrollability.
- Filters open in a **bottom sheet** on mobile, an always-visible sidebar on desktop.
- `prefers-reduced-motion` disables every animation.

---

## Structure

```
app/
  layout.tsx              root: fonts, metadata, viewport, CartProvider
  (public)/               storefront route group (header / footer / tab bar)
    page.tsx              homepage — all 16 sections from spec §7
    products/             listing (URL-driven filters + sort) and detail
    collections/          category index and per-category listing
    cart/  search/  guides/  about/  contact/  faqs/
    testimonials/  track-order/  checkout/  policies/[slug]/
components/
  ui/  layout/  home/  product/  cart/  lead/
lib/
  types.ts                domain model (mirrors the admin field spec)
  filters.ts              listing filter + sort logic
  data/                   mock catalogue and CMS content
```

`lib/data/` is a stand-in for MongoDB. The types match the shapes the admin
forms will write, so switching to a real data source is a change of source, not
of shape.

---

## Spec coverage

**Done** — public website (§6), homepage sections (§7), product listing and
detail (§8), purchase types `BUY_ONLY` / `ENQUIRY_ONLY` / `BUY_AND_ENQUIRE`
(§9), enquiry form with the full lead field set (§10), temporary cart with price
snapshots (§11), inventory display via `available = stock − reserved` (§13),
content pages and guides (§28), SEO metadata per route (§30).

**Not yet built** — checkout, payments, orders, shipping, returns/refunds
(§12, §14–20) and the entire admin panel (§22–32). `/checkout` is an explicit
placeholder that lists the steps it will implement and offers a WhatsApp
fallback so the cart is not a dead end.

Known stand-ins, each marked with a comment at the call site:

- `components/ui/gem-image.tsx` renders a faceted-gem gradient instead of
  photography until Cloudinary media lands (§29).
- `components/lead/enquiry-form.tsx` logs the payload instead of POSTing to the
  leads service (Phase 06).
- `components/cart/cart-provider.tsx` persists to `localStorage` instead of the
  cookie-keyed MongoDB temporary cart (§11.1).
