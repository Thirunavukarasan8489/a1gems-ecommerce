# A1 GEMS — Admin Panel Screen-wise Specification

## 1. Purpose

This document defines the A1 GEMS Admin Panel screen-by-screen structure based on the approved project flow.

The Admin Panel contains **71 screens** across Authentication, Dashboard, Leads, Orders, Customers, Payments, Shipments, Returns, Refunds, Products, Categories, Inventory, Media, Website, Content, Analytics, and Settings.

## 2. Admin Roles

Initial roles:

- Super Admin
- Content Manager
- Lead Manager

Commerce permissions should be assigned to these roles rather than creating unnecessary additional roles.

---

# 3. Admin Navigation

```text
DASHBOARD

LEAD MANAGEMENT
├── Leads
└── Follow-ups

COMMERCE
├── Orders
├── Customers
├── Payments
├── Shipments
├── Returns
└── Refunds

CATALOGUE
├── Products
├── Categories
├── Inventory
└── Media Library

WEBSITE
├── Homepage
├── Banners
└── Navigation

CONTENT
├── About
├── Why A1 Gems
├── How It Works
├── Gemstone Guides
├── Testimonials
└── FAQs

ANALYTICS

SEO
└── SEO Management

SETTINGS
├── General
├── Business
├── Commerce
├── Shipping
├── Payments
├── COD
├── Tax / GST
├── Notifications
├── Admin Users
├── Roles
└── Audit Logs
```

---

# 4. Authentication

## 4.1 Login

**Route**

`/admin/login`

**Purpose**

Authenticate an administrator.

**Screen Sections**

- Logo / Brand
- Email
- Password
- Remember Me
- Login
- Forgot Password
- Validation/Error Message

**Actions**

- Login
- Forgot Password

**Success Flow**

```text
Login
→ Validate Credentials
→ Validate Account Status
→ Validate Role
→ Dashboard
```

---

## 4.2 Forgot Password

**Route**

`/admin/forgot-password`

**Fields**

- Email

**Actions**

- Send Reset Link
- Back to Login

**Flow**

```text
Forgot Password
→ Enter Email
→ Submit
→ Email Sent
→ Reset Password
```

---

## 4.3 Reset Password

**Route**

`/admin/reset-password`

**Fields**

- New Password
- Confirm Password

**Actions**

- Reset Password

**Flow**

```text
Reset Link
→ Validate Token
→ New Password
→ Confirm Password
→ Password Updated
→ Login
```

---

# 5. Dashboard

## 5.1 Dashboard

**Route**

`/admin`

**Purpose**

Provide a business overview of commerce and lead activity.

### Commerce KPIs

- Total Orders
- Today's Orders
- Revenue
- Pending Payments
- Pending Orders
- Low Stock
- Returns

### Lead KPIs

- Total Leads
- New Leads
- Contact Enquiries
- Product Enquiries
- WhatsApp Clicks

### Additional Sections

- Sales Chart
- Order Status Summary
- Recent Orders
- Recent Leads
- Low Stock Products
- Recent Activity

**Primary Actions**

- View Orders
- View Leads
- View Low Stock
- View Payments
- View Returns

---

# 6. Lead Management

## 6.1 Lead List

**Route**

`/admin/leads`

**Purpose**

View and manage all enquiries.

### Filters

- Search
- Lead Status
- Assigned User
- Source
- Product
- Date Range

### Table

- Lead ID
- Customer
- Phone
- Email
- Product
- Source
- Status
- Assigned To
- Follow-up Date
- Created Date
- Actions

### Actions

- View
- Edit
- Assign
- Change Status
- Add Note
- Delete/Archive where permitted

---

## 6.2 Create Lead

**Route**

`/admin/leads/create`

**Customer Information**

- Name
- Phone
- WhatsApp
- Email
- Location

**Enquiry Information**

- Product
- Category
- Message
- Source

**Management**

- Status
- Assigned To
- Notes
- Follow-up Date

**Actions**

- Create Lead
- Cancel

---

## 6.3 Lead Detail

**Route**

