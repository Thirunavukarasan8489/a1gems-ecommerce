'use server';

import dbConnect from '@/lib/db';
import { Order } from '@/lib/models/order';
import { getSession } from '@/lib/auth';

// Helper to check auth
async function checkAuth(allowedRoles: string[]) {
  const session = await getSession();
  if (!session) throw new Error('Unauthorized');
  
  // Normalize roles to match DB ENUMS (SUPER_ADMIN, etc.)
  const normRoles = allowedRoles.map(r => r.replace(' ', '_').toUpperCase());
  if (!normRoles.includes(session.role as string)) {
    throw new Error('Forbidden: Insufficient permissions');
  }
  return session;
}

export async function getCustomers() {
  try {
    const isAuth = await checkAuth(['Super Admin', 'Content Manager', 'Lead Manager']);
    if (!isAuth) return { success: false, error: 'Unauthorized' };

    await dbConnect();
    
    // Aggregate unique customers from orders (group by phone as identifier since email might be missing)
    const customers = await Order.aggregate([
      {
        $group: {
          _id: "$phone",
          name: { $first: "$customerName" },
          email: { $first: "$email" },
          phone: { $first: "$phone" },
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: "$total" },
          lastOrderDate: { $max: "$createdAt" }
        }
      },
      { $sort: { lastOrderDate: -1 } }
    ]);

    return { success: true, data: customers };
  } catch (error: any) {
    console.error('Error fetching customers:', error);
    return { success: false, error: error.message };
  }
}
