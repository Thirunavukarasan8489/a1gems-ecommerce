import { unstable_cache } from 'next/cache';
import dbConnect from '@/lib/db';
import { Category } from '@/lib/models/category';

export const getCategories = unstable_cache(async () => {
  await dbConnect();
  // Fetch active categories
  const categories = await Category.find({ status: 'ACTIVE' }).sort({ displayOrder: 1, createdAt: -1 }).lean();
  
  // Transform _id to string so it can be passed to client components safely
  return categories.map((cat: any) => ({
    ...cat,
    _id: cat._id.toString(),
  }));
}, ['public-categories'], { revalidate: 60, tags: ['categories'] });

export const getCategoryBySlug = unstable_cache(async (slug: string) => {
  await dbConnect();
  const category = await Category.findOne({ slug, status: 'ACTIVE' }).lean();
  if (!category) return null;

  return {
    ...category,
    _id: (category as any)._id.toString(),
  };
}, ['public-category'], { revalidate: 60, tags: ['categories'] });