`/admin/leads/[id]`

### Sections

#### Customer

- Name
- Phone
- WhatsApp
- Email
- Location

#### Enquiry

- Product
- Category
- Message
- Source
- Date

#### Management

- Status
- Assigned To
- Notes
- Follow-up Date

#### Actions Taken

- Call
- WhatsApp
- Email
- Add Note
- Change Status
- Assign

#### Timeline

- Lead Created
- Contacted
- Follow-up
- Status Changes
- Notes
- Assignment Changes

---

## 6.4 Edit Lead

**Route**

`/admin/leads/[id]/edit`

Editable:

- Customer information
- Enquiry information
- Status
- Assigned To
- Notes
- Follow-up Date

---

## 6.5 Follow-ups

**Route**

`/admin/leads/follow-ups`

### Views

- Today's Follow-ups
- Upcoming
- Overdue
- Completed

### Table

- Customer
- Product
- Assigned To
- Follow-up Date
- Status
- Last Contact
- Actions

### Actions

- Complete Follow-up
- Reschedule
- Add Note
- Call
- WhatsApp
- Email

---

## 6.6 Lead Analytics

**Route**

`/admin/leads/analytics`

### Metrics

- Total Leads
- New Leads
- Contacted
- Follow-ups
- Qualified
- Converted
- Closed
- Spam

### Reports

- Leads by Source
- Leads by Product
- Leads by Status
- Leads by Date
- Conversion Rate
- Assigned User Performance

---

# 7. Orders

## 7.1 Order List

**Route**

`/admin/orders`

### Filters

- Order Number
- Customer
- Purchase Type
- Payment Status
- Order Status
- Date

### Table

- Order Number
- Customer
- Purchase Type
- Total
- Payment Status
- Order Status
- Date
- Actions

### Actions

- View
- Process
- Cancel
- Track Shipment

---

## 7.2 Order Detail

**Route**

`/admin/orders/[id]`

### Customer

- Name
- Phone
- Email
- Customer Type

### Order Items

- Product
- SKU
- Quantity
- Unit Price
- Total

### Addresses

- Shipping Address
- Billing Address

### GST

- GSTIN
- Legal Business Name
- GST Address
- Tax Information

### Pricing

- Subtotal
- Shipping
- Tax
- Discount if applicable
- Grand Total

### Payment

- Payment Method
- Payment Status
- Transaction ID
- Payment Date

### Shipment

- Courier
- Tracking Number
- Shipment Status

### Timeline

- Order Created
- Payment Pending
- Payment Confirmed
- Order Confirmed
- Processing
- Packed
- Shipped
- Out for Delivery
- Delivered

### Exceptions

- Cancellation
- Return
- Refund

---

## 7.3 Order Processing

**Route**

`/admin/orders/[id]/processing`

### Processing Steps

```text
Payment Verified
→ Order Confirmed
→ Inventory Finalized
→ Processing
→ Packing
→ Shipment Created
```

### Actions

- Confirm Order
- Start Processing
- Mark Packed
- Create Shipment

---

## 7.4 Cancelled Orders

**Route**

`/admin/orders/cancelled`

### Information

- Order
- Customer
- Cancellation Reason
- Cancelled Date
- Payment Status
- Refund Status
- Inventory Release Status

---

## 7.5 Order Analytics

**Route**

`/admin/orders/analytics`

### Metrics

- Total Orders
- Confirmed
- Processing
- Packed
- Shipped
- Delivered
- Cancelled
- Failed
- Returned

### Reports

- Orders by Date
- Orders by Purchase Type
- Orders by Status
- Average Order Value
- Revenue

---

# 8. Customers

## 8.1 Customer List

**Route**

`/admin/customers`

### Filters

- Search
- Personal / Business
- GST Registered
- Order Count
- Date

### Table

- Customer
- Type
- Phone
- Email
- Orders
- Total Spend
- Created Date
- Actions

---

## 8.2 Customer Detail

**Route**

`/admin/customers/[id]`

### Sections

