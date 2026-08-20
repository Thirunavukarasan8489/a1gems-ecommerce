import { MetadataRoute } from 'next';
import dbConnect from '@/lib/db';
import { Product } from '@/lib/models/product';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://a1gems.com';

  // Static routes
  const staticRoutes = ['', '/about', '/contact', '/faqs', '/collections', '/products', '/guides'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    await dbConnect();
    // Dynamic Product Routes
    const products = await Product.find({ stockStatus: { $ne: 'OUT_OF_STOCK' } }).select('slug updatedAt');
    
    const productRoutes = products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: product.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...productRoutes];
  } catch (error) {
    console.error('Sitemap generation failed:', error);
    return staticRoutes;
  }
}
