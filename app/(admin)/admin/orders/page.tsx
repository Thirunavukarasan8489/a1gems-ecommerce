"use client";

import { useState } from "react";
import { Search, Building2, User } from "lucide-react";
import { formatINR } from "@/lib/utils";

interface OrderItem {
  name: string;
  sku: string;
  price: number;
  qty: number;
}

interface Order {
  id: string;
  date: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  purchaseType: "PERSONAL" | "BUSINESS";
  gstin?: string;
  legalBusinessName?: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  taxAmount: number;
  total: number;
  paymentMethod: "UPI" | "CARD" | "NET_BANKING" | "COD" | "BANK_TRANSFER";
  paymentStatus: "PENDING" | "PAID" | "VERIFIED" | "FAILED";
  orderStatus: "PAYMENT_PENDING" | "CONFIRMED" | "PROCESSING" | "PACKED" | "SHIPPED" | "OUT_FOR_DELIVERY" | "DELIVERED";
  shippingAddress: string;
  trackingNumber?: string;
  courierPartner?: string;
}

const MOCK_ORDERS: Order[] = [
  {
    id: "AG-ORD-98214",
    date: "2026-08-21 10:15 AM",
    customerName: "Rajesh Sharma",
    customerPhone: "+91 98200 55123",
    customerEmail: "rajesh@sharmajewellers.in",
    purchaseType: "BUSINESS",
    gstin: "07AAAAA0000A1Z5",
    legalBusinessName: "Sharma Jewellers Pvt Ltd",
    items: [
      { name: "Ceylon Blue Sapphire 5.62 Carat", sku: "AG-BSP-5621", price: 32750000, qty: 1 },
    ],
    subtotal: 32750000,
    shippingFee: 0,
    taxAmount: 982500,
    total: 33732500,
    paymentMethod: "UPI",
    paymentStatus: "PAID",
    orderStatus: "CONFIRMED",
    shippingAddress: "Plot 14, Johari Bazaar, Jaipur, Rajasthan - 302003",
  },
  {
    id: "AG-ORD-98213",
    date: "2026-08-20 03:40 PM",
    customerName: "Ananya Iyer",
    customerPhone: "+91 98401 22334",
    customerEmail: "ananya.iyer@example.com",
    purchaseType: "PERSONAL",
    items: [
      { name: "Yellow Sapphire 6.18 Carat", sku: "AG-YSP-6181", price: 18900000, qty: 1 },
    ],
    subtotal: 18900000,
    shippingFee: 0,
    taxAmount: 567000,
    total: 19467000,
    paymentMethod: "CARD",
    paymentStatus: "PAID",
    orderStatus: "SHIPPED",
    shippingAddress: "42 Indira Nagar 10th Main, Bengaluru, Karnataka - 560038",
    trackingNumber: "BLRD-994120",
    courierPartner: "BlueDart Express Insured",
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(MOCK_ORDERS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [trackingInput, setTrackingInput] = useState("");

  const filteredOrders = orders.filter((o) =>
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (o.gstin && o.gstin.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleUpdateStatus = (orderId: string, newStatus: Order["orderStatus"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, orderStatus: newStatus });
    }
  };

  const handleAddTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder || !trackingInput) return;
    const updated = {
      ...selectedOrder,
      trackingNumber: trackingInput,
      courierPartner: "BlueDart Express Insured",
      orderStatus: "SHIPPED" as Order["orderStatus"],
    };
    setSelectedOrder(updated);
    setOrders((prev) => prev.map((o) => (o.id === selectedOrder.id ? updated : o)));
    setTrackingInput("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ivory-100 font-display">
          Admin Order Management (§22)
        </h1>
        <p className="text-xs text-gold-400 font-semibold uppercase tracking-wider">
          Commerce Order Fulfillment & GST Invoice Processing
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-2.5 size-4 text-plum-400" />
        <input
          type="text"
          placeholder="Search by Order ID, Customer Name, GSTIN..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-plum-700 bg-plum-900/60 pl-9 pr-3 py-1.5 text-xs text-ivory-100 placeholder:text-plum-400 focus:border-gold-400 focus:outline-none"
        />
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Order List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredOrders.map((ord) => {
            const isSelected = selectedOrder?.id === ord.id;
            return (
              <div
                key={ord.id}
                onClick={() => setSelectedOrder(ord)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? "border-gold-400 bg-plum-900 shadow-gold"
                    : "border-plum-800 bg-plum-900/40 hover:border-plum-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-gold-300">
                    {ord.id}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[0.625rem] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {ord.orderStatus}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-ivory-100">{ord.customerName}</h3>
                    <p className="text-[0.6875rem] text-plum-400">
                      {ord.purchaseType === "BUSINESS" ? `GST: ${ord.gstin}` : "Personal Order"}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm font-bold text-ivory-100 block">
                      {formatINR(ord.total)}
                    </span>
                    <span className="text-[0.625rem] text-plum-400">{ord.paymentMethod}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Order Detail (§22) */}
        <div className="lg:col-span-7">
          {selectedOrder ? (
            <div className="rounded-2xl border border-gold-500/30 bg-plum-900 p-6 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-plum-800 pb-4">
                <div>
                  <span className="font-mono text-xs font-semibold text-gold-400">
                    {selectedOrder.id} · Date: {selectedOrder.date}
                  </span>
                  <h2 className="text-xl font-bold text-ivory-100">{selectedOrder.customerName}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-plum-300">Update Status:</span>
                  <select
                    value={selectedOrder.orderStatus}
                    onChange={(e) =>
                      handleUpdateStatus(selectedOrder.id, e.target.value as Order["orderStatus"])
                    }
                    className="rounded-xl border border-gold-500 bg-plum-950 px-3 py-1 text-xs font-semibold text-gold-300 focus:outline-none"
                  >
                    <option value="PAYMENT_PENDING">PAYMENT_PENDING</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="PACKED">PACKED</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="OUT_FOR_DELIVERY">OUT_FOR_DELIVERY</option>
                    <option value="DELIVERED">DELIVERED</option>
                  </select>
                </div>
              </div>

              {/* GST / Business Information (§12.4 & §22) */}
              {selectedOrder.purchaseType === "BUSINESS" ? (
                <div className="rounded-xl bg-gold-500/10 border border-gold-500/30 p-4 text-xs space-y-1">
                  <div className="flex items-center gap-2 text-gold-400 font-bold uppercase tracking-wider">
                    <Building2 size={16} />
                    <span>GST Registered Business Customer (§12.4)</span>
                  </div>
                  <p className="text-ivory-100 font-semibold mt-1">
                    Legal Name: {selectedOrder.legalBusinessName}
                  </p>
                  <p className="text-gold-300 font-mono">GSTIN: {selectedOrder.gstin}</p>
                </div>
              ) : (
                <div className="rounded-xl bg-plum-950/60 border border-plum-800 p-3 text-xs flex items-center gap-2 text-plum-300">
                  <User size={16} className="text-gold-400" />
                  <span>Personal Customer Purchase</span>
                </div>
              )}

              {/* Items Table */}
              <div>
                <h4 className="text-xs font-bold text-gold-400 uppercase tracking-widest mb-2">
                  Order Items
                </h4>
                <div className="rounded-xl border border-plum-800 overflow-hidden text-xs">
                  {selectedOrder.items.map((item) => (
                    <div key={item.sku} className="p-3 bg-plum-950/60 flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-ivory-100">{item.name}</p>
                        <span className="text-[0.625rem] text-plum-400 font-mono">SKU: {item.sku}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-semibold text-gold-300">{formatINR(item.price)}</span>
                        <span className="text-[0.625rem] text-plum-400 block">Qty: {item.qty}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="rounded-xl bg-plum-950/60 border border-plum-800 p-4 text-xs space-y-1.5">
                <div className="flex justify-between text-plum-300">
                  <span>Subtotal:</span>
                  <span className="font-mono text-ivory-100">{formatINR(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-plum-300">
                  <span>Applicable GST Tax (3%):</span>
                  <span className="font-mono text-gold-400">{formatINR(selectedOrder.taxAmount)}</span>
                </div>
                <div className="flex justify-between text-plum-300">
                  <span>Shipping Fee:</span>
                  <span className="text-emerald-400 font-semibold">FREE (Insured Transit)</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-ivory-100 pt-2 border-t border-plum-800">
                  <span>Total Paid:</span>
                  <span className="font-mono text-gold-300">{formatINR(selectedOrder.total)}</span>
                </div>
              </div>

              {/* Dispatch & Courier Input */}
              <div className="border-t border-plum-800 pt-4">
                <h4 className="text-xs font-bold text-gold-400 uppercase tracking-widest mb-2">
                  Shipment Dispatch & Tracking (§16)
                </h4>
                {selectedOrder.trackingNumber ? (
                  <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs">
                    <p className="text-emerald-300 font-semibold">
                      Courier: {selectedOrder.courierPartner}
                    </p>
                    <p className="text-ivory-100 font-mono mt-0.5">
                      AWB / Tracking Number: {selectedOrder.trackingNumber}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleAddTracking} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter BlueDart / Insured Courier Tracking Number"
                      value={trackingInput}
                      onChange={(e) => setTrackingInput(e.target.value)}
                      className="flex-1 rounded-xl border border-plum-700 bg-plum-950 px-3 py-1.5 text-xs text-ivory-100 focus:border-gold-400 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-xl bg-gold-500 text-xs font-bold text-plum-950 hover:bg-gold-400"
                    >
                      Assign Tracking
                    </button>
                  </form>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-2xl border border-plum-800 text-center text-plum-400 text-sm">
              Select an order to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
