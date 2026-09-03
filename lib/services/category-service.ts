import { unstable_cache } from 'next/cache';
import dbConnect from '@/lib/db';
import { Category } from '@/lib/models/category';

const DEFAULT_CATEGORIES = [
  { _id: "cat-1", name: "Blue Sapphire / Neelam", slug: "blue-sapphire", gemColor: "#1f4fd8", displayOrder: 1, status: "ACTIVE" },
  { _id: "cat-2", name: "Ruby / Manik", slug: "ruby", gemColor: "#c81e4a", displayOrder: 2, status: "ACTIVE" },
  { _id: "cat-3", name: "Emerald / Panna", slug: "emerald", gemColor: "#10b481", displayOrder: 3, status: "ACTIVE" },
  { _id: "cat-4", name: "Yellow Sapphire / Pukhraj", slug: "yellow-sapphire", gemColor: "#c99a26", displayOrder: 4, status: "ACTIVE" },
  { _id: "cat-5", name: "Pearl / Moti", slug: "pearl", gemColor: "#e4daea", displayOrder: 5, status: "ACTIVE" },
  { _id: "cat-6", name: "Red Coral / Moonga", slug: "red-coral", gemColor: "#d946ef", displayOrder: 6, status: "ACTIVE" },
  { _id: "cat-7", name: "Hessonite / Gomed", slug: "hessonite", gemColor: "#855c19", displayOrder: 7, status: "ACTIVE" },
  { _id: "cat-8", name: "Cat's Eye / Lehsuniya", slug: "cats-eye", gemColor: "#059068", displayOrder: 8, status: "ACTIVE" },
  { _id: "cat-9", name: "Bracelets", slug: "bracelets", gemColor: "#7e6394", displayOrder: 9, status: "ACTIVE" },
];

export const getCategories = unstable_cache(async () => {
  try {
    await dbConnect();
    // Fetch categories (active first, fallback to all)
    let categories = await Category.find({ status: 'ACTIVE' }).sort({ displayOrder: 1, createdAt: -1 }).lean();
    if (!categories || categories.length === 0) {
      categories = await Category.find({}).sort({ displayOrder: 1, createdAt: -1 }).lean();
    }
    
    if (categories && categories.length > 0) {
      return categories.map((cat: any) => ({
        ...cat,
        _id: cat._id.toString(),
      }));
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
  
  return DEFAULT_CATEGORIES;
}, ['public-categories-v5'], { revalidate: 60, tags: ['categories'] });

export const getCategoryBySlug = unstable_cache(async (slug: string) => {
  try {
    await dbConnect();
    let category = await Category.findOne({ slug, status: 'ACTIVE' }).lean();
    if (!category) {
      category = await Category.findOne({ slug }).lean();
    }
    if (category) {
      return {
        ...category,
        _id: (category as any)._id.toString(),
      };
    }
  } catch (error) {
    console.error("Error fetching category by slug:", error);
  }

  return DEFAULT_CATEGORIES.find(c => c.slug === slug) || null;
}, ['public-category-by-slug-v5'], { revalidate: 60, tags: ['categories'] });
