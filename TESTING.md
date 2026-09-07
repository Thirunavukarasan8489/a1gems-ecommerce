# A1 Gems — QA, Security & Validation Test Plan

> **For the testing agent:** This document is a structured test plan for the A1 Gems gemstone/jewellery e-commerce platform (Next.js + MongoDB, public storefront + admin panel). Work through each section in order. For every test case, record: **Pass / Fail / Blocked**, actual result, and evidence (screenshot, response body, or console output) if it fails. Use the report template at the end. Do not modify production data — use a staging environment or clearly marked test accounts/products only.

---

## 0. Setup Before Testing

- [ ] Confirm the environment under test (staging URL, not production)
- [ ] Obtain test credentials for each admin role: Super Admin, Content Manager, Lead Manager
- [ ] Create 2–3 test products covering all purchase types: `ENQUIRY_ONLY`, `BUY_ONLY`, `BUY_AND_ENQUIRE`
- [ ] Note the payment gateway's test/sandbox mode credentials (Razorpay/Cashfree test keys) — never use live payment credentials
- [ ] Have access to browser DevTools (Network + Console tabs) and a REST client (Postman/curl) for API-level testing
- [ ] Have at least two customer identities available: one "Personal," one "Business" (GST-registered) and one "Business" (non-GST)

---

## 1. Functional Testing — Public Website

### 1.1 Homepage
- [ ] All CMS sections render: Announcement bar, Hero, Trust highlights, Promotional banners, Featured categories, Featured products, Gemstone showcase, Bracelet showcase, How It Works, Testimonials, FAQ, Final CTA
- [ ] All CTAs link to the correct destination (no dead links, no `href="#"` left in production)
- [ ] Page loads without console errors

### 1.2 Product Discovery
- [ ] Homepage → Category → Product Listing → Product Detail path works
- [ ] Search returns relevant results; empty search / no-match state displays correctly
- [ ] Category filter, price filter, availability filter, and sort all work independently and in combination
- [ ] Product card shows image, name, price, availability, category correctly
- [ ] Purchase CTA on the card matches the product's configured purchase type (Enquire / Add to Cart / both)

### 1.3 Product Detail Page
- [ ] Images, name, price, description, specifications, certification, availability, shipping info all render
- [ ] For `ENQUIRY_ONLY` products: only "Enquire Now" is shown, no Add to Cart
- [ ] For `BUY_ONLY` products: only Add to Cart is shown, no Enquire
- [ ] For `BUY_AND_ENQUIRE` products: both actions are shown and both work independently
- [ ] Out-of-stock product detail page correctly disables/hides Add to Cart

### 1.4 Enquiry Flow
- [ ] "Enquire Now" opens the lead form pre-filled with product context
- [ ] Required fields enforced: Name, Phone; optional: WhatsApp, Email, Location
- [ ] Submitting creates a lead with status `NEW` and correct product/category/message/source captured
- [ ] Admin notification is triggered on lead creation (verify via admin panel or notification log)
- [ ] Duplicate/rapid resubmission is handled gracefully (no duplicate leads from double-click, or intentionally allowed — confirm expected behavior)

### 1.5 Cart & Guest Checkout
- [ ] Add to Cart works from product card and product detail
- [ ] Cart persists via temporary cart (cookie + MongoDB) across a page refresh, for a guest with no account
- [ ] Update quantity and Remove product both work and recalculate totals correctly
- [ ] Cart survives browser close/reopen within the TTL window; confirm it's actually gone after TTL expiry (see 4.6)
- [ ] Empty cart state displays correctly

### 1.6 Checkout — Personal
- [ ] Guest checkout requires only Name, Phone, Email (no forced account creation)
- [ ] Personal path: Customer Info → Shipping Address → Billing Address (with "same as shipping" toggle) → Shipping fee → Order Summary → Payment
- [ ] Order summary shows correct subtotal, shipping fee, and total before payment

### 1.7 Checkout — Business
- [ ] Business path collects Business Name, Contact Person, Business Address
- [ ] GST-registered toggle: when Yes, GSTIN + Legal Business Name + GST Address become required; when No, falls through to "Normal Business Purchase"
- [ ] Applicable tax is calculated and shown only when GST-registered
- [ ] Order summary reflects the correct tax treatment for both GST and non-GST business paths

### 1.8 Payments
- [ ] UPI, Card, Net Banking, COD, and Bank Transfer are all selectable and each completes successfully in sandbox/test mode
- [ ] Successful online payment moves the order to `CONFIRMED`
- [ ] Failed online payment returns the customer to a retry state without creating a duplicate confirmed order
- [ ] COD is blocked (with a clear message) when COD eligibility rules fail (see 4.4)
- [ ] Bank Transfer produces a `PAYMENT_PENDING` order and clear instructions; admin can mark it verified

