'use server';

import connectDB from '@/lib/db';
import { Order } from '@/lib/models/order';
import { User } from '@/lib/models/user';
import { Product } from '@/lib/models/product';

export async function getDashboardKpis() {
  await connectDB();

  try {
    // 1. Total Revenue (from non-cancelled/failed orders)
    const revenueResult = await Order.aggregate([
      { $match: { orderStatus: { $nin: ['CANCELLED', 'DELIVERY_FAILED', 'PAYMENT_FAILED'] } } },
      { $group: { _id: null, totalRevenue: { $sum: '$total' } } }
    ]);
    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    // 2. Order Count
    const orderCount = await Order.countDocuments();

    // 3. Customers Count (Users with CUSTOMER role)
    const customerCount = await User.countDocuments({ role: 'CUSTOMER' });

    // 4. Low Stock Items (Threshold can be customized, e.g. < 5)
    const lowStockCount = await Product.countDocuments({ stockQuantity: { $lt: 5 } });

    return {
      success: true,
      data: {
        totalRevenue,
        orderCount,
        customerCount,
        lowStockCount,
      }
    };
  } catch (error) {
    console.error('Error fetching dashboard KPIs:', error);
    return { success: false, error: 'Failed to fetch dashboard data' };
  }
}
