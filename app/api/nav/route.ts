import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Nav } from '@/lib/models/nav';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    await dbConnect();
    let nav = await Nav.findOne().lean();
    if (!nav) {
      // Fallback defaults if none in DB
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
    return NextResponse.json(nav);
  } catch (error) {
    console.error("Error fetching nav:", error);
    return NextResponse.json({ error: "Failed to fetch nav" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    let nav = await Nav.findOne();
    if (!nav) {
      nav = new Nav(body);
    } else {
      nav.primaryNav = body.primaryNav;
      nav.secondaryNav = body.secondaryNav;
      nav.business = body.business;
    }

    await nav.save();
    
    revalidatePath("/", "layout");
    
    return NextResponse.json(nav);
  } catch (error) {
    console.error("Error updating nav:", error);
    return NextResponse.json({ error: "Failed to update nav data" }, { status: 500 });
  }
}
