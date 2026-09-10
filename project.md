# A1 Gems — Platform Overview, System Architecture & Full Scope Specification

> **Comprehensive Platform Reference Document**  
> **Repository:** `a1gems-ecommerce`  
> **Version:** 1.0.0 (Production Architecture)  
> **Framework:** Next.js 16.3+ (App Router) · React 19 · MongoDB (Mongoose) · Tailwind CSS v4  

---

## 1. Executive Project Overview

**A1 Gems** is an enterprise-grade, omnichannel gemstone and fine jewellery eCommerce and CRM platform tailored specifically for the Indian and global luxury gemstone trade. It combines high-touch astrological and certified gemstone consultations with instant digital commerce.

The codebase is engineered as **two visually distinct applications sharing a single unified backend**:
1. **Public Storefront (`(public)` Route Group):**  
   An editorial, conversion-focused luxury experience built with an authentic Vedic & craftsman aesthetic using the **Plum, Gold, and Emerald** brand palette. It offers seamless product discovery, astrological Rashi (Zodiac) matching, lab certificate verification (GIA, IGI, GRS), temporary guest carts, and dual-mode Personal and GST-registered Business checkout.
2. **Admin Panel (`(admin)` Route Group):**  
   A high-density, data-rich operational management portal modeled after modern Point-of-Sale (POS) and ERP admin suites. It utilizes a **neutral, functional slate/ivory palette** to ensure operators never confuse administrative operations with public browsing. It houses end-to-end Lead CRM, Order Processing, Catalogue Management, Inventory Reservations, CMS, and RBAC governance.

---

## 2. Core Architectural Principles

- **Single Next.js App Router Monolith:** Route groups `app/(public)` and `app/(admin)` cleanly segment customer and operator UI without sharing visual components.
- **Three Product Purchase Modes:** Every piece in the catalogue can be sold as:
  - `BUY_ONLY`: Standard digital cart checkout.
  - `ENQUIRY_ONLY`: High-value, one-of-a-kind bespoke piece routing into the Lead CRM pipeline.
  - `BUY_AND_ENQUIRE`: Customer choice between instant checkout or speaking with a certified gemmologist.
- **ACID Transaction Integrity:** All multi-entity state transitions (Order Placement + Stock Reservation, Payment Confirmation + Stock Finalization, Cancellation + Restock) are executed inside **MongoDB Transactions**.
- **Ephemeral Guest Carts:** Unauthenticated visitors can maintain persistent carts via a temporary cart stored in MongoDB with **TTL index automatic expiry** and localStorage synchronization.
- **Webhook-Driven Payment Truth:** Orders are confirmed exclusively through cryptographically verified gateway webhooks (Razorpay / Cashfree), never trusting client-side responses.
- **Zero Hardcoded Business Constants:** Shipping rates, free shipping thresholds, GST slabs (3%), and COD eligibility ceilings are dynamically controlled via **Admin Settings**.
- **Next.js 16.3+ Proxy Convention:** Middleware authentication and route guards reside in `proxy.ts` (deprecating legacy `middleware.ts`).

---

## 3. Technology Stack

| Layer | Technology | Purpose & Implementation Details |
| :--- | :--- | :--- |
| **Framework** | Next.js 16.3.1 (App Router) | Server Components (RSC), Server Actions, Route Handlers |
| **Runtime / UI** | React 19.2.8 | Latest concurrent features, server transitions, useSyncExternalStore |
| **Language** | TypeScript 5 | Strict typing, ambient Next.js 15+ Async PageProps & LayoutProps |
| **Database** | MongoDB & Mongoose 9.9.3 | Schema validation, TTL cart expiry, multi-document ACID transactions |
| **Authentication** | NextAuth.js 4.24.15 (JWT) | Role-Based Access Control (RBAC): `SUPER_ADMIN`, `CONTENT_MANAGER`, `LEAD_MANAGER`, `CUSTOMER` |
| **Styling** | Tailwind CSS v4 & Vanilla CSS | Dynamic CSS variables, glassmorphic dock, custom keyframes (`shine-sweep`, `twinkle`) |
| **Typography** | Google Fonts | *Cormorant Garamond* (Serif display), *Hind* (UI Latin/Devanagari), *Noto Sans Devanagari* |
| **Validation** | Zod 4.4.3 | Rigorous server-side boundary validation for all Server Actions and APIs |
| **Payments** | Razorpay Node SDK & Webhooks | UPI, Credit/Debit Cards, Net Banking, COD verification, Bank Wire |
| **Media** | Cloudinary v2 | Image/video transformation, asset metadata persistence in MongoDB |
| **Notifications** | Nodemailer & react-hot-toast | Transactional email dispatches, toast feedback for mutations |