- Customer Profile
- Contact Information
- Personal / Business Information
- GST Information
- Billing Address
- Shipping Address
- Orders
- Payments
- Returns
- Refunds
- Activity Timeline

---

## 8.3 Business Customers

**Route**

`/admin/customers/business`

### Fields

- Business Name
- Contact Person
- GST Status
- GSTIN
- Legal Business Name
- GST Address
- Billing Address
- Shipping Address
- Orders
- Revenue

---

# 9. Payments

## 9.1 Payment List

**Route**

`/admin/payments`

### Filters

- Payment Method
- Payment Status
- Date
- Order
- Customer

### Methods

- UPI
- Card
- Net Banking
- COD
- Bank Transfer

---

## 9.2 Payment Detail

**Route**

`/admin/payments/[id]`

### Information

- Order
- Customer
- Amount
- Payment Method
- Transaction ID
- Gateway
- Payment Status
- Created Date
- Verified Date

### Actions

- Verify
- Retry
- View Order

---

## 9.3 Pending Payments

**Route**

`/admin/payments/pending`

### Use

Manage payments requiring verification or completion.

Particularly important for:

- Bank Transfer
- Pending gateway payments

---

## 9.4 Failed Payments

**Route**

`/admin/payments/failed`

### Information

- Order
- Customer
- Amount
- Payment Method
- Failure Reason
- Date

### Actions

- Retry
- Contact Customer
- View Order

---

## 9.5 Bank Transfers

**Route**

`/admin/payments/bank-transfer`

### Information

- Order
- Customer
- Amount
- Transfer Reference
- Transfer Date
- Payment Status

### Actions

- Verify Payment
- Reject
- Add Note

**Flow**

```text
Payment Pending
→ Customer Transfers
→ Admin Verification
→ Payment Confirmed
→ Order Processing
```

---

# 10. Shipments

## 10.1 Shipment List

**Route**

`/admin/shipments`

### Table

- Shipment ID
- Order
- Customer
- Courier
- Tracking Number
- Shipment Status
- Created Date

---

## 10.2 Shipment Detail

**Route**

`/admin/shipments/[id]`

### Sections

- Order Information
- Customer
- Shipping Address
- Courier
- Tracking Number
- Shipment Status
- Shipment Timeline

### Actions

- Create Shipment
- Update Tracking
- Mark Shipped
- Update Delivery Status

---

## 10.3 Pending Shipments

**Route**

`/admin/shipments/pending`

Shows:

- Packed orders
- Shipment not created
- Shipment created but not dispatched

---

## 10.4 Delivered Shipments

**Route**

`/admin/shipments/delivered`

Shows:

- Delivered orders
- Delivery date
- Tracking number
- Courier
- Delivery confirmation

---

# 11. Returns

## 11.1 Return List

**Route**

`/admin/returns`

### Table

- Return ID
- Order
- Customer
- Product
- Reason
- Status
- Requested Date

---

## 11.2 Return Detail

**Route**

`/admin/returns/[id]`

### Sections

- Customer
- Order
- Product
- Return Reason
- Eligibility
- Pickup
- Inspection
- Approval
- Refund

### Timeline

```text
Return Requested
→ Admin Review
→ Approved
→ Pickup
→ Product Received
→ Inspection
→ Return Approved
→ Refund
```

---

## 11.3 Return Review

**Route**

`/admin/returns/review`

### Actions

- Approve
- Reject
- Request Information
- Add Note
- Schedule Pickup

---

# 12. Refunds

## 12.1 Refund List

**Route**

`/admin/refunds`

### Table

- Refund ID
- Order
- Customer
- Amount
- Payment Method
- Status
- Created Date

---

## 12.2 Refund Detail

**Route**

`/admin/refunds/[id]`

### Information

- Order
- Customer
- Refund Amount
- Original Payment
- Refund Method
- Refund Reference
- Status
- Timeline

---

## 12.3 Pending Refunds

**Route**

`/admin/refunds/pending`

### Actions

- Process Refund
- Retry
- Mark Completed
- Add Note

### Statuses

- Pending
- Processing
- Completed
- Failed