### 1.9 Order Confirmation & Tracking
- [ ] Order confirmation page shows Order Number, items, totals, and next steps
- [ ] "Track Order" shows current order status and shipping/tracking info once available
- [ ] Customer-facing order view shows all fields listed in the spec (order number, date, products, qty, price, shipping, tax, total, payment status, order status, shipping status, tracking)

### 1.10 Cancellation, Returns, Refunds (customer-facing)
- [ ] Customer can request cancellation only while the order is in an eligible status
- [ ] Cancelling a prepaid order triggers a refund path; cancelling a COD order does not
- [ ] Return request is only offered on delivered orders, collects a reason, and shows pending/approved/rejected status back to the customer

---

## 2. Functional Testing — Admin Panel

### 2.1 Authentication & RBAC
- [ ] Login works for Super Admin, Content Manager, Lead Manager
- [ ] Forgot password / reset password flow works end-to-end (including token expiry)
- [ ] Each role sees only the sidebar sections it's permitted to access — verify by logging in as each role and confirming restricted sections are hidden **and** their routes/APIs reject direct access (see 5.2)

### 2.2 Catalogue Management
- [ ] Create Product walks through: Basic Info → Category → Specifications → Pricing → Inventory → Images → Purchase Mode → Lead Settings → SEO → Preview → Publish
- [ ] All fields from the Product Admin Fields spec are present and saved correctly (Name, Slug, Category, Short/Long Description, Selling Price, Compare Price, SKU, Stock Qty, Reserved Qty, Low Stock Threshold, Stock Status, Purchase Type, Enquiry Enabled, WhatsApp Enabled, Material, Stone, Size, Weight, Origin, Certification, Primary Image, Gallery, Alt Text, Meta Title/Description/Keywords/OG Image)
- [ ] Slug auto-generates and can be edited; duplicate slugs are rejected or de-duplicated
- [ ] Unpublishing a product removes it from the public site immediately
- [ ] Category create/edit supports Name, Slug, Description, Image, SEO, Display Order, Publish state, and reordering works

### 2.3 Lead Management
- [ ] Lead list supports search/filter by status, product, date
- [ ] Lead detail shows full customer + enquiry + management info
- [ ] Status transitions work: NEW → CONTACTED → FOLLOW_UP → QUALIFIED → CONVERTED, and alternates CLOSED / SPAM
- [ ] Assign-to, Add Note, and Follow-up date all persist correctly
- [ ] "Actions Taken" (Call/WhatsApp/Email logging) records against the lead

### 2.4 Order Management
- [ ] Order list search/filter by order number, customer, purchase type, payment status, order status, date
- [ ] Order detail shows Customer, Items, Shipping/Billing Address, GST Info, Pricing, Payment, Shipment, Timeline, Cancellation, Return, Refund sections
- [ ] Admin order timeline updates as the order moves through its lifecycle
- [ ] Admin can manually verify a Bank Transfer payment and the order progresses correctly afterward

### 2.5 Inventory
- [ ] Inventory dashboard reflects real stock vs. reserved vs. available accurately after test orders
- [ ] Manual stock adjustment updates available quantity immediately
- [ ] Low stock threshold triggers the correct flag/alert on the dashboard

