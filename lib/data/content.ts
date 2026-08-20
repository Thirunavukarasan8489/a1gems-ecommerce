/**
 * CMS-managed content (§28 Content Management Flow). Static for now — these
 * become editable documents when the admin Content module lands in Phase 15.
 */

export const announcements = [
  "Free insured shipping across India on orders above ₹25,000",
  "Every stone ships with an independent lab certificate",
  "Talk to a gemmologist before you buy — consultation is free",
];

export const trustHighlights = [
  {
    icon: "certificate",
    title: "Lab certified",
    body: "GIA, IGI, GRS or SSEF report with every stone.",
  },
  {
    icon: "shield",
    title: "Insured delivery",
    body: "Fully insured, signature-on-delivery courier.",
  },
  {
    icon: "refresh",
    title: "7-day returns",
    body: "Return unworn stones within 7 days of delivery.",
  },
  {
    icon: "gem",
    title: "Natural only",
    body: "No synthetics, no undisclosed treatments. Ever.",
  },
];

export const whyChooseUs = [
  {
    title: "Every stone is independently certified",
    body: "We do not issue our own certificates. Each stone is graded by GIA, IGI, GRS or SSEF, and the report number is printed on your invoice so you can verify it yourself on the lab's website.",
  },
  {
    title: "Treatments are always disclosed",
    body: "Heated, oiled, filled, dyed — if a stone has been treated, it says so on the product page and on the report. A quiet omission is how people get overcharged, so we do not do it.",
  },
  {
    title: "We buy at source",
    body: "Direct relationships in Mogok, Ratnapura, Kagem and Montepuez mean fewer hands between the mine and you, and pricing that reflects it.",
  },
  {
    title: "Advice before a sale",
    body: "Our gemmologists will tell you when a stone is wrong for you, or when a smaller one would serve you better. Free consultation, no obligation.",
  },
];

export const howItWorks = [
  {
    step: "01",
    title: "Browse or enquire",
    body: "Explore the catalogue, or send an enquiry describing what you are looking for and your budget.",
  },
  {
    step: "02",
    title: "Talk to a gemmologist",
    body: "We walk you through origin, treatment, clarity and price so you know exactly what you are buying.",
  },
  {
    step: "03",
    title: "Verify the certificate",
    body: "You receive the lab report number before payment and can verify it independently on the lab's site.",
  },
  {
    step: "04",
    title: "Insured delivery",
    body: "Your stone ships fully insured with tracking, and arrives sealed with its certificate.",
  },
];

export const testimonials = [
  {
    name: "Ananya Krishnan",
    location: "Chennai",
    rating: 5,
    body: "I had been quoted wildly different prices for a 5 carat pukhraj across three shops. A1 sent me the IGI number before I paid a rupee and I verified it myself. That alone earned the sale.",
    product: "Yellow Sapphire 6.18 Carat",
  },
  {
    name: "Rajiv Mehta",
    location: "Mumbai",
    rating: 5,
    body: "The gemmologist talked me out of the stone I originally wanted and into a smaller unheated one for less money. Not what I expected from a jeweller.",
    product: "Ceylon Blue Sapphire",
  },
  {
    name: "Fatima Sheikh",
    location: "Hyderabad",
    rating: 5,
    body: "Ordered a rose quartz bracelet for my mother. It arrived in three days, beautifully packed, and the size was exactly right after I gave them her wrist measurement.",
    product: "Rose Quartz Bracelet",
  },
  {
    name: "Karan Deshpande",
    location: "Pune",
    rating: 5,
    body: "GST invoice sorted for my company purchase without any back and forth. Small thing, but it is the thing most sellers get wrong.",
    product: "Zambian Emerald 3.44 Carat",
  },
  {
    name: "Meera Nair",
    location: "Kochi",
    rating: 4,
    body: "Delivery took a day longer than promised, but the coral itself is genuinely the colour in the photos, which is rare online.",
    product: "Italian Red Coral",
  },
  {
    name: "Suresh Iyer",
    location: "Bengaluru",
    rating: 5,
    body: "Bought a 5 mukhi mala. Knotted between every bead, exactly as described. You can tell it was strung by someone who knows what they are doing.",
    product: "5 Mukhi Rudraksha Mala",
  },
];