---

# 13. Products

## 13.1 Product List

**Route**

`/admin/products`

### Filters

- Search
- Category
- Purchase Type
- Stock Status
- Published Status

### Table

- Product Image
- Product Name
- SKU
- Category
- Price
- Stock
- Purchase Type
- Status
- Updated Date
- Actions

### Actions

- Create
- Edit
- Preview
- Publish
- Unpublish
- Delete

---

## 13.2 Create Product

**Route**

`/admin/products/create`

### Step 1 — Basic Information

- Name
- Slug
- Category
- Short Description
- Description

### Step 2 — Pricing

- Selling Price
- Compare Price

### Step 3 — Inventory

- SKU
- Stock Quantity
- Reserved Quantity
- Low Stock Threshold
- Stock Status

### Step 4 — Purchase

- Purchase Type
- Enquiry Enabled
- WhatsApp Enabled

Purchase Types:

```text
ENQUIRY_ONLY
BUY_ONLY
BUY_AND_ENQUIRE
```

### Step 5 — Specifications

- Material
- Stone
- Size
- Weight
- Origin
- Certification

### Step 6 — Images

- Primary Image
- Gallery
- Alt Text

### Step 7 — SEO

- Meta Title
- Meta Description
- Keywords
- OG Image

### Step 8 — Preview

Review complete product before publishing.

### Step 9 — Publish

- Draft
- Publish
- Schedule if supported

---

## 13.3 Product Detail / Preview

**Route**

`/admin/products/[id]`

### Sections

- Product Information
- Pricing
- Inventory
- Specifications
- Images
- Purchase Settings
- Lead Settings
- SEO
- Publishing Status

### Actions

- Edit
- Preview
- Publish
- Unpublish

---

## 13.4 Edit Product

**Route**

`/admin/products/[id]/edit`

All product fields should be editable according to role permissions.

---

# 14. Categories

## 14.1 Category List

**Route**

`/admin/categories`

### Table

- Category Name
- Slug
- Image
- Product Count
- Display Order
- Status
- Updated Date

### Actions

- Create
- Edit
- Reorder
- Publish
- Unpublish

---

## 14.2 Create Category

**Route**

`/admin/categories/create`

### Fields

- Name
- Slug
- Description
- Image
- SEO
- Display Order
- Publish Status

---

## 14.3 Edit Category

**Route**

`/admin/categories/[id]/edit`

Editable:

- Name
- Slug
- Description
- Image
- SEO
- Display Order
- Publish Status

---

# 15. Inventory

## 15.1 Inventory Dashboard

**Route**

`/admin/inventory`

### KPIs

- Total Products
- In Stock
- Low Stock
- Out of Stock
- Reserved Stock

---

## 15.2 Inventory List

**Route**

`/admin/inventory/list`

### Table

- Product
- SKU
- Stock Quantity
- Reserved Quantity
- Available Quantity
- Low Stock Threshold
- Stock Status

Formula:

```text
Available Quantity
=
Stock Quantity - Reserved Quantity
```

---

## 15.3 Inventory Detail

**Route**

`/admin/inventory/[id]`

### Sections

- Product
- SKU
- Current Stock
- Reserved Stock
- Available Stock
- Stock Threshold
- Stock History
- Recent Orders

---

## 15.4 Stock Adjustment

**Route**

`/admin/inventory/[id]/adjust`

### Fields

- Adjustment Type
- Quantity
- Reason
- Notes

### Adjustment Types

- Add Stock
- Remove Stock
- Correction

### Flow

```text
Stock Adjustment
→ Validate
→ Update Inventory
→ Record Inventory History
→ Audit Log
```

---

# 16. Media

## 16.1 Media Library

**Route**

`/admin/media`

### Categories

- Products
- Categories
- Banners
- Guides
- Testimonials
- General

### Features

- Upload
- Search
- Filter
- Preview
- Copy URL
- Delete
- Select Media

### Storage

```text
Admin Upload
→ Cloudinary
→ Store Metadata
→ Media Library
```

---

# 17. Website

## 17.1 Homepage

