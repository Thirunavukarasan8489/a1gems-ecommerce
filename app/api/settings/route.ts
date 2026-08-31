import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Settings } from '@/lib/models/settings';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    await dbConnect();
    let settings = await Settings.findOne().lean();
    if (!settings) {
      settings = {
        flatShippingFee: 20000,
        freeShippingThreshold: 2500000,
        currency: 'INR'
      };
    }
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings(body);
    } else {
      settings.flatShippingFee = body.flatShippingFee;
      settings.freeShippingThreshold = body.freeShippingThreshold;
      settings.currency = body.currency;
    }

    await settings.save();
    
    // Settings might be used globally
    revalidatePath("/", "layout");
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
