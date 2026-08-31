import dbConnect from '@/lib/db';
import { Nav } from '@/lib/models/nav';
import { unstable_cache } from 'next/cache';

export const getNavData = unstable_cache(async () => {
  await dbConnect();
  let nav = await Nav.findOne().lean();
  if (!nav) {
    nav = {
      primaryNav: [
        { label: "Collections", href: "/collections" },
        { label: "All Products", href: "/products" },
        { label: "Gemstone Guides", href: "/guides" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
      secondaryNav: [
        { label: "FAQs", href: "/faqs" },
        { label: "Testimonials", href: "/testimonials" },
        { label: "Track Order", href: "/track-order" },
      ],
      business: {
        phone: "+91 98400 12345",
        phoneHref: "tel:+919840012345",
        whatsapp: "919840012345",
        email: "hello@a1gems.in",
        address: "12, Radha Krishnan Salai, Mylapore, Chennai 600004",
        hours: "Mon–Sat, 10:00 – 19:00 IST",
      }
    };
  }
  return nav;
}, ['nav-data'], { tags: ['nav'], revalidate: 3600 });

export function whatsappLink(businessData: any, message: string) {
  return `https://wa.me/${businessData.whatsapp}?text=${encodeURIComponent(message)}`;
}