**Route**

`/admin/website/homepage`

### Sections

- Announcement Bar
- Hero
- Trust Highlights
- Promotional Banners
- Featured Categories
- Featured Products
- Why Choose A1 Gems
- Gemstone Showcase
- Bracelet Showcase
- How It Works
- Consultation CTA
- About
- Testimonials
- FAQ
- Final CTA

### Actions

- Edit Section
- Enable / Disable
- Reorder
- Preview
- Publish

---

## 17.2 Banners

**Route**

`/admin/website/banners`

### Table

- Banner
- Type
- Desktop Image
- Mobile Image
- CTA
- Status
- Schedule
- Actions

### Banner Types

- Hero
- Promotional
- Category
- Lead Generation

---

## 17.3 Create Banner

**Route**

`/admin/website/banners/create`

### Fields

- Banner Type
- Title
- Subtitle
- Description
- Desktop Image
- Mobile Image
- CTA Label
- CTA URL
- Schedule
- Status

### Flow

```text
Create Banner
→ Upload Images
→ Configure Content
→ Configure CTA
→ Schedule
→ Preview
→ Publish
```

---

## 17.4 Edit Banner

**Route**

`/admin/website/banners/[id]/edit`

Editable:

- Content
- Images
- CTA
- Schedule
- Status

---

## 17.5 Navigation

**Route**

`/admin/website/navigation`

### Manage

- Main Navigation
- Footer Navigation
- Menu Items
- Display Order
- Links
- Visibility

### Actions

- Add Item
- Edit
- Reorder
- Enable / Disable

---

# 18. Content

## 18.1 Content Pages

**Route**

`/admin/content`

### Pages

- About
- Why A1 Gems
- How It Works

### Actions

- Edit
- Preview
- Publish
- Unpublish

---

## 18.2 Gemstone Guides

**Route**

`/admin/content/guides`

### Table

- Title
- Slug
- Category
- Featured Image
- Status
- Published Date
- Actions

---

## 18.3 Guide Editor

**Route**

`/admin/content/guides/create`

### Fields

- Title
- Slug
- Summary
- Content
- Featured Image
- SEO
- Status

### Actions

- Save Draft
- Preview
- Publish

---

## 18.4 FAQs

**Route**

`/admin/content/faqs`

### Fields

- Question
- Answer
- Display Order
- Status

### Actions

- Create
- Edit
- Reorder
- Enable / Disable

---

## 18.5 Testimonials

**Route**

`/admin/content/testimonials`

### Fields

- Customer Name
- Testimonial
- Image
- Rating if required
- Display Order
- Status

### Actions

- Create
- Edit
- Reorder
- Enable / Disable

---

# 19. Analytics

## 19.1 Commerce Analytics

**Route**

`/admin/analytics/commerce`

### Metrics

- Orders
- Revenue
- Average Order Value
- Pending Orders
- Cancelled Orders
- Returned Orders

---

## 19.2 Sales Analytics

**Route**

`/admin/analytics/sales`

### Reports

- Daily Sales
- Weekly Sales
- Monthly Sales
- Sales by Payment Method
- Sales by Purchase Type

---

## 19.3 Product Analytics

**Route**

`/admin/analytics/products`

### Metrics

- Product Views
- Product Enquiries
- Product Sales
- Top Products
- Low Performing Products

---

## 19.4 Customer Analytics

**Route**

`/admin/analytics/customers`

### Metrics

- Total Customers
- Personal Customers
- Business Customers
- New Customers
- Repeat Customers
- Customer Revenue

---

## 19.5 Lead Analytics

**Route**

`/admin/analytics/leads`

### Metrics

- Total Leads
- Product Enquiries
- Contact Enquiries
- WhatsApp Clicks
- Conversion Rate

---

## 19.6 Inventory Analytics

**Route**

`/admin/analytics/inventory`

### Metrics

- Stock Value
- Low Stock
- Out of Stock
- Reserved Stock
- Stock Movement

---

# 20. Settings

## 20.1 General

**Route**

`/admin/settings/general`

### Settings

