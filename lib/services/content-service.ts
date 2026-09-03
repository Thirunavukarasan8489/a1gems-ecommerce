import { unstable_cache } from 'next/cache';
import dbConnect from '@/lib/db';
import { Guide } from '@/lib/models/guide';
import { FAQ } from '@/lib/models/faq';
import { Testimonial } from '@/lib/models/testimonial';
import { Policy } from '@/lib/models/policy';
import { ContentPage } from '@/lib/models/content-page';

// Prevent Turbopack tree-shaking
if (!Guide) console.warn("Guide model not loaded");
if (!FAQ) console.warn("FAQ model not loaded");
if (!Testimonial) console.warn("Testimonial model not loaded");
if (!Policy) console.warn("Policy model not loaded");

const DEFAULT_FAQS = [
  {
    _id: "faq-1",
    question: "How do I verify the authenticity of a gemstone?",
    answer: "Every natural gemstone sold by A1 Gems comes with an independent lab report from recognized laboratories like GIA, IGI, or GRS. Each report includes a unique certificate number that can be verified online directly on the laboratory's official website.",
    category: "Authentication",
    displayOrder: 1,
    isActive: true,
  },
  {
    _id: "faq-2",
    question: "Are your gemstones treated or heated?",
    answer: "We specialize in unheated and untreated gemstones. Any treatment (such as heat or minor oiling in emeralds) is 100% disclosed in the gemstone specifications and lab reports before purchase.",
    category: "Quality",
    displayOrder: 2,
    isActive: true,
  },
  {
    _id: "faq-3",
    question: "What is your return & inspection policy?",
    answer: "We offer a hassle-free 7-day inspection window. If you wish to return an item, contact us within 7 days of delivery for a full refund or exchange, provided the stone remains in its original sealed lab capsule condition.",
    category: "Returns",
    displayOrder: 3,
    isActive: true,
  },
  {
    _id: "faq-4",
    question: "Can I consult a gemmologist before making a purchase?",
    answer: "Yes! Our experienced in-house gemmologists are available via WhatsApp or phone call for unpressured advice regarding Rashi suitability, origin, weight, and clarity recommendations.",
    category: "Consultation",
    displayOrder: 4,
    isActive: true,
  },
  {
    _id: "faq-5",
    question: "How is shipping handled?",
    answer: "All orders are shipped via fully insured express courier service with signature confirmation upon delivery. Tracking numbers are provided immediately after dispatch.",
    category: "Shipping",
    displayOrder: 5,
    isActive: true,
  },
];

export const getContentPage = unstable_cache(async (slug: string) => {
  try {
    await dbConnect();
    const page = await ContentPage.findOne({ slug, isActive: true }).lean();
    if (!page) return null;
    return { ...page, _id: (page as any)._id.toString() };
  } catch (error) {
    console.error("Error in getContentPage:", error);
    return null;
  }
}, ['public-content-page-v2'], { revalidate: 60, tags: ['content'] });

export const getGuides = unstable_cache(async () => {
  try {
    await dbConnect();
    const guides = await Guide.find({ isActive: true }).sort({ displayOrder: 1, createdAt: -1 }).lean();
    if (guides && guides.length > 0) {
      return guides.map((g: any) => ({ ...g, _id: g._id.toString() }));
    }
  } catch (error) {
    console.error("Error in getGuides:", error);
  }
  return [];
}, ['public-guides-v2'], { revalidate: 60, tags: ['content'] });

export const getGuideBySlug = unstable_cache(async (slug: string) => {
  try {
    await dbConnect();
    const guide = await Guide.findOne({ slug, isActive: true }).lean();
    if (!guide) return null;
    return { ...guide, _id: (guide as any)._id.toString() };
  } catch (error) {
    console.error("Error in getGuideBySlug:", error);
    return null;
  }
}, ['public-guide-slug-v2'], { revalidate: 60, tags: ['content'] });

export const getFaqs = unstable_cache(async () => {
  try {
    await dbConnect();
    const faqs = await FAQ.find({ isActive: true }).sort({ displayOrder: 1, createdAt: -1 }).lean();
    if (faqs && faqs.length > 0) {
      return faqs.map((f: any) => ({ ...f, _id: f._id.toString() }));
    }
  } catch (error) {
    console.error("Error in getFaqs:", error);
  }
  return DEFAULT_FAQS;
}, ['public-faqs-v3'], { revalidate: 60, tags: ['content'] });

export const getTestimonials = unstable_cache(async () => {
  try {
    await dbConnect();
    const t = await Testimonial.find({ isActive: true }).sort({ displayOrder: 1, createdAt: -1 }).populate('productReference').lean();
    if (t && t.length > 0) {
      return t.map((item: any) => ({ 
        ...item, 
        _id: item._id.toString(),
        productReference: item.productReference ? {
          ...item.productReference,
          _id: item.productReference._id.toString()
        } : null
      }));
    }
  } catch (error) {
    console.error("Error in getTestimonials:", error);
  }
  return [];
}, ['public-testimonials-v3'], { revalidate: 60, tags: ['content'] });

export const getPolicies = unstable_cache(async () => {
  try {
    await dbConnect();
    const policies = await Policy.find({ isActive: true }).lean();
    if (policies && policies.length > 0) {
      return policies.map((p: any) => ({ ...p, _id: p._id.toString() }));
    }
  } catch (error) {
    console.error("Error in getPolicies:", error);
  }
  return [];
}, ['public-policies-v2'], { revalidate: 60, tags: ['content'] });

export const getPolicyBySlug = unstable_cache(async (slug: string) => {
  try {
    await dbConnect();
    const policy = await Policy.findOne({ slug, isActive: true }).lean();
    if (!policy) return null;
    return { ...policy, _id: (policy as any)._id.toString() };
  } catch (error) {
    console.error("Error in getPolicyBySlug:", error);
    return null;
  }
}, ['public-policy-slug-v2'], { revalidate: 60, tags: ['content'] });
