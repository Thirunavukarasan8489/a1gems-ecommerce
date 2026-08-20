/** §6 Public Website Flow */
export const primaryNav = [
  { label: "Collections", href: "/collections" },
  { label: "All Products", href: "/products" },
  { label: "Gemstone Guides", href: "/guides" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const secondaryNav = [
  { label: "FAQs", href: "/faqs" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Track Order", href: "/track-order" },
];

export const business = {
  phone: "+91 98400 12345",
  phoneHref: "tel:+919840012345",
  whatsapp: "919840012345",
  email: "hello@a1gems.in",
  address: "12, Radha Krishnan Salai, Mylapore, Chennai 600004",
  hours: "Mon–Sat, 10:00 – 19:00 IST",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}