- Site Name
- Logo
- Favicon
- Contact Email
- Contact Phone
- WhatsApp
- Timezone
- Currency
- Default Language

---

## 20.2 Business

**Route**

`/admin/settings/business`

### Fields

- Business Name
- Legal Name
- Address
- Phone
- Email
- GSTIN
- Business Information

---

## 20.3 Commerce

**Route**

`/admin/settings/commerce`

### Settings

- Currency
- Order Number Format
- Minimum Order Value
- Inventory Rules
- Cart Expiry
- Order Rules

---

## 20.4 Shipping

**Route**

`/admin/settings/shipping`

### Settings

- Shipping Fee
- Free Shipping Threshold if applicable
- Service Areas
- Courier Configuration
- Delivery Rules

The current requirement specifies fixed-price shipping with the amount configurable from Admin.

---

## 20.5 Payments

**Route**

`/admin/settings/payments`

### Methods

- UPI
- Card
- Net Banking
- COD
- Bank Transfer

### Configuration

- Enable / Disable
- Gateway Configuration
- Test / Live Mode
- Webhook Configuration

---

## 20.6 COD

**Route**

`/admin/settings/cod`

### Rules

- Enable COD
- PIN Code Rules
- Maximum Order Value
- Product Eligibility
- Customer Eligibility

---

## 20.7 Tax / GST

**Route**

`/admin/settings/tax`

### Settings

- Tax Rules
- GST Rates
- Business GST Rules
- Tax Calculation Rules
- Invoice Configuration

Tax rates should remain configurable rather than hardcoded.

---

## 20.8 Notifications

**Route**

`/admin/settings/notifications`

### Notification Types

- New Lead
- New Order
- Payment Success
- Payment Failed
- Order Confirmed
- Order Shipped
- Order Delivered
- Cancellation
- Return
- Refund

### Channels

- Email
- WhatsApp where supported
- Admin Notification

---

## 20.9 Admin Users

**Route**

`/admin/settings/admin-users`

### Table

- Name
- Email
- Role
- Status
- Last Login
- Created Date

### Actions

- Create User
- Edit
- Activate
- Deactivate
- Reset Password

---

## 20.10 Roles

**Route**

`/admin/settings/roles`

### Roles

- Super Admin
- Content Manager
- Lead Manager

### Permission Groups

- Dashboard
- Leads
- Orders
- Customers
- Payments
- Shipments
- Returns
- Refunds
- Products
- Categories
- Inventory
- Media
- Website
- Content
- Analytics
- Settings
- Audit Logs

### Permission Types

- View
- Create
- Edit
- Delete
- Publish
- Approve
- Process

---

## 20.11 Audit Logs

**Route**

`/admin/settings/audit-logs`

### Table

- User
- Action
- Module
- Entity
- Entity ID
- IP / Session information where permitted
- Timestamp

### Examples

```text
Product Created
Product Updated
Product Published
Order Status Changed
Payment Verified
Inventory Adjusted
Lead Assigned
Return Approved
Refund Processed
Admin User Updated
Settings Changed
```

---

# 21. Admin Screen Count

| # | Module | Screens |
|---:|---|---:|
| 1 | Authentication | 3 |
| 2 | Dashboard | 1 |
| 3 | Leads | 6 |
| 4 | Orders | 5 |
| 5 | Customers | 3 |
| 6 | Payments | 5 |
| 7 | Shipments | 4 |
| 8 | Returns | 3 |
| 9 | Refunds | 3 |
| 10 | Products | 4 |
| 11 | Categories | 3 |
| 12 | Inventory | 4 |
| 13 | Media | 1 |
| 14 | Website | 5 |
| 15 | Content | 5 |
| 16 | Analytics | 6 |
| 17 | Settings | 11 |
| | **TOTAL** | **71** |

---

# 22. Important Admin State Flows

## Lead

```text
NEW
→ CONTACTED
→ FOLLOW_UP
→ QUALIFIED
→ CONVERTED

Alternative:
→ CLOSED
→ SPAM
```

## Order

