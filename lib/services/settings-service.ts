import dbConnect from '@/lib/db';
import { Settings } from '@/lib/models/settings';
import { unstable_cache } from 'next/cache';

export const getCommerceSettings = unstable_cache(async () => {
  await dbConnect();
  let settings = await Settings.findOne().lean();
  if (!settings) {
    settings = {
      flatShippingFee: 20000,
      freeShippingThreshold: 2500000,
      currency: "INR",
    };
  }
  return settings;
}, ['commerce-settings'], { tags: ['settings'], revalidate: 3600 });

export async function shippingFor(subtotalPaise: number) {
  if (subtotalPaise <= 0) return 0;
  const settings = await getCommerceSettings();
  return subtotalPaise >= settings.freeShippingThreshold
    ? 0
    : settings.flatShippingFee;
}
