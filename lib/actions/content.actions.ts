'use server';

import dbConnect from '@/lib/db';
import { ContentPage } from '@/lib/models/content-page';
import { Guide } from '@/lib/models/guide';
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

// --- Content Page Actions --- //

export async function getContentPages() {
  try {
    await dbConnect();
    const pages = await ContentPage.find().sort({ title: 1 }).lean();
    return { success: true, data: JSON.parse(JSON.stringify(pages)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getContentPageById(id: string) {
  try {
    await dbConnect();
    const page = await ContentPage.findById(id).lean();
    if (!page) return { success: false, error: 'Page not found' };
    return { success: true, data: JSON.parse(JSON.stringify(page)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createContentPage(data: any) {
  try {
    await checkAuth(['SUPER_ADMIN', 'CONTENT_MANAGER']);
    await dbConnect();
    
    // Auto-generate slug if missing
    if (!data.slug) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    const page = await ContentPage.create(data);
    
    revalidatePath('/admin/website/pages');
    return { success: true, data: JSON.parse(JSON.stringify(page)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateContentPage(id: string, data: any) {
  try {
    await checkAuth(['SUPER_ADMIN', 'CONTENT_MANAGER']);
    await dbConnect();
    
    const page = await ContentPage.findByIdAndUpdate(id, data, { new: true }).lean();
    
    revalidatePath('/admin/website/pages');
    revalidatePath(`/admin/website/pages/${id}`);
    if (page?.slug) {
      revalidatePath(`/${page.slug}`);
      revalidatePath(`/policies/${page.slug}`);
    }
    return { success: true, data: JSON.parse(JSON.stringify(page)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteContentPage(id: string) {
  try {
    await checkAuth(['SUPER_ADMIN', 'CONTENT_MANAGER']);
    await dbConnect();
    
    const page = await ContentPage.findByIdAndDelete(id).lean();
    if (page?.slug) {
      revalidatePath(`/${page.slug}`);
      revalidatePath(`/policies/${page.slug}`);
    }
    
    revalidatePath('/admin/website/pages');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}


// --- Guide Actions --- //

export async function getGuides() {
  try {
    await dbConnect();
    const guides = await Guide.find().sort({ publishedAt: -1 }).lean();
    return { success: true, data: JSON.parse(JSON.stringify(guides)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getGuideById(id: string) {
  try {
    await dbConnect();
    const guide = await Guide.findById(id).lean();
    if (!guide) return { success: false, error: 'Guide not found' };
    return { success: true, data: JSON.parse(JSON.stringify(guide)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createGuide(data: any) {
  try {
    await checkAuth(['SUPER_ADMIN', 'CONTENT_MANAGER']);
    await dbConnect();
    
    if (!data.slug) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    const guide = await Guide.create(data);
    
    revalidatePath('/admin/content/guides');
    revalidatePath('/guides');
    return { success: true, data: JSON.parse(JSON.stringify(guide)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateGuide(id: string, data: any) {
  try {
    await checkAuth(['SUPER_ADMIN', 'CONTENT_MANAGER']);
    await dbConnect();
    
    const guide = await Guide.findByIdAndUpdate(id, data, { new: true }).lean();
    
    revalidatePath('/admin/content/guides');
    revalidatePath(`/admin/content/guides/${id}`);
    revalidatePath('/guides');
    if (guide?.slug) {
      revalidatePath(`/guides/${guide.slug}`);
    }
    return { success: true, data: JSON.parse(JSON.stringify(guide)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteGuide(id: string) {
  try {
    await checkAuth(['SUPER_ADMIN', 'CONTENT_MANAGER']);
    await dbConnect();
    
    const guide = await Guide.findByIdAndDelete(id).lean();
    if (guide?.slug) {
      revalidatePath(`/guides/${guide.slug}`);
    }
    
    revalidatePath('/admin/content/guides');
    revalidatePath('/guides');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
