'use server';

import dbConnect from '@/lib/db';
import { HomepageSection } from '@/lib/models/homepage-section';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

// Helper to check auth
async function checkAuth(allowedRoles: string[]) {
  const session = await getSession();
  if (!session) throw new Error('Unauthorized');
  
  const normRoles = allowedRoles.map(r => r.replace(' ', '_').toUpperCase());
  if (!normRoles.includes(session.role as string)) {
    throw new Error('Forbidden: Insufficient permissions');
  }
  return session;
}

export async function getHomepageSections() {
  try {
    await dbConnect();
    // Public route doesn't need auth, but admin does. We'll allow fetching without auth for public use,
    // or just let it be public since it's the website content.
    const sections = await HomepageSection.find().sort({ displayOrder: 1 }).lean();
    return { success: true, data: JSON.parse(JSON.stringify(sections)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getHomepageSectionById(id: string) {
  try {
    await dbConnect();
    const section = await HomepageSection.findById(id).lean();
    if (!section) return { success: false, error: 'Section not found' };
    return { success: true, data: JSON.parse(JSON.stringify(section)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createHomepageSection(data: any) {
  try {
    await checkAuth(['SUPER_ADMIN', 'CONTENT_MANAGER']);
    await dbConnect();
    
    // Auto-increment displayOrder if not provided
    if (data.displayOrder === undefined) {
      const lastSection = await HomepageSection.findOne().sort({ displayOrder: -1 });
      data.displayOrder = lastSection ? lastSection.displayOrder + 1 : 0;
    }

    const section = await HomepageSection.create(data);
    
    revalidatePath('/');
    revalidatePath('/admin/website/homepage');
    return { success: true, data: JSON.parse(JSON.stringify(section)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateHomepageSection(id: string, data: any) {
  try {
    await checkAuth(['SUPER_ADMIN', 'CONTENT_MANAGER']);
    await dbConnect();
    
    const section = await HomepageSection.findByIdAndUpdate(id, data, { new: true }).lean();
    
    revalidatePath('/');
    revalidatePath('/admin/website/homepage');
    revalidatePath(`/admin/website/homepage/${id}`);
    return { success: true, data: JSON.parse(JSON.stringify(section)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteHomepageSection(id: string) {
  try {
    await checkAuth(['SUPER_ADMIN', 'CONTENT_MANAGER']);
    await dbConnect();
    
    await HomepageSection.findByIdAndDelete(id);
    
    revalidatePath('/');
    revalidatePath('/admin/website/homepage');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function toggleHomepageSectionActive(id: string, isActive: boolean) {
  return updateHomepageSection(id, { isActive });
}

export async function reorderHomepageSections(updates: { id: string, displayOrder: number }[]) {
  try {
    await checkAuth(['SUPER_ADMIN', 'CONTENT_MANAGER']);
    await dbConnect();

    // Perform bulk write to update all displayOrders efficiently
    const bulkOps = updates.map((update) => ({
      updateOne: {
        filter: { _id: update.id },
        update: { displayOrder: update.displayOrder },
      },
    }));

    await HomepageSection.bulkWrite(bulkOps);
    
    revalidatePath('/');
    revalidatePath('/admin/website/homepage');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
