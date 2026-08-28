'use server';

import dbConnect from '@/lib/db';
import { Guide } from '@/lib/models/guide';

export async function getGuides() {
  try {
    await dbConnect();
    const guides = await Guide.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
    return { success: true, data: JSON.parse(JSON.stringify(guides)) };
  } catch (error) {
    console.error('Error fetching guides:', error);
    return { success: false, error: 'Failed to fetch guides' };
  }
}