```text
PAYMENT_PENDING
→ CONFIRMED
→ PROCESSING
→ PACKED
→ SHIPPED
→ OUT_FOR_DELIVERY
→ DELIVERED
```

## Return

```text
REQUESTED
→ REVIEW
→ APPROVED / REJECTED
→ PICKUP
→ RECEIVED
→ INSPECTION
→ RETURN_APPROVED
→ REFUND
```

## Refund

```text
PENDING
→ PROCESSING
→ COMPLETED

Failure:
→ FAILED
```

---

# 23. Admin Page Standard Layout

Every list page should follow a reusable structure:

```text
┌─────────────────────────────────────────────┐
│ Breadcrumb                                  │
│ Page Title                    Primary CTA   │
├─────────────────────────────────────────────┤
│ Search / Filters / Date Range               │
├─────────────────────────────────────────────┤
│ Bulk Actions                                │
├─────────────────────────────────────────────┤
│ Data Table                                  │
│                                             │
│                                             │
├─────────────────────────────────────────────┤
│ Pagination                                  │
└─────────────────────────────────────────────┘
```

Every detail page should follow:

```text
┌─────────────────────────────────────────────┐
│ Breadcrumb                                  │
│ Title                         Actions        │
├───────────────────────┬─────────────────────┤
│ Main Information      │ Status / Summary    │
│                       │                     │
│                       │                     │
├───────────────────────┴─────────────────────┤
│ Related Data / Timeline                    │
└─────────────────────────────────────────────┘
```

Every create/edit page should follow:

```text
Header
 ↓
Form Sections
 ↓
Validation
 ↓
Save Draft / Save / Publish
 ↓
Success / Error
```

---

# 24. Critical Admin Permissions

The following operations require strong authorization and audit logging:

- Product publish/unpublish
- Inventory adjustment
- Payment verification
- Order cancellation
- Order status changes
- Return approval
- Refund processing
- Tax/GST configuration
- Payment configuration
- COD configuration
- Admin user management
- Role/permission changes
- Business settings changes

---

# 25. Admin Technical Flow

```text
Admin Browser
 ↓
Next.js Admin Route
 ↓
Authentication
 ↓
RBAC Authorization
 ↓
Request Validation
 ↓
Service Layer
 ↓
Business Rules
 ↓
MongoDB
 ↓
External Service
 ├── Cloudinary
 ├── Payment Gateway
 ├── Shipping Provider
 └── Email / WhatsApp
 ↓
Audit Log
 ↓
Cache Revalidation
 ↓
Admin UI
```

---

# 26. Final Admin Workflow

```text
ADMIN LOGIN
    ↓
DASHBOARD
    │
    ├── LEADS
    │    ├── Leads
    │    ├── Follow-ups
    │    └── Lead Analytics
    │
    ├── COMMERCE
    │    ├── Orders
    │    ├── Customers
    │    ├── Payments
    │    ├── Shipments
    │    ├── Returns
    │    └── Refunds
    │
    ├── CATALOGUE
    │    ├── Products
    │    ├── Categories
    │    ├── Inventory
    │    └── Media
    │
    ├── WEBSITE
    │    ├── Homepage
    │    ├── Banners
    │    └── Navigation
    │
    ├── CONTENT
    │    ├── Pages
    │    ├── Guides
    │    ├── FAQs
    │    └── Testimonials
    │
    ├── ANALYTICS
    │    ├── Commerce
    │    ├── Sales
    │    ├── Products
    │    ├── Customers
    │    ├── Leads
    │    └── Inventory
    │
    ├── SEO
    │
    └── SETTINGS
         ├── General
         ├── Business
         ├── Commerce
         ├── Shipping
         ├── Payments
         ├── COD
         ├── Tax / GST
         ├── Notifications
         ├── Admin Users
         ├── Roles
         └── Audit Logs
```

## Source Reference

This screen-wise specification is derived from the uploaded A1 GEMS project documentation, particularly the documented Admin Panel flow, sidebar, screen count, catalogue, commerce, lead, CMS, SEO, and platform requirements.
