import dbConnect from '@/lib/db';
import { Rashi } from '@/lib/models/rashi';
import { unstable_cache } from 'next/cache';

export const getRashiList = unstable_cache(async () => {
  await dbConnect();
  return await Rashi.find().sort({ createdAt: 1 }).lean();
}, ['rashi-list'], { tags: ['rashi'], revalidate: 3600 });

export const getRashi = unstable_cache(async (slug: string) => {
  await dbConnect();
  return await Rashi.findOne({ slug }).lean();
}, ['rashi-by-slug'], { tags: ['rashi'], revalidate: 3600 });
