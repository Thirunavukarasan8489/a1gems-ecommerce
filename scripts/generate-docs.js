/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const publicPages = [
  'home.md', 'about.md', 'products-all.md', 'products-categories.md', 'products-category-list.md', 'product-detail.md',
  'search-results.md', 'guides-listing.md', 'guide-detail.md', 'contact-form.md', 'faqs.md', 'testimonials-listing.md',
  'cart.md', 'cart-empty.md', 'checkout-customer-info.md', 'checkout-personal.md', 'checkout-business.md', 'checkout-gst.md',
  'checkout-address.md', 'checkout-shipping.md', 'checkout-review.md', 'checkout-payment.md', 'order-confirmation.md',
  'track-order.md', 'account-profile.md', 'account-order-details.md', 'account-cart.md', 'account-payment-details.md',
  'collections.md', 'why-a1-gems.md'
];

const adminPages = [
  'auth-login.md', 'auth-forgot-password.md', 'auth-reset-password.md', 'dashboard-kpi.md', 'dashboard-charts.md', 'dashboard-recent-activity.md',
  'leads-list.md', 'leads-create.md', 'leads-detail.md', 'leads-edit.md', 'leads-follow-ups.md', 'leads-analytics.md',
  'orders-list.md', 'orders-detail.md', 'orders-processing.md', 'orders-cancelled.md', 'orders-analytics.md',
  'customers-list.md', 'customers-detail.md', 'customers-business.md',
  'payments-list.md', 'payments-detail.md', 'payments-pending.md', 'payments-failed.md', 'payments-bank-transfer.md',
  'shipments-list.md', 'shipments-detail.md', 'shipments-pending.md', 'shipments-delivered.md',
  'returns-list.md', 'returns-detail.md', 'returns-review.md',
  'refunds-list.md', 'refunds-detail.md', 'refunds-pending.md',
  'products-list.md', 'products-create.md', 'products-detail-preview.md', 'products-edit.md',
  'categories-list.md', 'categories-create.md', 'categories-edit.md',
  'inventory-dashboard.md', 'inventory-list.md', 'inventory-detail.md', 'inventory-stock-adjustment.md',
  'media-library.md',
  'website-homepage.md', 'website-banners.md', 'website-create-banner.md', 'website-edit-banner.md', 'website-navigation.md',
  'content-pages.md', 'content-guides.md', 'content-guide-editor.md', 'content-faqs.md', 'content-testimonials.md',
  'analytics-commerce.md', 'analytics-sales.md', 'analytics-products.md', 'analytics-customers.md', 'analytics-leads.md', 'analytics-inventory.md',
  'settings-general.md', 'settings-business.md', 'settings-commerce.md', 'settings-shipping.md', 'settings-payments.md', 'settings-cod.md',
  'settings-tax-gst.md', 'settings-notifications.md', 'settings-admin-users.md', 'settings-roles.md', 'settings-audit-logs.md'
];

function scaffoldFiles(baseDir, files) {
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }
  
  files.forEach(file => {
    const filePath = path.join(baseDir, file);
    const title = file.replace('.md', '').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const content = `# ${title}

## Description
Brief description of the page purpose.

## Scope
Defines the boundaries and reach of this specific page/component within the overall application.

## Rules
- Business logic constraints
- Validation rules (e.g., Zod schemas)
- Role-based access control (RBAC) requirements

## Flow
- Step-by-step user journey or data traversal through this screen.
- Preceding screen -> This screen -> Next action/screen.

## Process
- Backend processes triggered
- Transactions involved (e.g., MongoDB transactions)
- External integrations (e.g., Payment Gateway, Email)

## Components Used
- List of components (Public or Admin library)

## State Management
- Local state
- Server state

## API Requirements
- Endpoints needed
- Required parameters and expected responses
`;
    fs.writeFileSync(filePath, content);
  });
}

scaffoldFiles(path.join(__dirname, 'docs/public'), publicPages);
scaffoldFiles(path.join(__dirname, 'docs/admin'), adminPages);
console.log('Scaffolding complete.');