---

## 4. Design System & Brand Palette

### 4.1 Public Storefront (Luxury Vedic Aesthetic)
- **Plum (Brand Neutral / Editorial Canvas):**
  - Light mode backgrounds: `--color-plum-50` (`#faf7fb`) to `--color-plum-100` (`#f3eef6`)
  - Deep luxury contrast / Dark mode: `--color-plum-900` (`#1e1329`) to `--color-plum-950` (`#130b1b`)
- **Gold (Primary Accent / Conversion Focus):**
  - Primary CTAs, price typography, certification seals: `--color-gold-500` (`#c99a26`) / `--color-gold-400` (`#ddb63a`)
  - Hover / Active states: `--color-gold-600` (`#a87a1c`)
- **Emerald (Secondary Accent / Vedic Prosperity):**
  - In-stock badges, positive astrological graha signals, success feedback: `--color-emerald-500` (`#10b481`)
- **Mobile Bottom Navigation Dock (`BottomNav`):**
  - Thumb-reachable floating glassmorphic dock (`z-[100]`) with spring-physics pill indicator, safe-area-inset padding, and full nested route matching.

### 4.2 Admin Panel (POS & Inventory Control)
- **Neutral Administrative Canvas:** High contrast, data-dense layout (`bg-[#f8f5f0]` canvas, `bg-plum-950` dark sidebar).
- **Clean Gray Borders:** Strict `border-gray-200 dark:border-plum-800` borders without distracting gold embellishments.
- **Active Navigation Indicator:** Emerald vertical accent bar (`border-l-3 border-emerald-500 bg-plum-800`).

---

## 5. End-to-End Customer Journeys

```
VISITOR
  │
  ├──► [Product Discovery]
  │       ├── Category Filters (Ruby, Blue Sapphire, Emerald, Pearl, Yellow Sapphire, Coral, etc.)
  │       ├── Vedic Astrology Rashi Finder (Mesh to Meen, Graha planetary matching)
  │       └── Search & Faceted Navigation (Carat, Ratti, Cut, Origin, Certification)
  │
  ├──► [Enquiry Flow (High-Touch)]
  │       └── Product / Custom Stone ──► "Enquire Now" Modal ──► Lead Captured (Status: NEW)
  │             ──► Admin Notification ──► CRM Pipeline (Contacted, Follow-Up, Qualified, Converted)
  │
  └──► [Commerce Flow (Self-Serve)]
          └── "Add to Cart" ──► Temporary Cart (Cookie + TTL DB) ──► Validation
                ├── Guest Checkout (Name, Phone, Email) OR Registered Customer
                ├── Personal Path: Shipping Address ──► Billing Address (Same/Different)
                ├── Business Path: Business Details ──► GST Registered? (Yes: GSTIN + Legal Name / No: Regular)
                ├── Shipping Calculation (Dynamic thresholds) + GST Slabs (3% Gemstone rate)
                ├── Stock Reservation (MongoDB ACID Transaction)
                ├── Payment Gateway (UPI / Card / Net Banking / COD / Bank Transfer)
                │      └── Webhook Signature Verification ──► Order Confirmed
                └── Order Lifecycle:
                      CONFIRMED ──► PROCESSING ──► PACKED ──► SHIPPED ──► OUT_FOR_DELIVERY ──► DELIVERED
                      └── Post-Delivery: Return Request ──► Inspection ──► Approved ──► Refund
```

