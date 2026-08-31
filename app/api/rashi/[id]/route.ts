import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Rashi } from '@/lib/models/rashi';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await dbConnect();
    const body = await req.json();
    const rashi = await Rashi.findByIdAndUpdate(id, body, { new: true });
    
    if (!rashi) {
      return NextResponse.json({ error: "Rashi not found" }, { status: 404 });
    }
    
    return NextResponse.json(rashi);
  } catch (error) {
    console.error("Error updating rashi:", error);
    return NextResponse.json({ error: "Failed to update rashi" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await dbConnect();
    const rashi = await Rashi.findByIdAndDelete(id);
    
    if (!rashi) {
      return NextResponse.json({ error: "Rashi not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting rashi:", error);
    return NextResponse.json({ error: "Failed to delete rashi" }, { status: 500 });
  }
}
