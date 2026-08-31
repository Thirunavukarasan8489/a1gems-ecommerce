const fs = require('fs');

function replaceInFile(filepath, replaces) {
    if (!fs.existsSync(filepath)) return console.log('not found: ' + filepath);
    let content = fs.readFileSync(filepath, 'utf8');
    for (const r of replaces) content = content.replace(r.search, r.replace);
    fs.writeFileSync(filepath, content);
}

replaceInFile('E:/freelance-work/a1gems-ecommerce/app/(public)/page.tsx', [
    { search: /import \{ getRashiList \} from "@\/lib\/services\/rashi-service";/, replace: 'import { getRashiList } from "@/lib/services/rashi-service";\nimport { getNavData } from "@/lib/services/nav-service";' },
    { search: /const categories = await getCategories\(\);/, replace: 'const categories = await getCategories();\n  const navData = await getNavData();' },
    { search: /<ConsultationCta business=\{null\} \/>/, replace: '<ConsultationCta business={navData.business} />' }
]);