---

## 6. Complete Scope Breakdown: 101 Screens (18 Main Modules)

### 6.1 Public Website Screens (30 Screens)

1. **Homepage (`/`):** Announcement bar, Hero banner, Trust highlights, Promo banners, Featured categories, Featured products, Why Choose A1 Gems, Gemstone showcase, Bracelet showcase, Vedic Rashi Ratan finder, How It Works, Testimonials, FAQ, Final CTA.
2. **Product Listing / Search (`/products`, `/search`):** Grid/list views, sort by price/newest, filters for category, carat range, price range, stone origin, certification lab.
3. **Product Detail (`/products/[slug]`):** Multi-image gallery with pinch-to-zoom, dynamic price/carat conversion (`1 Carat ≈ 1.1 Ratti`), lab certification display (IGI, GIA, GRS), purchase type conditional buttons (Buy Now, Enquire Now, WhatsApp), pincode & COD speed checker, rich description, related stones.
4. **Collections Index (`/collections`):** Category tiles with origin and gemstone lore.
5. **Category Showcase (`/collections/[slug]`):** Dedicated category banner, curated gemstone inventory.
6. **Gemstone Guides Hub (`/guides`):** Astrological, treatment, and origin guide library.
7. **Gemstone Guide Detail (`/guides/[slug]`):** Editorial deep-dive with linked catalogue items.
8. **Cart Page (`/cart`):** Line items, quantity adjust, remove, price snapshots, free shipping progress bar, checkout CTA.
9. **Cart Slide-over / Toast:** Micro-cart feedback upon addition without interrupting navigation.
10. **Checkout (`/checkout`):** Multi-step guest/personal/business checkout with GSTIN validation.
11. **Checkout Success (`/checkout/success`):** Order number, payment receipt, items summary, WhatsApp support link.
12. **Order Tracking (`/track-order`):** Search by Order Number + Phone/Email, shipment timeline, courier tracking links.
13. **Customer Login (`/login`):** Customer session authentication, magic callback redirection.
14. **Customer Register (`/register`):** New customer profile registration.
15. **Customer Forgot Password (`/forgot-password`):** Password recovery request.
16. **Customer Reset Password (`/reset-password`):** Secure token-based password reset.
17. **Customer Dashboard (`/account/dashboard`):** Total orders, total spend, recent order table, quick reorder.
18. **Customer Orders List (`/account/orders`):** Full historical purchases with status indicators.
19. **Customer Order Detail (`/account/orders/[id]`):** Line items, addresses, tax invoice download, cancel button (if eligible), return request button.
20. **Customer Return Request (`/account/orders/[id]/return`):** Return reason selector, image upload, inspection terms.
21. **Customer Saved Addresses (`/account/addresses`):** Multiple delivery & billing addresses CRUD.
22. **Customer Profile Settings (`/account/profile`):** Personal contact details, business GST profile defaults.
23. **About Us (`/about`):** Heritage, sourcing origins (Ceylon, Burma, Colombia, Kashmir), ethical disclosures.
24. **Contact Us (`/contact`):** Physical showroom address, Google Map, direct phone/WhatsApp contact, enquiry form.
25. **Vedic Astrology / Consultation (`/consultation`):** Form to schedule a certified astrologer/gemmologist call.
26. **Testimonials (`/testimonials`):** Verified customer reviews and certificate photographs.
27. **FAQs (`/faqs`):** Sourcing, return policy, delivery timelines, certification verification.
28. **Shipping Policy (`/policies/shipping`):** Insurance details, courier partnerships, delivery SLA.
29. **Return & Refund Policy (`/policies/returns`):** 7-day inspection window, refund rules for prepaid vs COD.
30. **Privacy & Terms (`/policies/terms`, `/policies/privacy`):** Legal terms, data privacy, GST terms.

---

### 6.2 Admin Panel Screens (71 Screens across 18 Submodules)

