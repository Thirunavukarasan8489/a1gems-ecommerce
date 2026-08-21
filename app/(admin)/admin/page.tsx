import Link from "next/link";
import {
  ShoppingBag,
  TrendingUp,
  CreditCard,
  AlertTriangle,
  Users,
  MessageSquare,
  ArrowUpRight,
  ChevronRight,
  PhoneCall,
} from "lucide-react";
import { formatINR } from "@/lib/utils";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-ivory-100 font-display">
            Dashboard Overview
          </h1>
          <p className="text-xs text-gold-400 mt-1 font-semibold uppercase tracking-wider">
            §31 Admin Dashboard Flow · Commerce & Lead KPIs
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/leads"
            className="px-3.5 py-2 rounded-xl bg-plum-900 border border-plum-700 text-xs font-semibold text-gold-300 hover:border-gold-400 transition-colors"
          >
            Manage CRM Leads
          </Link>
          <Link
            href="/admin/products"
            className="px-3.5 py-2 rounded-xl bg-gold-500 text-xs font-bold text-plum-950 hover:bg-gold-400 transition-colors"
          >
            + Add Product
          </Link>
        </div>
      </div>

      {/* Commerce KPIs (§31) */}
      <div>
        <h2 className="text-xs font-bold text-gold-400 uppercase tracking-widest mb-3">
          Commerce KPIs (§31)
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-plum-800 bg-plum-900/60 p-4 sm:p-5">
            <div className="flex items-center justify-between text-plum-400">
              <span className="text-xs font-semibold uppercase">Total Revenue</span>
              <TrendingUp size={18} className="text-emerald-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-ivory-100 mt-2 font-mono">
              {formatINR(124500000)}
            </p>
            <p className="text-[0.6875rem] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
              <ArrowUpRight size={12} /> +18.4% this month
            </p>
          </div>

          <div className="rounded-2xl border border-plum-800 bg-plum-900/60 p-4 sm:p-5">
            <div className="flex items-center justify-between text-plum-400">
              <span className="text-xs font-semibold uppercase">Total Orders</span>
              <ShoppingBag size={18} className="text-gold-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-ivory-100 mt-2 font-mono">
              342
            </p>
            <p className="text-[0.6875rem] text-plum-300 mt-1">18 Orders Today</p>
          </div>

          <div className="rounded-2xl border border-plum-800 bg-plum-900/60 p-4 sm:p-5">
            <div className="flex items-center justify-between text-plum-400">
              <span className="text-xs font-semibold uppercase">Pending Payments</span>
              <CreditCard size={18} className="text-warning-500" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-warning-400 mt-2 font-mono">
              5
            </p>
            <p className="text-[0.6875rem] text-plum-300 mt-1">Bank Transfers awaiting verification</p>
          </div>

          <div className="rounded-2xl border border-plum-800 bg-plum-900/60 p-4 sm:p-5">
            <div className="flex items-center justify-between text-plum-400">
              <span className="text-xs font-semibold uppercase">Low Stock Alert</span>
              <AlertTriangle size={18} className="text-danger-500" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-danger-400 mt-2 font-mono">
              2
            </p>
            <p className="text-[0.6875rem] text-plum-300 mt-1">Below low stock threshold</p>
          </div>
        </div>
      </div>

      {/* Lead KPIs (§31) */}
      <div>
        <h2 className="text-xs font-bold text-gold-400 uppercase tracking-widest mb-3">
          Lead & Enquiry KPIs (§31)
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-plum-800 bg-plum-900/60 p-4 sm:p-5">
            <div className="flex items-center justify-between text-plum-400">
              <span className="text-xs font-semibold uppercase">Total Leads</span>
              <Users size={18} className="text-gold-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-ivory-100 mt-2 font-mono">
              184
            </p>
            <p className="text-[0.6875rem] text-plum-300 mt-1">High conversion gemstones</p>
          </div>

          <div className="rounded-2xl border border-plum-800 bg-plum-900/60 p-4 sm:p-5">
            <div className="flex items-center justify-between text-plum-400">
              <span className="text-xs font-semibold uppercase">New Enquiries</span>
              <MessageSquare size={18} className="text-emerald-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-emerald-400 mt-2 font-mono">
              8
            </p>
            <p className="text-[0.6875rem] text-emerald-300 mt-1">Requires contact response</p>
          </div>

          <div className="rounded-2xl border border-plum-800 bg-plum-900/60 p-4 sm:p-5">
            <div className="flex items-center justify-between text-plum-400">
              <span className="text-xs font-semibold uppercase">WhatsApp Clicks</span>
              <PhoneCall size={18} className="text-emerald-500" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-ivory-100 mt-2 font-mono">
              512
            </p>
            <p className="text-[0.6875rem] text-plum-300 mt-1">Direct customer chats</p>
          </div>

          <div className="rounded-2xl border border-plum-800 bg-plum-900/60 p-4 sm:p-5">
            <div className="flex items-center justify-between text-plum-400">
              <span className="text-xs font-semibold uppercase">Conversion Rate</span>
              <TrendingUp size={18} className="text-gold-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-gold-300 mt-2 font-mono">
              24.6%
            </p>
            <p className="text-[0.6875rem] text-plum-300 mt-1">Lead to Purchase ratio</p>
          </div>
        </div>
      </div>

      {/* Recent Activity Tables */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="rounded-2xl border border-plum-800 bg-plum-900/60 p-5">
          <div className="flex items-center justify-between border-b border-plum-800 pb-3 mb-4">
            <h3 className="font-semibold text-ivory-100 text-sm flex items-center gap-2">
              <ShoppingBag size={16} className="text-gold-400" />
              Recent Orders (§22)
            </h3>
            <Link href="/admin/orders" className="text-xs text-gold-400 hover:underline flex items-center gap-1">
              View All <ChevronRight size={12} />
            </Link>
          </div>

          <div className="space-y-3">
            {[
              { id: "AG-ORD-98214", name: "Rajesh Sharma", type: "Business (GST)", price: 32750000, status: "CONFIRMED" },
              { id: "AG-ORD-98213", name: "Ananya Iyer", type: "Personal", price: 18900000, status: "SHIPPED" },
              { id: "AG-ORD-98212", name: "Vikramaditya Singh", type: "Personal", price: 24500000, status: "PROCESSING" },
            ].map((ord) => (
              <div key={ord.id} className="flex items-center justify-between p-3 rounded-xl bg-plum-950/60 border border-plum-800/80 text-xs">
                <div>
                  <span className="font-mono font-semibold text-gold-300">{ord.id}</span>
                  <p className="text-ivory-100 font-medium">{ord.name}</p>
                  <span className="text-[0.625rem] text-plum-400">{ord.type}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-semibold text-ivory-100 block">{formatINR(ord.price)}</span>
                  <span className="px-2 py-0.5 rounded-md text-[0.625rem] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-block mt-0.5">
                    {ord.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent CRM Leads */}
        <div className="rounded-2xl border border-plum-800 bg-plum-900/60 p-5">
          <div className="flex items-center justify-between border-b border-plum-800 pb-3 mb-4">
            <h3 className="font-semibold text-ivory-100 text-sm flex items-center gap-2">
              <Users size={16} className="text-gold-400" />
              Active CRM Leads (§10.2)
            </h3>
            <Link href="/admin/leads" className="text-xs text-gold-400 hover:underline flex items-center gap-1">
              View CRM <ChevronRight size={12} />
            </Link>
          </div>

          <div className="space-y-3">
            {[
              { id: "LD-104", customer: "Priya Kulkarni", product: "Burmese Ruby 4.05 Ct", phone: "+91 98201 44102", status: "NEW" },
              { id: "LD-103", customer: "Dr. Arvind Mehta", product: "Zambian Emerald 3.82 Ct", phone: "+91 98450 11293", status: "CONTACTED" },
              { id: "LD-102", customer: "Siddharth Verma", product: "Ceylon Blue Sapphire", phone: "+91 97110 88321", status: "QUALIFIED" },
            ].map((ld) => (
              <div key={ld.id} className="flex items-center justify-between p-3 rounded-xl bg-plum-950/60 border border-plum-800/80 text-xs">
                <div>
                  <span className="font-mono font-semibold text-gold-300">{ld.id}</span>
                  <p className="text-ivory-100 font-medium">{ld.customer}</p>
                  <p className="text-[0.625rem] text-plum-400">{ld.product}</p>
                </div>
                <div className="text-right">
                  <span className="text-[0.6875rem] text-plum-300 block">{ld.phone}</span>
                  <span className="px-2 py-0.5 rounded-md text-[0.625rem] font-bold bg-gold-500/20 text-gold-300 border border-gold-500/30 inline-block mt-0.5">
                    {ld.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
