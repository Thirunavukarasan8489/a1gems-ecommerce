# A1 GEMS — E-COMMERCE PLATFORM DOCUMENTATION

> **Project Status**: Completed & Fully Functional  
> **Design Theme**: Indian Royal Luxury Gemstone & Astrological Marketplace ("Velvet & Gold")  
> **Target Audience**: Indian & International Gem Collectors, Jewelry Buyers, Astrological Gemstone (Rashi Ratan) Practitioners, & Business Buyers (GST Wholesale)  
> **Architecture Reference**: PDF Specification (41 Pages Flow & Modules Architecture)

---

## 1. Project Overview & Architectural Alignment

A1 Gems is a high-end gemstone e-commerce & lead generation platform designed specifically for the Indian gemstone market. It integrates direct online e-commerce (`BUY_ONLY` & `BUY_AND_ENQUIRE`) with high-value collector-grade consultations (`ENQUIRY_ONLY`).

### Indian Craftsman & Mobile-First Design Aesthetics
- **Authentic Indian Royal Color Palette**: Velvet Plum (`#1e1329`), Auspicious Vedic Gold (`#c99a26` / `#d4af37`), Imperial Emerald (`#10b481`), & Warm Ivory Canvas (`#fbf8f3`).
- **Craftsman Feel**: Traditional Indian Jali & Mandala ambient accents, handcrafted gemstone showcase cards, and human-tailored copy.
- **Vedic Astrology Integration**: Interactive **Rashi Ratan (राशि अनुसार रत्न परामर्श) Finder** for 12 Zodiac signs (Mesh, Vrishabh, Mithun, Kark, Simha, Kanya, Tula, Vrishchik, Dhanu, Makar, Kumbh, Meen) with Graha (Planet) benefits.
- **Indian Market Specifics**:
  - Currency in Indian Rupees (`₹`).
  - Carat to **Indian Ratti** weight calculation (`1 Carat ≈ 1.1 Ratti`).
  - Indian Postal **6-Digit PIN Code Delivery & Cash on Delivery (COD) Checker**.
  - **GST Tax Invoice Support** (CGST / SGST / IGST) for Business Customers (§12.4).
  - Independent **Lab Certification Verification** (IGI, GIA, GRS, SSEF).
  - One-tap **WhatsApp Gemmologist Consultation** floating and inline buttons.

---

## 2. Completed PDF Specification Modules Matrix

| PDF Section | Module Description | Status | Implementation Details |
| :--- | :--- | :--- | :--- |
| **§1 - §6** | Public & Admin Roles + Workflow | ✅ Complete | Public Visitor & Admin RBAC (Super Admin, Content Manager, Lead Manager) |
| **§7 - §8** | Homepage & Product Flow | ✅ Complete | Dynamic Homepage with Hero, Rashi Finder, Trust Strip, Collections, Rails |
| **§9** | Product Purchase Types | ✅ Complete | `ENQUIRY_ONLY`, `BUY_ONLY`, `BUY_AND_ENQUIRE` flow routing |
| **§10 & §10.2** | Enquiry & Lead CRM Flow | ✅ Complete | Lead lifecycle pipeline (`NEW` -> `CONTACTED` -> `FOLLOW_UP` -> `QUALIFIED` -> `CONVERTED`) |
| **§11 & §11.1** | Cart & Temporary Cart | ✅ Complete | Guest checkout temporary cart with snapshot pricing & quantity management |
| **§12 & §12.3/12.4** | Checkout Flow | ✅ Complete | Personal Checkout vs Business Checkout with GSTIN, Legal Name & Tax Invoice |
| **§13 & §13.1** | Inventory & Stock Reservation | ✅ Complete | Formula: `availableQuantity = stockQuantity - reservedQuantity` |
| **§14 & §14.1-14.3**| Payment Flow | ✅ Complete | UPI, Credit/Debit Cards, Net Banking, COD (Pincode rule), & Bank Transfer |
| **§15 & §15.1** | Order Lifecycle | ✅ Complete | `PAYMENT_PENDING` -> `CONFIRMED` -> `PROCESSING` -> `PACKED` -> `SHIPPED` -> `DELIVERED` |
| **§16 - §18** | Shipping, Delivery & Cancellation | ✅ Complete | BlueDart / Insured Express Air dispatch with tracking number management |
| **§19 - §20** | Return & Refund Flow | ✅ Complete | 7-Day return inspection workflow & payment provider refund ledger |
| **§21 - §22** | Customer & Admin Order Views | ✅ Complete | `/admin/orders` with search, GST invoice details, timeline & dispatch tracking |
| **§23 - §24** | Catalogue & Admin Fields | ✅ Complete | `/admin/products` with Basic, Pricing, Inventory, Specs, & SEO forms |
| **§25** | Category Flow | ✅ Complete | `/admin/categories` with display order & publishing controls |
| **§26 - §27** | Homepage CMS & Banners | ✅ Complete | `/admin/website` section enabler/disabler & banner manager |
| **§28** | Content Management Flow | ✅ Complete | `/admin/content` managing Guides, FAQs, Testimonials, & About pages |
| **§29** | Media Library Flow | ✅ Complete | `/admin/media` with Cloudinary metadata storage structure |
| **§30 - §32** | SEO, Admin Dashboard & Sidebar | ✅ Complete | Admin Sidebar (§32) matching exact 9 menu categories & Commerce/Lead KPIs |
| **§33** | Folder Structure Architecture | ✅ Complete | Clean Next.js App Router structure with `app/(public)` & `app/(admin)` |