#### Module 01: Authentication & Access Control
- `/admin/login`: Secure staff login with JWT authentication.
- `/admin/forgot-password`: Admin password reset request.
- `/admin/reset-password`: Time-limited secure admin credential update.

#### Module 02: Executive Dashboard
- `/admin`: Real-time Commerce KPIs (Revenue, Orders, Low Stock Alerts, Returns) and Lead CRM KPIs (New Enquiries, Follow-ups Due, WhatsApp Inbound).

#### Module 03: Lead Management CRM
- `/admin/leads`: Full lead list with filters (Status, Stone, Source, Staff Assignment).
- `/admin/leads/[id]`: Detailed lead record with customer details, stone requirements, call/WhatsApp logs, follow-up scheduler, internal staff notes, and qualification pipeline.
- `/admin/leads/follow-ups`: Calendar / Agenda view of pending callbacks.
- `/admin/leads/analytics`: Conversion rates by gemstone type and acquisition channel.

#### Module 04: Order Management
- `/admin/orders`: Order grid with filters (Payment Status, Order Status, Date, Purchase Type).
- `/admin/orders/[id]`: Order details, item specifications, GSTIN invoice details, BlueDart tracking input, manual bank wire payment verifier, order timeline progression.
- `/admin/orders/[id]/invoice`: Printable GST-compliant tax invoice.

#### Module 05: Customer Management
- `/admin/customers`: Customer directory, segmentation (Personal vs Business/Wholesale).
- `/admin/customers/[id]`: Profile details, lifetime value (LTV), total orders, saved addresses, GSTIN records, transaction timeline.

#### Module 06: Payment Transactions
- `/admin/payments`: Transaction history across UPI, Card, Net Banking, COD, Bank Transfer.
- `/admin/payments/[id]`: Gateway payload inspection, webhook log, settlement status, refund link.

#### Module 07: Shipments & Logistics
- `/admin/shipments`: Active consignments, courier assignments (BlueDart, Delhivery, BVC Logistics for high-value).
- `/admin/shipments/[id]`: Tracking milestones, delivery proof, transit insurance verification.

#### Module 08: Returns & Exchanges
- `/admin/returns`: Return requests awaiting review, pickup dispatch, or inspection.
- `/admin/returns/[id]`: Return inspection report (gemstone authenticity verification, weight check), approve/reject decision engine.

#### Module 09: Refunds Management
- `/admin/refunds`: Refund batches, gateway payout status (PENDING, PROCESSING, COMPLETED, FAILED).
- `/admin/refunds/[id]`: Payout audit trail, bank reference numbers.

#### Module 10: Product Catalogue Management
- `/admin/products`: Product data table with stock level badges, status filters, search.
- `/admin/products/new`: Multi-tab product creation:
  - *Basic Info:* Name, Category, Auto-generated slug, Short description, Rich description.
  - *Pricing & Variants:* Selling price, Compare price, Multi-carat/dimension variant builder.
  - *Inventory:* SKU generator (`A1-[CAT]-[PROD]-001`), Stock quantity, Reserved quantity, Low stock threshold.
  - *Specs:* Gemstone, Material, Carat, Ratti, Cut, Color, Clarity, Origin, Lab Certificate number.
  - *Purchase Mode:* `BUY_ONLY`, `ENQUIRY_ONLY`, `BUY_AND_ENQUIRE`, WhatsApp toggle.
  - *SEO:* Meta title, Meta description, Keywords, OG social preview image.
- `/admin/products/[id]/edit`: Full product modifier with image replacement.

#### Module 11: Category Management
- `/admin/categories`: Category tree, display ordering, gemstone color mapping.
- `/admin/categories/new` & `[id]/edit`: Name, slug, description, cover image, SEO attributes.

#### Module 12: Inventory & Stock Control
- `/admin/inventory`: Live stock levels vs. reserved stock across variants.
- `/admin/inventory/adjustments`: Manual stock adjustments with audit trail reason logging.
- `/admin/inventory/low-stock`: Immediate low-stock alerts triggering supplier replenishments.

