# Application Flow & Architecture

## Roles & Responsibilities
- **Senior Full Stack Developer (MERN / Next.js)**: Responsible for building robust API services, frontend integration, maintaining a clean UI/UX, and ensuring scalable, maintainable code.
- **Senior Tester**: Responsible for comprehensive testing including form validation, API validation, auth flows, and security vulnerability checks.
- **Project Manager**: Responsible for overseeing module delivery, ensuring requirements are met, timeline management, and alignment with business goals.

## Design Rules
- **Theme**: Default Light Theme.
- **UI/UX**: Simple and clean UI.
- **Reference**: [Preadmin POS Template](https://preadmin.dreamstechnologies.com/html/pos/index.html).

## Core Technical Rules

### 1. Form Validation
- Implement strict client-side validation for immediate user feedback.
- Use structured validation schemas (e.g., Zod) on the server-side for absolute data integrity.
- Validate all inputs for required fields, formats (email, phone, etc.), and boundary conditions.

### 2. API Service & Integration
- Create modular, reusable API service layers for fetching and mutating data.
- Ensure consistent error handling, standardized response payloads, and clean frontend integration.

### 3. API & Auth Validation
- **API Validation**: Every endpoint must validate incoming request bodies, queries, and parameters before processing.
- **Auth Validation**: Secure endpoints using robust session/JWT authentication. Strictly enforce Role-Based Access Control (RBAC) at both the route and action levels.

### 4. Security
- Implement protections against XSS, CSRF, and Injection attacks.
- Enforce secure transmission (HTTPS) and secure cookie handling.
- Sanitize user inputs and securely encrypt/hash sensitive data.

---

## Module Workflows

### 1. LOGIN PAGE
- **Flow**: User inputs credentials -> Client Form Validation -> Secure API Call -> Auth Validation -> JWT/Session established -> Redirect to Dashboard.
- **Rules**: Implement rate limiting, secure cookie storage, and clear error messaging without leaking account existence.

### 2. DASHBOARD
- **Overview, KPIs, Charts**
- **Flow**: Authenticated request -> API Service aggregates data -> Frontend renders Charts and KPIs.
- **Rules**: Optimize data fetching (caching/memoization) for performance. Read-only view based on user permissions.

### 3. LEAD MANAGEMENT
- **Leads, Follow-ups**
- **Flow**: View leads list -> Add/Edit Lead (Form Validation) -> API Validation -> Database update -> UI state update.
- **Rules**: Track lead status transitions and schedule follow-up reminders.

### 4. COMMERCE
- **Orders, Customers, Payments, Shipments, Returns, Refunds**
- **Flow**: Complex multi-step state management. E.g., Order creation -> Payment verification (Webhook) -> Inventory update -> Shipping trigger.
- **Rules**: Enforce transactional integrity in the database (MongoDB transactions) to ensure operations like "deduct inventory & create order" succeed or fail together.

### 5. CATALOGUE
- **Products, Categories, Inventory, Media Library**
- **Flow**: CRUD operations. Upload images -> Media API -> Save URLs -> Link to Product.
- **Rules**: Media upload validation (size, MIME type). Real-time inventory tracking to prevent overselling.

### 6. WEBSITE
- **Homepage CMS, Banners, Navigation**
- **Flow**: Admin inputs CMS content -> Form Validation -> API Service saves config -> Public site dynamically renders.
- **Rules**: Maintain a simple, clean interface for content entry. Ensure updates reflect instantly or via controlled cache revalidation.

### 7. CONTENT
- **About, Why A1 Gems, How It Works, Gemstone Guides, Testimonials, FAQs**
- **Flow**: Content Manager creates/edits pages -> Validation -> API Integration -> Saved to DB.
- **Rules**: Role-restricted access (Content Managers/Super Admins).

### 8. SEO
- **Global SEO Management**
- **Flow**: Admin manages global and page-specific meta tags/keywords -> API Validation -> Updates applied to public headers.
- **Rules**: Sanitize all inputs to prevent injection into HTML head tags.

### 9. SETTINGS
- **Business, Commerce, Shipping, Payment, COD, Tax/GST, Admin Users**
- **Flow**: Super Admin configures core settings -> Strict Form & API Validation -> Configuration propagates system-wide.
- **Rules**: Highest security clearance required. All changes must be recorded in System Audit Logs.

### 10. SYSTEM
- **Audit Logs**
- **Flow**: System actions trigger log events -> Saved securely -> Super Admin views logs via API.
- **Rules**: Logs must be immutable. Provide robust filtering, searching, and pagination.
