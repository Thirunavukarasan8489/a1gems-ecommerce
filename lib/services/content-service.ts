import { unstable_cache } from 'next/cache';
import dbConnect from '@/lib/db';
import { Guide } from '@/lib/models/guide';
import { FAQ } from '@/lib/models/faq';
import { Testimonial } from '@/lib/models/testimonial';
import { Policy } from '@/lib/models/policy';

// Prevent Turbopack tree-shaking
if (!Guide) console.warn("Guide model not loaded");
if (!FAQ) console.warn("FAQ model not loaded");
if (!Testimonial) console.warn("Testimonial model not loaded");
if (!Policy) console.warn("Policy model not loaded");

export const getGuides = unstable_cache(async () => {
  await dbConnect();
  const guides = await Guide.find({ isActive: true }).sort({ displayOrder: 1, createdAt: -1 }).lean();
  return guides.map((g: any) => ({ ...g, _id: g._id.toString() }));
}, ['public-guides'], { revalidate: 60, tags: ['content'] });

export const getGuideBySlug = unstable_cache(async (slug: string) => {
  await dbConnect();
  const guide = await Guide.findOne({ slug, isActive: true }).lean();
  if (!guide) return null;
  return { ...guide, _id: (guide as any)._id.toString() };
}, ['public-guide-slug'], { revalidate: 60, tags: ['content'] });

export const getFaqs = unstable_cache(async () => {
  await dbConnect();
  const faqs = await FAQ.find({ isActive: true }).sort({ displayOrder: 1, createdAt: -1 }).lean();
  return faqs.map((f: any) => ({ ...f, _id: f._id.toString() }));
}, ['public-faqs'], { revalidate: 60, tags: ['content'] });

export const getTestimonials = unstable_cache(async () => {
  await dbConnect();
  const t = await Testimonial.find({ isActive: true }).sort({ displayOrder: 1, createdAt: -1 }).populate('productReference').lean();
  return t.map((item: any) => ({ 
    ...item, 
    _id: item._id.toString(),
    productReference: item.productReference ? {
      ...item.productReference,
      _id: item.productReference._id.toString()
    } : null
  }));
}, ['public-testimonials'], { revalidate: 60, tags: ['content'] });

export const getPolicies = unstable_cache(async () => {
  await dbConnect();
  const policies = await Policy.find({ isActive: true }).lean();
  return policies.map((p: any) => ({ ...p, _id: p._id.toString() }));
}, ['public-policies'], { revalidate: 60, tags: ['content'] });

export const getPolicyBySlug = unstable_cache(async (slug: string) => {
  await dbConnect();
  const policy = await Policy.findOne({ slug, isActive: true }).lean();
  if (!policy) return null;
  return { ...policy, _id: (policy as any)._id.toString() };
}, ['public-policy-slug'], { revalidate: 60, tags: ['content'] });