#### Module 13: Media Library
- `/admin/media`: Cloudinary digital asset manager, image tagging, alt text manager, URL copier.
- `/admin/media/upload`: Drag-and-drop batch asset uploader.

#### Module 14: Homepage CMS & Banners
- `/admin/website/hero-section`: Hero slide builder, headlines, background media, CTA links.
- `/admin/website/banners`: Promotional, Category, and Lead Gen banners with scheduling dates.
- `/admin/website/sections`: Drag-and-drop homepage section reordering and visibility toggles.

#### Module 15: Content & Guides CMS
- `/admin/content/guides`: Gemstone guide authoring with rich text editor.
- `/admin/content/faqs`: Category-wise FAQ manager.
- `/admin/content/testimonials`: Customer review manager with star ratings and approval toggles.
- `/admin/content/policies`: Policy document editor (Shipping, Returns, Terms, Privacy).

#### Module 16: SEO Management
- `/admin/seo`: Global metadata, OpenGraph defaults, XML sitemap trigger, robots.txt manager.

#### Module 17: Settings & Configuration
- `/admin/settings/company`: Business name, physical showrooms, phone, support email, WhatsApp number.
- `/admin/settings/commerce`: Flat shipping fee, Free shipping threshold, COD maximum order ceiling.
- `/admin/settings/tax`: GST tax rules (Default: 3% for cut/polished gemstones), GSTIN merchant registration.
- `/admin/settings/payment`: Razorpay / Cashfree API credentials, Webhook secret keys.

#### Module 18: System & Security Governance
- `/admin/system/users`: Staff administration, roles (`SUPER_ADMIN`, `CONTENT_MANAGER`, `LEAD_MANAGER`), active toggles.
- `/admin/system/users/new` & `[id]`: User permissions assigner.
- `/admin/system/audit`: Non-repudiable audit logs recording all staff mutations (who changed which product, order, price, or role with timestamp and IP).

---

## 7. Database Model Architecture (18 Mongoose Schemas)

1. **`Product` (`lib/models/product.ts`):** Catalogue definitions, purchase type, multi-variant schemas (carat, size, sku, stock), specifications, certification, SEO metadata.
2. **`Category` (`lib/models/category.ts`):** Hierarchical taxonomy, gem color token, display order.
3. **`Order` (`lib/models/order.ts`):** Sequential `orderNumber` (`ORD-YYYY-XXXX`), line items snapshot, shipping/billing/GST addresses, tax breakdown (CGST, SGST, IGST), payment/order status machine.
4. **`Lead` (`lib/models/lead.ts`):** Omnichannel enquiry pipeline, customer contact, preferred stone, lifecycle stage, assigned agent, timestamped follow-up history, internal notes.
5. **`Customer` (`lib/models/customer.ts`):** Customer profile, account type (PERSONAL/BUSINESS), GSTIN, addresses, lifetime order count, and gross spend.
6. **`Payment` (`lib/models/payment.ts`):** Payment records, gateway IDs, payment mode, cryptographic signatures, verified timestamps.
7. **`Shipment` (`lib/models/shipment.ts`):** Courier provider, AWB/Tracking number, dispatch dates, delivery verification.
8. **`Return` (`lib/models/return.ts`):** Customer return requests, proof images, inspection records, approval status.
9. **`Refund` (`lib/models/refund.ts`):** Payout ledger, gateway refund reference IDs, refund amount, completion status.
10. **`TemporaryCart` (`lib/models/cart.ts`):** Ephemeral cart lines with TTL expiry index (`expiresAt`).
11. **`User` (`lib/models/user.ts`):** Administrative staff credentials, hashed passwords (bcrypt), RBAC role flags.
12. **`Counter` (`lib/models/counter.ts`):** Atomic sequence counter for unique human-readable Order and Invoice IDs.
13. **`Settings` (`lib/models/settings.ts`):** Dynamic business parameters (shipping rates, tax percentages, COD rules).
14. **`AuditLog` (`lib/models/audit.ts`):** Immutable compliance logs (`USER_CREATED`, `ORDER_STATUS_UPDATED`, `STOCK_ADJUSTED`).
15. **`Homepage` (`lib/models/homepage.ts`):** Homepage layout configuration and section order.
16. **`HeroSection` (`lib/models/hero-section.ts`):** Hero carousel slides and CTA definitions.
17. **`FAQ` (`lib/models/faq.ts`):** Questions, answers, categories, display order.
18. **`Policy` / `Testimonial` (`lib/models/policy.ts`, `lib/models/testimonial.ts`):** Rich content CMS models.

