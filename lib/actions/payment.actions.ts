'use server';

import dbConnect from '@/lib/db';
import { Payment } from '@/lib/models/payment';
import { Order } from '@/lib/models/order';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import mongoose from 'mongoose';

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

// Generate unique payment number
const generatePaymentNumber = async () => {
  const count = await Payment.countDocuments();
  return `PAY-${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${(count + 1).toString().padStart(4, '0')}`;
};

export async function getPayments() {
  try {
    await checkAuth(['SUPER_ADMIN', 'CONTENT_MANAGER', 'LEAD_MANAGER']);
    await dbConnect();
    const payments = await Payment.find()
      .populate('orderId', 'orderNumber customerName total')
      .sort({ createdAt: -1 });
    return { success: true, data: JSON.parse(JSON.stringify(payments)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getPaymentById(id: string) {
  try {
    await checkAuth(['SUPER_ADMIN', 'CONTENT_MANAGER', 'LEAD_MANAGER']);
    await dbConnect();
    const payment = await Payment.findById(id).populate('orderId');
    if (!payment) return { success: false, error: 'Payment not found' };
    return { success: true, data: JSON.parse(JSON.stringify(payment)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createPayment(data: {
  orderId: string;
  method: string;
  amount: number;
  transactionId: string;
  notes?: string;
  updateOrderStatus?: boolean;
}) {
  try {
    await checkAuth(['SUPER_ADMIN', 'CONTENT_MANAGER']);
    await dbConnect();

    const paymentNumber = await generatePaymentNumber();
    
    // We start a transaction if we are also updating the order
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Create payment
      const payment = await Payment.create([{
        paymentNumber,
        orderId: data.orderId,
        method: data.method,
        amount: data.amount,
        transactionId: data.transactionId,
        notes: data.notes,
        status: 'COMPLETED' // Usually manual recording implies it's completed
      }], { session });

      if (data.updateOrderStatus) {
        await Order.findByIdAndUpdate(data.orderId, {
          paymentStatus: 'CONFIRMED' // Mark parent order as paid
        }, { session });
      }

      await session.commitTransaction();
      session.endSession();
      
      revalidatePath('/admin/payments');
      revalidatePath(`/admin/orders/${data.orderId}`);
      return { success: true, data: JSON.parse(JSON.stringify(payment[0])) };
    } catch (err: any) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updatePaymentStatus(id: string, status: string, syncOrder: boolean = true) {
  try {
    await checkAuth(['SUPER_ADMIN', 'CONTENT_MANAGER']);
    await dbConnect();

    const updateData: any = { status };

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const payment = await Payment.findByIdAndUpdate(id, updateData, { new: true, session });
      if (!payment) throw new Error('Payment not found');

      if (syncOrder) {
        let orderPaymentStatus = 'PENDING';
        if (status === 'COMPLETED') orderPaymentStatus = 'CONFIRMED';
        if (status === 'FAILED') orderPaymentStatus = 'FAILED';
        // Note: REFUNDED doesn't exist directly on order.paymentStatus usually, but can be managed.
        if (orderPaymentStatus !== 'PENDING') {
          await Order.findByIdAndUpdate(payment.orderId, { paymentStatus: orderPaymentStatus }, { session });
        }
      }

      await session.commitTransaction();
      session.endSession();
      
      revalidatePath('/admin/payments');
      revalidatePath(`/admin/payments/${id}`);
      revalidatePath(`/admin/orders/${payment.orderId}`);
      
      return { success: true, data: JSON.parse(JSON.stringify(payment)) };
    } catch (err: any) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