---

## 3. Key Pages & Route Architecture

### Public Website Routes (`app/(public)/`)
- **Homepage** (`/`): Hero banner, Trust strip, Rashi Ratan finder, Promo banners, Featured categories, Gemstone vault, Bracelets rail, Testimonials, FAQs.
- **Products Catalog** (`/products`): Filterable gemstone catalog by category, price, availability, and purchase mode.
- **Product Detail** (`/products/[slug]`): Ratti conversion, Lab report details, Indian Pincode & COD checker, Enquire/Buy actions, specifications.
- **Astrology Gemstone Finder** (`/`): Interactive Rashi selector for Vedic gemstone recommendations.
- **Collections** (`/collections/[slug]`): Dedicated category landing pages.
- **Gemstone Guides** (`/guides`, `/guides/[slug]`): Educational guide articles.
- **Why A1 Gems** (`/why-a1-gems`): Brand authenticity & heritage page.
- **How It Works** (`/how-it-works`): Step-by-step purchase & certification process.
- **Cart** (`/cart`): Temporary guest cart with item management & price snapshot.
- **Checkout** (`/checkout`): Personal vs Business GST purchase selection, address form, payment options.
- **Order Confirmation** (`/order-confirmation`): Order summary & dispatch timeline.
- **Track Order** (`/track-order`): AWB & Order ID lookup.
- **Contact & FAQs** (`/contact`, `/faqs`, `/testimonials`): Direct contact forms & support.

### Admin Panel Routes (`app/(admin)/admin/`)
- **Admin Login** (`/admin/login`): RBAC Login screen for Super Admin, Content Manager, & Lead Manager.
- **Dashboard** (`/admin`): Overview with Commerce KPIs & Lead KPIs (§31).
- **Lead CRM** (`/admin/leads`): Lead status pipeline, customer details, WhatsApp triggers, follow-up dates (§10).
- **Order Management** (`/admin/orders`): Order list & detail, GSTIN verification, shipping status, tracking ID input (§22).
- **Customer Directory** (`/admin/customers`): Personal & Business customer profiles (§4).
- **Inventory Control** (`/admin/inventory`): Stock quantity & reserved stock management (§13).
- **Catalogue Manager** (`/admin/products`): Add/edit products with §24 fields.
- **Category Manager** (`/admin/categories`): Reorder & publish categories (§25).
- **Payment Verification** (`/admin/payments`): Bank transfer & UPI payment verification (§14).
- **Shipments** (`/admin/shipments`): Courier tracking dispatch (§16).
- **Returns & Refunds** (`/admin/returns`, `/admin/refunds`): Return inspections & refund tracking (§19, §20).
- **Media Library** (`/admin/media`): Image assets (§29).
- **Website CMS** (`/admin/website`): Section visibility & banners (§26, §27).
- **Content Manager** (`/admin/content`): Guides, FAQs, & Testimonials (§28).
- **System Settings** (`/admin/settings`): Shipping fee, GST tax rates, & business info (§8, §12 font).

---

## 4. Verification & Clean Code Standard
- **TypeScript**: All routes and components are fully typed with no compiler errors.
- **Next.js App Router**: Optimized layout boundaries, server components, and responsive client interactions.
- **Zero Broken Links**: All navigation items, CTA buttons, and admin links are connected and operational.

---
*Created automatically by Antigravity AI Assistant.*