---

## 8. Current Implementation Status & QA Audit Matrix

Based on the QA validation conducted against `TESTING.md`, the platform status is summarized below:

| Module | Implementation Status | QA Status | Remarks / Identified Action Items |
| :--- | :---: | :---: | :--- |
| **Public Homepage & Discovery** | 100% | ✅ PASS | All 14 sections render; Rashi finder and category filters active. |
| **Product Detail & Gallery** | 95% | ✅ PASS | Ratti/Carat calculations, certificate disclosures, and responsive galleries verified. |
| **Enquiry & Lead Generation** | 90% | ⚠️ WARN | Enquiry modal creates DB leads; requires 10-digit Indian phone regex and admin email alerts. |
| **Cart & Guest Persistence** | 85% | ⚠️ WARN | Temporary cart syncs to MongoDB; multi-variant removal requires line-keyed IDs. |
| **Checkout Flow** | 70% | ❌ FAIL | **Blocker:** Guest checkout blocked by `proxy.ts`. Price recalculation must be secured on server. |
| **Payment & Webhook Engine** | 75% | ❌ FAIL | **Blocker:** Razorpay webhook race condition; order must be pre-created before gateway modal. |
| **Order Tracking (`/track-order`)** | 20% | ❌ FAIL | UI is present, but form submit button is hardcoded disabled. Needs active order lookup. |
| **Customer Portal (`/account/*`)** | 60% | ❌ FAIL | Dashboard has runtime crash on `order.status`; orders list is a placeholder stub. |
| **Admin Navigation & Layout** | 85% | ⚠️ WARN | Sidebar needs links to Media Library, CMS Content, and Commerce/Tax Settings. |
| **Admin Products & Inventory** | 90% | ⚠️ WARN | TypeScript compilation error in `PricingVariantsTab.tsx` (TS2322) must be resolved. |
| **Admin DataTable Component** | 85% | ⚠️ WARN | Responsive toolbar and pagination stacking needed on viewports <640px. |
| **Security & RBAC Enforcement** | 75% | ⚠️ WARN | Server actions (`order.actions`, `product.actions`) require strict role-level rejection. |

---

## 9. Launch Readiness Action Plan

To finalize A1 Gems for commercial production launch:

1. **Middleware & Guest Checkout Pass:** Update `proxy.ts` to exclude `/checkout` from `isPublicProtectedRoute`, allowing unauthenticated visitors to purchase without barriers.
2. **Server-Side Pricing Security:** In `lib/actions/checkout.actions.ts`, query Mongoose `Product.findById` to fetch authoritative prices, computing totals exclusively on the server and passing `variantId` to ensure inventory reservation.
3. **Webhook Order Reconciliation:** Pre-create orders in `PAYMENT_PENDING` state prior to opening the Razorpay modal, ensuring webhook `payment.captured` always matches an existing order and transitions it to `CONFIRMED`.
4. **Customer Account Portal Completion:** Fix the `order.orderStatus` property reference in `app/(public)/account/dashboard/page.tsx` and wire `app/(public)/account/orders/page.tsx` and `app/(public)/track-order/page.tsx` to active order lookups.
5. **TypeScript & Responsive Cleanup:** Resolve the Next.js `Image` source type check in `PricingVariantsTab.tsx` and apply `flex-wrap` / responsive column stacking to `DataTable.tsx`.
