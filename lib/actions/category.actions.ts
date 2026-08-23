'use server';

import dbConnect from '@/lib/db';
import { Category } from '@/lib/models/category';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

// Helper to check auth
async function checkAuth(allowedRoles: string[]) {
  const session = await getSession();
  if (!session) throw new Error('Unauthorized');
  if (!allowedRoles.includes(session.role as string)) {
    throw new Error('Forbidden: Insufficient permissions');
  }
  return session;
}

export async function getCategories() {
  try {
    await checkAuth(['SUPER_ADMIN', 'CONTENT_MANAGER', 'LEAD_MANAGER']); // Allow lead manager to view categories too
    await dbConnect();
    const categories = await Category.find().sort({ createdAt: -1 });
    return { success: true, data: JSON.parse(JSON.stringify(categories)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createCategory(data: any) {
  try {
    await checkAuth(['SUPER_ADMIN', 'CONTENT_MANAGER']);
    await dbConnect();
    
    // Check if slug exists
    const existing = await Category.findOne({ slug: data.slug });
    if (existing) {
      return { success: false, error: 'Category with this slug already exists' };
    }
    
    const category = await Category.create(data);
    revalidatePath('/admin/categories');
    return { success: true, data: JSON.parse(JSON.stringify(category)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateCategory(id: string, data: any) {
  try {
    await checkAuth(['SUPER_ADMIN', 'CONTENT_MANAGER']);
    await dbConnect();
    
    const category = await Category.findByIdAndUpdate(id, data, { new: true });
    revalidatePath('/admin/categories');
    return { success: true, data: JSON.parse(JSON.stringify(category)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteCategory(id: string) {
  try {
    await checkAuth(['SUPER_ADMIN', 'CONTENT_MANAGER']);
    await dbConnect();
    
    await Category.findByIdAndDelete(id);
    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
