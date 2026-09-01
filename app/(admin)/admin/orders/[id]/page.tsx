import { getOrderById } from "@/lib/actions/order.actions";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/admin/status-badge";
import { ProcessingCard } from "@/components/admin/orders/processing-card";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowLeft, User, MapPin, CreditCard, Receipt, FileText, Package } from "lucide-react";

export const metadata = {
  title: "Order Details - A1 Gems Admin",
};

export default async function OrderDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const res = await getOrderById(params.id);
  
  if (!res.success || !res.data) {
    notFound();
  }

  const order = res.data;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/orders" className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-600">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              Order {order.orderNumber}
              <StatusBadge status={order.orderStatus} />
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Placed on {format(new Date(order.createdAt), "MMMM d, yyyy 'at' h:mm a")}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Processing Card */}
          <ProcessingCard orderId={order._id} currentStatus={order.orderStatus} />

          {/* Order Items */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
              <PackageIcon className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-900">Order Items</h2>
            </div>
            <div className="p-6">
              <table className="w-full text-sm text-left">
                <thead className="text-gray-500 border-b border-gray-200">
                  <tr>
                    <th className="pb-3 font-medium">Product</th>
                    <th className="pb-3 font-medium text-center">Quantity</th>
                    <th className="pb-3 font-medium text-right">Unit Price</th>
                    <th className="pb-3 font-medium text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {order.items.map((item: any, idx: number) => (
                    <tr key={idx}>
                      <td className="py-4">
                        <div className="font-medium text-gray-900">{item.name}</div>
                        {item.sku && <div className="text-xs text-gray-500">SKU: {item.sku}</div>}
                      </td>
                      <td className="py-4 text-center text-gray-700">{item.quantity}</td>
                      <td className="py-4 text-right text-gray-700">₹{item.price.toLocaleString("en-IN")}</td>
                      <td className="py-4 text-right font-medium text-gray-900">₹{(item.price * item.quantity).toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col items-end space-y-2 text-sm">
                <div className="flex justify-between w-64 text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal?.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between w-64 text-gray-600">
                  <span>Shipping Fee</span>
                  <span>{order.shippingFee === 0 ? "Free" : `₹${order.shippingFee}`}</span>
                </div>
                <div className="flex justify-between w-64 text-gray-600">
                  <span>Estimated Tax</span>
                  <span>₹{order.tax?.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between w-64 text-lg font-bold text-gray-900 pt-2 border-t border-gray-200 mt-2">
                  <span>Total</span>
                  <span>₹{order.total?.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
              <User className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-900">Customer</h2>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <div>
                <p className="font-medium text-gray-900">{order.customerName}</p>
                <p className="text-gray-600">{order.email}</p>
                <p className="text-gray-600">{order.phone}</p>
              </div>
              <div>
                <span className="inline-block px-2.5 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium uppercase">
                  {order.purchaseType || 'PERSONAL'} PURCHASE
                </span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-900">Payment Details</h2>
            </div>
            <div className="p-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Method</span>
                <span className="font-medium text-gray-900">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Status</span>
                <StatusBadge status={order.paymentStatus} />
              </div>
              {order.razorpayPaymentId && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Transaction ID</span>
                  <span className="font-mono text-xs text-gray-900">{order.razorpayPaymentId}</span>
                </div>
              )}
            </div>
          </div>

          {/* Addresses */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-900">Shipping Address</h2>
            </div>
            <div className="p-6 text-sm text-gray-600 space-y-1">
              <p className="font-medium text-gray-900">{order.shippingAddress?.fullName || order.customerName}</p>
              <p>{order.shippingAddress?.street}</p>
              {order.shippingAddress?.apartment && <p>{order.shippingAddress.apartment}</p>}
              <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.pincode}</p>
              <p>{order.shippingAddress?.country || "India"}</p>
            </div>
          </div>

          {/* GST Details (if business) */}
          {order.purchaseType === 'BUSINESS' && order.gstDetails && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
                <Receipt className="w-5 h-5 text-gray-500" />
                <h2 className="text-lg font-semibold text-gray-900">GST Information</h2>
              </div>
              <div className="p-6 text-sm space-y-3">
                <div>
                  <p className="text-gray-500 text-xs">Legal Business Name</p>
                  <p className="font-medium text-gray-900">{order.gstDetails.legalName}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">GSTIN</p>
                  <p className="font-mono font-medium text-gray-900">{order.gstDetails.gstin}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Notes */}
          {order.notes && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-500" />
                <h2 className="text-lg font-semibold text-gray-900">Notes</h2>
              </div>
              <div className="p-6 text-sm text-gray-600 whitespace-pre-wrap">
                {order.notes}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Simple icon for Package since it might conflict with lucide's Package
function PackageIcon(props: any) {
  return <Package {...props} />;
}
