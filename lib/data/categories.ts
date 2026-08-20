import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    id: "cat_ruby",
    name: "Ruby / Manik",
    slug: "ruby",
    description:
      "Burmese and Mozambican rubies in pigeon-blood to rose red, each one lab certified for origin and treatment.",
    gemColor: "#c81e4a",
    displayOrder: 1,
    published: true,
  },
  {
    id: "cat_blue-sapphire",
    name: "Blue Sapphire / Neelam",
    slug: "blue-sapphire",
    description:
      "Ceylon and Kashmir blue sapphires, from cornflower to royal blue, hand-picked for clarity and even colour.",
    gemColor: "#1f4fd8",
    displayOrder: 2,
    published: true,
  },
  {
    id: "cat_yellow-sapphire",
    name: "Yellow Sapphire / Pukhraj",
    slug: "yellow-sapphire",
    description:
      "Natural unheated pukhraj in lemon and golden tones, the traditional stone of Jupiter.",
    gemColor: "#e0a713",
    displayOrder: 3,
    published: true,
  },
  {
    id: "cat_emerald",
    name: "Emerald / Panna",
    slug: "emerald",
    description:
      "Zambian and Colombian emeralds with the deep garden green that collectors look for.",
    gemColor: "#0f9c68",
    displayOrder: 4,
    published: true,
  },
  {
    id: "cat_pearl",
    name: "Pearl / Moti",
    slug: "pearl",
    description:
      "South Sea and Basra pearls with a soft natural lustre, drilled and undrilled.",
    gemColor: "#d8cfc0",
    displayOrder: 5,
    published: true,
  },
  {
    id: "cat_coral",
    name: "Red Coral / Moonga",
    slug: "coral",
    description:
      "Italian and Japanese red coral, untreated, in triangular, oval and capsule cuts.",
    gemColor: "#e05a2b",
    displayOrder: 6,
    published: true,
  },
  {
    id: "cat_bracelets",
    name: "Gemstone Bracelets",
    slug: "bracelets",
    description:
      "Hand-strung crystal and gemstone bracelets for daily wear, sized to order.",
    gemColor: "#8b5cf6",
    displayOrder: 7,
    published: true,
  },
  {
    id: "cat_rudraksha",
    name: "Rudraksha",
    slug: "rudraksha",
    description:
      "Nepali and Java rudraksha beads from 1 mukhi to 14 mukhi, with lab certification.",
    gemColor: "#8a5a2b",
    displayOrder: 8,
    published: true,
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
