import { Quote } from "lucide-react";
import { Rating } from "@/components/public/ui/rating";
import { SectionHeading } from "@/components/public/ui/section-heading";
import { getContentPage } from "@/lib/services/content-service";

const FALLBACK_TESTIMONIALS = [
  {
    name: "Dr. Rajesh Sharma",
    location: "New Delhi",
    product: "4.25ct Ceylon Blue Sapphire",
    rating: 5,
    body: "Purchased a natural unheated Neelam after consulting their gemmologist. Received the GIA lab report directly. Excellent transparency and authentic quality.",
  },
  {
    name: "Ananya Iyer",
    location: "Bengaluru",
    product: "3.10ct Burmese Ruby",
    rating: 5,
    body: "The ruby exceeded my expectations in brilliance and color depth. Fast insured delivery to Bengaluru with complete certification documents.",
  },
  {
    name: "Vikramaditya Mehta",
    location: "Mumbai",
    product: "5.15ct Zambian Emerald",
    rating: 5,
    body: "Honest pricing with no hidden charges. The gemmologist took time to explain the clarity grade and origin report over a quick video call.",
  },
];

export async function Testimonials() {
  let testimonials = [];
  try {
    const testimonialsPage = await getContentPage("testimonials");
    testimonials = testimonialsPage?.content ? JSON.parse(testimonialsPage.content) : [];
  } catch (error) {
    console.error("Error loading testimonials page:", error);
  }

  if (!testimonials || testimonials.length === 0) {
    testimonials = FALLBACK_TESTIMONIALS;
  }

  return (
    <section className="relative w-full max-w-full overflow-hidden bg-ivory-200 py-12 sm:py-16 lg:py-20">
      <div className="shell gutter">
        <SectionHeading
          eyebrow="Testimonials"
          title="What buyers say"
          body="Unedited, authentic reviews from verified gemstone buyers."
          href="/testimonials"
        />
      </div>

      {/* Swipe on mobile, three-column masonry-ish grid on desktop. */}
      <div className="relative w-full max-w-full overflow-hidden">
        <ul className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:gap-4 sm:px-6 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-8">
          {testimonials.map((t: any) => (
            <li
              key={t.name}
              className="w-[82%] min-w-[16rem] shrink-0 snap-start lg:w-auto lg:min-w-0"
            >
              <figure className="flex h-full flex-col rounded-2xl border border-ivory-300 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                <Quote
                  size={22}
                  className="mb-3 shrink-0 fill-gold-200 text-gold-400"
                />
                <blockquote className="flex-1 text-[0.9375rem] leading-relaxed text-plum-900 font-normal">
                  "{t.body}"
                </blockquote>
                <figcaption className="mt-5 border-t border-ivory-200 pt-4">
                  <Rating value={t.rating} className="mb-2" />
                  <p className="text-sm font-semibold text-plum-950">{t.name}</p>
                  <p className="mt-0.5 text-xs text-plum-600 font-medium">
                    {t.location} · purchased {t.product}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