export const faqs = [
  {
    q: "Are your gemstones natural or lab-created?",
    a: "Every stone we sell is natural. We do not stock synthetic or lab-grown material. If a stone has undergone a standard treatment such as heating or oiling, it is disclosed on the product page, on the lab report, and on your invoice.",
  },
  {
    q: "Which certification do you provide?",
    a: "Depending on the stone and its value, we supply reports from GIA, IGI, GRS or SSEF. The report number appears on your invoice so you can verify it directly on the laboratory's own website. For lower-value beads and bracelets we supply a standard natural-material lab test.",
  },
  {
    q: "Can I return a stone if it is not right?",
    a: "Yes. Unworn stones can be returned within 7 days of delivery in their original sealed packaging with the certificate intact. Made-to-size bracelets and custom settings are not returnable. Refunds are issued to the original payment method once the return passes inspection.",
  },
  {
    q: "Do you ship outside India?",
    a: "Currently we ship across India only, fully insured with signature on delivery. For international enquiries, please contact us directly and we will advise on a case-by-case basis.",
  },
  {
    q: "How is shipping charged?",
    a: "A flat insured shipping fee applies to all orders, and it is waived on orders above ₹25,000. The exact amount is shown at checkout before you pay.",
  },
  {
    q: "Can I buy on behalf of my company with a GST invoice?",
    a: "Yes. Choose Business at checkout and enter your GSTIN, legal business name and GST address. Your tax invoice will carry those details. If your business is not GST registered, you can still check out as a business without a GSTIN.",
  },
  {
    q: "Why do some products say Enquire instead of Add to Cart?",
    a: "High-value and one-of-a-kind stones are sold by enquiry so we can take you through origin, treatment and pricing, and arrange a viewing or independent verification before any money changes hands.",
  },
  {
    q: "Is Cash on Delivery available?",
    a: "COD is available on selected products and PIN codes, up to an order value limit. Eligibility is checked automatically at checkout once you enter your delivery address.",
  },
];

export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  readMinutes: number;
  gemColor: string;
  category: string;
  body: { heading: string; paragraphs: string[] }[];
}

