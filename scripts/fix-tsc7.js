const fs = require('fs');

function replaceInFile(filepath, replaces) {
    if (!fs.existsSync(filepath)) return console.log('not found: ' + filepath);
    let content = fs.readFileSync(filepath, 'utf8');
    for (const r of replaces) content = content.replace(r.search, r.replace);
    fs.writeFileSync(filepath, content);
}

replaceInFile('E:/freelance-work/a1gems-ecommerce/app/(public)/checkout/page.tsx', [
    { search: /whatsappLink\(\n                    "Hi A1 Gems, I would like to place an order from my cart.",\n                  \)/, replace: 'whatsappLink(null, "Hi A1 Gems, I would like to place an order from my cart.")' }
]);

replaceInFile('E:/freelance-work/a1gems-ecommerce/app/(public)/faqs/page.tsx', [
    { search: /whatsappLink\(\n                  "Hi A1 Gems, I have a question",\n                \)/, replace: 'whatsappLink(business, "Hi A1 Gems, I have a question")' }
]);

replaceInFile('E:/freelance-work/a1gems-ecommerce/app/(public)/track-order/page.tsx', [
    { search: /whatsappLink\(\n                  "Hi A1 Gems, I need an update on my order.",\n                \)/, replace: 'whatsappLink(business, "Hi A1 Gems, I need an update on my order.")' }
]);

replaceInFile('E:/freelance-work/a1gems-ecommerce/components/public/product/product-card.tsx', [
    { search: /export function ProductCard\(\{ product \}: \{ product: any \}\) \{/, replace: 'export function ProductCard({ product }: { product: any }) {\n  const category: any = undefined;' },
    { search: /\{categoryTerms\(category\?.name \|\| ""\)\.primary\}/, replace: '{category ? categoryTerms(category.name).primary : ""}' }
]);

replaceInFile('E:/freelance-work/a1gems-ecommerce/components/public/product/product-filters.tsx', [
    { search: /export function ProductFilters\(\{ filters \}: \{ filters: any \}\) \{/, replace: 'export function ProductFilters({ filters }: { filters: any }) {\n  const categories: any[] = [];' }
]);
