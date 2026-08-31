import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Rashi } from '@/lib/models/rashi';

export async function GET() {
  try {
    await dbConnect();
    const rashis = await Rashi.find().sort({ order: 1 }).lean();
    return NextResponse.json(rashis);
  } catch (error) {
    console.error("Error fetching rashis:", error);
    return NextResponse.json({ error: "Failed to fetch rashis" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    
    // Auto-calculate order if not provided
    if (body.order === undefined) {
      const highest = await Rashi.findOne().sort("-order");
      body.order = highest && highest.order ? highest.order + 1 : 1;
    }

    const rashi = new Rashi(body);
    await rashi.save();
    
    return NextResponse.json(rashi, { status: 201 });
  } catch (error) {
    console.error("Error creating rashi:", error);
    return NextResponse.json({ error: "Failed to create rashi" }, { status: 500 });
  }
}