export const guides: Guide[] = [
  {
    slug: "how-to-identify-a-natural-ruby",
    title: "How to identify a natural ruby",
    excerpt:
      "Inclusions, fluorescence and the tests you can run yourself before you trust a certificate.",
    readMinutes: 7,
    gemColor: "#c81e4a",
    category: "Ruby",
    body: [
      {
        heading: "Perfection is the warning sign",
        paragraphs: [
          "A natural ruby grew in rock over millions of years, and that history leaves marks. Rutile silk, fingerprint healing planes, tiny crystals of another mineral trapped inside — these are not flaws, they are proof of origin. A stone that is completely clean under 10x magnification at a price that seems reasonable is almost always synthetic.",
          "Synthetic rubies made by the flame-fusion process show curved growth lines rather than the straight, angular banding of natural corundum. You can often see them with a loupe by looking through the side of the stone against a diffused white background.",
        ],
      },
      {
        heading: "Fluorescence and colour behaviour",
        paragraphs: [
          "Burmese rubies fluoresce strongly red under longwave UV, which is part of why they appear to glow in daylight. Thai and some African material contains more iron, which dampens fluorescence and gives a darker, more garnet-like red. Neither is fake — but they are not worth the same money, so a seller who blurs the distinction is telling you something.",
          "Tilt the stone under a single light source. A well-cut natural ruby will show variation in tone across the facets. A dyed or glass-filled stone tends to look flat and uniformly saturated, and glass filling often shows a distinctive blue or orange flash at the fracture surface.",
        ],
      },
      {
        heading: "What the certificate must say",
        paragraphs: [
          "Look for three things: that the stone is natural corundum, whether it has been heated, and whether any filling or diffusion is present. Lead-glass-filled rubies are common and are worth a small fraction of an untreated stone — but they are still legitimately sold as rubies, so the disclosure is the only thing protecting you.",
          "Get the report number before you pay and check it on the laboratory's own website. Every major lab publishes a verification lookup. If the seller resists giving you the number in advance, that is your answer.",
        ],
      },
    ],
  },
  {
    slug: "unheated-vs-heated-sapphires",
    title: "Unheated vs heated sapphires: what you are paying for",
    excerpt:
      "Why an unheated stone can cost four times a heated one that looks identical.",
    readMinutes: 9,
    gemColor: "#1f4fd8",
    category: "Blue Sapphire",
    body: [
      {
        heading: "What heating actually does",
        paragraphs: [
          "Most sapphire that comes out of the ground is not the colour you see in a shop window. Controlled heating to around 1,600°C dissolves the fine rutile silk that clouds the stone and redistributes trace elements, deepening and evening the blue. It is a permanent, stable and long-accepted treatment. Somewhere between 90 and 95 percent of sapphire on the market has been heated.",
          "Because it is so common, heated sapphire is not a lesser product — it is the normal product. The premium on unheated material exists because it is rare, not because heated stones are inferior to wear.",
        ],
      },
      {
        heading: "Where the price gap comes from",
        paragraphs: [
          "For two stones of identical appearance, unheated can command three to five times the price of heated. That gap is almost entirely scarcity and collector demand. If you are buying to wear, the heated stone is the better value by a wide margin. If you are buying as a store of value, or for astrological reasons where untreated material matters to you, the premium is the point.",
          "The trap is paying an unheated premium for a heated stone. This is why the laboratory report matters more than the colour: only a lab with the right instrumentation can determine heat treatment reliably, and it is not something you can assess with a loupe.",
        ],
      },
      {
        heading: "Treatments that are not equivalent",
        paragraphs: [
          "Beryllium diffusion is a different matter entirely. It introduces an element into the lattice at high temperature to change colour, and it dramatically reduces value. Some sellers describe it loosely as 'heated'. It is not the same thing and a proper report will name it explicitly.",
          "Ask for the full treatment line on the report, not a summary. 'Indications of heating' and 'no indications of heating' are the phrases you are looking for, and anything else deserves a question.",
        ],
      },
    ],
  },
  {
    slug: "reading-a-gemstone-certificate",
    title: "Reading a gemstone certificate line by line",
    excerpt:
      "The four fields that matter and the ones designed to distract you.",
    readMinutes: 6,
    gemColor: "#c99a26",
    category: "Buying Guide",
    body: [
      {
        heading: "Who issued it",
        paragraphs: [
          "The first thing to check is not on the stone, it is on the letterhead. GIA, IGI, GRS, SSEF, Gübelin and AGL are internationally recognised. A great many other laboratories exist, some of which will write whatever the submitting dealer would like them to write.",
          "An impressive-looking certificate from a laboratory nobody has heard of adds no protection. If you have not heard of the lab, search the name plus the word 'reputation' before you go further.",
        ],
      },
      {
        heading: "The four fields that matter",
        paragraphs: [
          "Identification tells you what the stone is — natural corundum, natural beryl, synthetic. Origin tells you where it formed, which drives a large part of the price for ruby, sapphire and emerald. Treatment tells you what has been done to it. Weight and measurements let you confirm the report belongs to the stone in front of you.",
          "Everything else — the photograph, the colour name, the decorative border — is presentation. Colour designations like 'pigeon blood' or 'royal blue' are lab-specific trade terms, not objective measurements, and they vary between laboratories.",
        ],
      },
      {
        heading: "Verify it yourself",
        paragraphs: [
          "Every major lab lets you enter a report number on their website and see the record. Do this before payment, not after delivery. Check that the carat weight and measurements on the online record match the stone you are being offered.",
          "A report is issued for one specific stone. A seller who offers 'a certificate' rather than the certificate for the exact stone you are buying is offering you nothing at all.",
        ],
      },
    ],
  },
  {
    slug: "choosing-the-right-carat-weight",
    title: "Choosing the right carat weight for your ring",
    excerpt:
      "Face-up size, finger size and why the biggest stone is rarely the best one.",
    readMinutes: 5,
    gemColor: "#0f9c68",
    category: "Buying Guide",
    body: [
      {
        heading: "Carat is weight, not size",
        paragraphs: [
          "Two stones of the same carat weight can look noticeably different on the hand. A deeply cut stone hides much of its weight in the pavilion where nobody sees it; a shallower stone of the same weight spreads wider and reads larger. This is why millimetre measurements belong next to carat weight on every listing.",
          "Sapphire and ruby are denser than emerald, so a one-carat sapphire is physically smaller than a one-carat emerald. Comparing carat weight across different stone types tells you very little about how they will look.",
        ],
      },
      {
        heading: "Match the stone to the hand",
        paragraphs: [
          "On a slender finger, a 3 to 4 carat oval already reads as a statement. On a broader hand the same stone can look modest. Before committing to a size, cut the millimetre dimensions out of paper and tape them to your finger for an hour — it is crude, and it is the single most useful thing you can do.",
          "Consider daily wear too. A high-set stone above 6 or 7 carats catches on clothing and needs a protective setting, which adds cost and changes the look.",
        ],
      },
      {
        heading: "Where the money is better spent",
        paragraphs: [
          "Price per carat rises sharply at round numbers because of demand, so a 2.90 carat stone often costs meaningfully less than a 3.05 carat stone that looks the same on the hand. Buying just under a threshold is one of the few genuinely free savings in this trade.",
          "If your budget is fixed, spending it on colour and clarity rather than raw size almost always produces a stone you will be happier with in ten years.",
        ],
      },
    ],
  },
  {
    slug: "caring-for-emeralds",
    title: "Caring for emeralds without stripping the oil",
    excerpt: "What ultrasonic cleaners do to a Colombian, and what to do instead.",
    readMinutes: 4,
    gemColor: "#0b8a5c",
    category: "Emerald",
    body: [
      {
        heading: "Why emeralds are oiled",
        paragraphs: [
          "Nearly every emerald on the market has surface-reaching fractures, and nearly every one has been treated with cedarwood oil or a modern resin to fill them. This makes the fractures far less visible and is an accepted, disclosed practice going back centuries.",
          "The treatment is not permanent. Heat, solvents and ultrasonic vibration can drive the oil out, at which point fractures that were invisible become obvious and the stone appears to have suddenly deteriorated. It has not — it has simply gone back to how it looked before treatment.",
        ],
      },
      {
        heading: "What not to do",
        paragraphs: [
          "Never put an emerald in an ultrasonic or steam cleaner. Avoid acetone, alcohol, and household cleaners. Take the ring off before washing dishes or swimming — hot water and chlorine both do damage over time.",
          "Clean with lukewarm water, a drop of mild soap and a soft brush, then dry with a soft cloth. That is genuinely all it needs.",
        ],
      },
      {
        heading: "Re-oiling",
        paragraphs: [
          "If an emerald starts to look dry or the fractures become more visible, a competent gemmologist can re-oil it. It is a routine service, not a repair, and it does not damage the stone.",
          "Have it done by someone who works with emeralds regularly and will tell you what they are using. Resin and oil are not interchangeable, and mixing them causes problems later.",
        ],
      },
    ],
  },
  {
    slug: "rudraksha-authenticity",
    title: "Telling a real rudraksha from a carved one",
    excerpt: "Mukhi lines, the X-ray test, and why a low price is the warning.",
    readMinutes: 8,
    gemColor: "#8a5a2b",
    category: "Rudraksha",
    body: [
      {
        heading: "The lines have to run the whole way",
        paragraphs: [
          "The mukhi lines on a genuine rudraksha are natural seams in the seed. They run continuously from the top hole to the bottom hole without breaking, wavering or changing depth. Carved beads are usually made by cutting extra lines into a common 5 mukhi seed, and those cuts almost always look too regular and stop short of the ends.",
          "Under magnification, natural lines follow the contours of the surface bumps. Carved lines cut across them.",
        ],
      },
      {
        heading: "Rare beads are rare for a reason",
        paragraphs: [
          "1 mukhi, 14 mukhi and Gauri Shankar beads are genuinely scarce. If a seller has them in quantity at low prices, they are not what they are being sold as. The overwhelming majority of 1 mukhi beads offered online are carved from bhadraksha or from ordinary 5 mukhi seeds.",
          "Water tests, copper coin tests and the rest of the folk methods circulating online do not reliably distinguish real from carved. Density varies too much between beads for a sink-or-float test to mean anything.",
        ],
      },
      {
        heading: "What actually settles it",
        paragraphs: [
          "An X-ray or CT scan shows the internal chambers of the seed. A genuine bead has one internal compartment per mukhi. This is what a proper laboratory certificate for rudraksha is based on, and it is the only method that cannot be faked by surface work.",
          "For any bead above a few thousand rupees, insist on a lab certificate with the scan image attached. For ordinary 5 mukhi beads, a visual inspection of the lines is usually enough.",
        ],
      },
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}

export const stats = [
  { value: "18+", label: "Years in the trade" },
  { value: "12,400", label: "Stones delivered" },
  { value: "100%", label: "Lab certified" },
  { value: "4.8", label: "Average rating" },
];