### 2.6 Website CMS, Content, Media, SEO
- [ ] Homepage section builder: edit, enable/disable, reorder, preview, publish all work and reflect live on the public homepage
- [ ] Banner creation supports all 4 types (Hero, Promotional, Category, Lead Generation), desktop/mobile images, CTA, and scheduling (a scheduled banner shouldn't show before its start date)
- [ ] Media Library upload goes to Cloudinary and is selectable from Product/Banner/Content pickers
- [ ] SEO fields (meta title/description, OG image, sitemap, robots) save and reflect in page `<head>` / `/sitemap.xml` / `/robots.txt`

### 2.7 Dashboard & Analytics
- [ ] Commerce KPIs (Total Orders, Today's Orders, Revenue, Pending Payments, Pending Orders, Low Stock, Returns) match actual data
- [ ] Lead KPIs (Total Leads, New Leads, Contact Enquiries, Product Enquiries, WhatsApp Clicks) match actual data

---

## 3. Workflow / End-to-End Testing

Run these as full journeys, not isolated steps — this is where integration bugs hide.

- [ ] **E2E-1 (Enquiry):** Visitor → Product (Enquiry Only) → Enquire → Lead created → Admin sees it in Leads → Admin changes status → Status change reflected consistently
- [ ] **E2E-2 (Buy, Personal, Prepaid):** Visitor → Add to Cart → Guest Checkout → Personal → Address → Shipping → Payment (success) → Order Confirmed → Admin sees order → Admin processes → Packed → Shipped → Delivered → Customer sees each status update
- [ ] **E2E-3 (Buy, Business + GST):** Add to Cart → Checkout → Business → GST registered → GSTIN entered → Tax calculated correctly → Payment → Order shows GST info correctly in both customer and admin views
- [ ] **E2E-4 (COD path):** Add to Cart → Checkout → Select COD → Eligibility check passes → Order created → Admin confirms → No payment refund path exists if later cancelled
- [ ] **E2E-5 (Cancellation + Refund):** Place prepaid order → Cancel while eligible → Inventory released → Refund created → Refund status progresses PENDING → PROCESSING → COMPLETED
- [ ] **E2E-6 (Return + Refund):** Deliver an order → Customer requests return → Admin reviews and approves → Return pickup → Product received → Inspection → Refund issued
- [ ] **E2E-7 (Stock race):** Two browser sessions attempt to buy the last unit of a low-stock item simultaneously — confirm only one checkout succeeds and the other is blocked with a clear "out of stock" message, not a broken order
- [ ] **E2E-8 (Mixed purchase type):** A `BUY_AND_ENQUIRE` product — one customer buys it while another enquires about it in parallel — confirm both flows work independently without interfering with each other

---

## 4. Validation Testing

### 4.1 Enquiry / Lead Form
- [ ] Name and Phone required — submission blocked with clear inline errors if missing
- [ ] Phone format validated (reject letters, too-short/too-long numbers)
- [ ] Email, if provided, validated for format
- [ ] Message field: test empty, very long (boundary), and script-tag content (see 5.4 XSS)

### 4.2 Checkout Forms
- [ ] Guest checkout: Name/Phone/Email required and validated
- [ ] Shipping/Billing address: required fields enforced (line, city, state, PIN code)
- [ ] PIN code format validated (6-digit Indian PIN)
- [ ] "Billing same as shipping" correctly copies data and correctly allows override

### 4.3 GST / Business Validation
- [ ] GSTIN format validated (15-character Indian GSTIN pattern) when GST-registered is Yes
- [ ] Invalid GSTIN format is rejected with a clear message, not a silent failure
- [ ] Legal Business Name required when GST-registered
- [ ] Switching GST-registered from Yes → No clears/ignores GSTIN-only fields correctly in the submitted payload

### 4.4 COD Eligibility Rules
- [ ] Confirm actual COD rule logic against PIN code, order value, product, and customer — this needs the specific business rule values from the client; test both an eligible and an ineligible case explicitly
- [ ] High-value order (test with a deliberately high-ticket gemstone) — confirm whether COD is blocked as expected per the defined threshold
- [ ] Ineligible COD attempt shows a clear message and offers an alternative payment method rather than a dead end

### 4.5 Cart & Inventory Validation
- [ ] Cannot add more to cart than available stock
- [ ] Price shown in cart matches the price snapshot taken at add-to-cart time (test what happens if admin changes the price after it's in a guest's cart — confirm intended behavior: snapshot honored or re-validated at checkout)
- [ ] Checkout blocked cleanly if a product is unpublished/out of stock/deleted after being added to cart
- [ ] Quantity cannot be set to zero or negative via the update-quantity control or a direct API call

### 4.6 Temporary Cart TTL
- [ ] Confirm the actual TTL duration with the dev team, then verify: a cart created and left untouched past that TTL is actually removed from MongoDB (not just hidden in the UI)
- [ ] Cookie-based cart ID cannot be trivially guessed/incremented to access another user's temporary cart (see 5.3 IDOR)

### 4.7 Admin Form Validation
- [ ] Product Selling Price must be a positive number; Compare Price, if set, should logically exceed Selling Price (confirm and test whether this is enforced)
- [ ] Stock Quantity, Reserved Quantity cannot go negative
- [ ] SKU uniqueness enforced
- [ ] Required product fields (Name, Category, Selling Price at minimum) block Publish if missing
- [ ] Image upload restricted to expected file types/size (test uploading a non-image file and an oversized file)

---

## 5. Security Testing

> Run these only against staging/test environments with permission. Do not run destructive or load-based tests against production.

### 5.1 Authentication
- [ ] Admin login rate-limited or protected against brute force (test repeated failed logins)
- [ ] Session/JWT expires appropriately and cannot be reused after logout
- [ ] Password reset tokens are single-use and expire
- [ ] No sensitive data (password hashes, tokens) leaks in API responses or client-side JS bundles

### 5.2 Authorization / RBAC (critical — test at the API level, not just the UI)
- [ ] Log in as Content Manager, then attempt direct API calls to Lead/Order/Payment/Settings endpoints that should be restricted to Super Admin or Lead Manager — confirm the **server** rejects them (403), not just the UI hiding the button
- [ ] Log in as Lead Manager, attempt to access/modify Product or Settings endpoints directly — confirm rejection
- [ ] Confirm a logged-out session cannot call any `/admin/*` API route
- [ ] Confirm one customer cannot view or modify another customer's order by guessing/incrementing an order ID in the URL or API call (IDOR test — this is high priority for an order management system)

### 5.3 IDOR / Broken Object-Level Authorization
- [ ] Attempt to fetch another user's order detail, lead detail, or temporary cart by directly manipulating the ID/cookie in a request
- [ ] Attempt to access `/admin/*` pages directly via URL without authentication and confirm redirect/block, not partial data leakage before redirect

### 5.4 Injection & Input Sanitization
- [ ] Test NoSQL injection patterns in search fields and login form (e.g., `{"$gt": ""}`-style payloads in fields that reach MongoDB queries)
- [ ] Test XSS payloads (`<script>alert(1)</script>`) in every free-text field: enquiry message, lead notes, product description, review/testimonial fields if user-submitted — confirm output is escaped, not executed
- [ ] Confirm Zod (or equivalent) validation is enforced server-side, not just client-side — bypass the UI and submit malformed/extra fields directly via API to confirm the server still rejects them

### 5.5 Payment Security
- [ ] Confirm the backend verifies payment success via gateway webhook signature verification, and does **not** trust a client-side "payment success" callback alone (per the spec's own explicit requirement) — attempt to forge a client-side success call without a valid backend-verified payment and confirm the order is not confirmed
- [ ] Confirm webhook endpoint validates the signature/secret and rejects unsigned or tampered payloads
- [ ] Confirm price/total cannot be manipulated client-side (e.g., intercept and modify the checkout request to a lower total, or a negative shipping fee, and confirm the server recalculates from its own product/pricing data rather than trusting the client)

### 5.6 File Upload Security
- [ ] Attempt to upload a non-image file (e.g., renamed `.php`/`.js` file with an image extension) to the Media Library and confirm it's rejected by content-type inspection, not just file extension
- [ ] Confirm uploaded media URLs don't expose any local server file paths

### 5.7 Transport & Headers
- [ ] Site is served over HTTPS with no mixed-content warnings
- [ ] Basic security headers present: `Content-Security-Policy`, `X-Frame-Options` (or CSP frame-ancestors), `X-Content-Type-Options: nosniff`
- [ ] Cookies (session, temporary cart ID) are `HttpOnly` and `Secure`, and `SameSite` is set appropriately

### 5.8 Business Logic Abuse
- [ ] Confirm inventory reservation actually prevents overselling under concurrent checkout load (ties to E2E-7 above, but test explicitly as a security/integrity concern, not just a UX one)
- [ ] Confirm a cancelled/failed order does not leave inventory permanently reserved (reservation must release correctly on cancellation/failure)
- [ ] Confirm audit logs are actually created for sensitive admin actions (per the spec's own architecture requirement) — check the Audit Logs section after performing a few admin actions

---

## 6. Cross-Cutting Checks

- [ ] Mobile responsiveness across the actual breakpoints used in the build (phone / tablet / desktop) — no overlapping elements, no horizontal scroll
- [ ] Core flows (browse → enquire, browse → buy) work with JavaScript-heavy interactions on a throttled/slow network profile (DevTools network throttling)
- [ ] 404 and error states are handled gracefully (broken product link, deleted category, payment gateway timeout)
- [ ] Cache revalidation actually reflects admin changes on the public site promptly (per the spec's own "Cache Revalidation" step in the request flow) — publish a product change and confirm it appears without a long delay

---

## Reporting Template

For each failed test, report in this format:

```
ID: [e.g., SEC-002]
Title: [short description]
Severity: Critical / High / Medium / Low
Steps to Reproduce:
Expected Result:
Actual Result:
Evidence: [screenshot / request-response / console log]
```

Group the final report by section (Functional / Workflow / Validation / Security) and lead with a summary table: total tests run, passed, failed, blocked, and a short list of Critical/High findings that should block launch.