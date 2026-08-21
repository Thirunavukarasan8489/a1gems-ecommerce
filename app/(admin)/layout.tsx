import type { Metadata } from "next";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Gem,
  Globe,
  FileText,
  Settings,
  Shield,
  LogOut,
  Bell,
  ExternalLink,
  Truck,
  RotateCcw,
  CreditCard,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Panel · A1 Gems Management Portal",
  description: "A1 Gems Commerce & Lead Management Admin Console",
};

const SIDEBAR_SECTIONS = [
  {
    title: "OVERVIEW",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    title: "LEAD MANAGEMENT",
    items: [
      { label: "Leads CRM", href: "/admin/leads", icon: Users, badge: "8 New" },
    ],
  },
  {
    title: "COMMERCE",
    items: [
      { label: "Orders", href: "/admin/orders", icon: ShoppingBag, badge: "12" },
      { label: "Customers", href: "/admin/customers", icon: Users },
      { label: "Payments", href: "/admin/payments", icon: CreditCard },
      { label: "Shipments", href: "/admin/shipments", icon: Truck },
      { label: "Returns", href: "/admin/returns", icon: RotateCcw },
    ],
  },
  {
    title: "CATALOGUE",
    items: [
      { label: "Products", href: "/admin/products", icon: Gem },
      { label: "Categories", href: "/admin/categories", icon: FileText },
      { label: "Inventory", href: "/admin/inventory", icon: Shield },
      { label: "Media Library", href: "/admin/media", icon: Globe },
    ],
  },
  {
    title: "WEBSITE & CMS",
    items: [
      { label: "Homepage CMS", href: "/admin/website", icon: Globe },
      { label: "Content & Guides", href: "/admin/content", icon: FileText },
    ],
  },
  {
    title: "SYSTEM & SETTINGS",
    items: [
      { label: "Settings & GST", href: "/admin/settings", icon: Settings },
    ],
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-plum-950 text-ivory-100 flex flex-col lg:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-plum-900/90 border-r border-plum-800 flex shrink-0 flex-col">
        {/* Brand Header */}
        <div className="p-4 border-b border-plum-800 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="size-8 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-display font-bold text-plum-950 text-base">
              A1
            </span>
            <div>
              <span className="font-display text-base font-bold text-ivory-100 block leading-tight">
                A1 GEMS
              </span>
              <span className="text-[0.625rem] text-gold-400 font-semibold tracking-wider uppercase block">
                Admin Console §32
              </span>
            </div>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="text-plum-300 hover:text-gold-300 transition-colors p-1.5 rounded-lg hover:bg-plum-800"
            title="View Public Website"
          >
            <ExternalLink size={16} />
          </Link>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-6">
          {SIDEBAR_SECTIONS.map((sec) => (
            <div key={sec.title}>
              <h4 className="px-3 text-[0.625rem] font-bold text-gold-400 uppercase tracking-widest mb-2">
                {sec.title}
              </h4>
              <ul className="space-y-1">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-plum-200 hover:bg-plum-800 hover:text-gold-300 transition-all group"
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon size={16} className="text-plum-400 group-hover:text-gold-400" />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="px-1.5 py-0.5 text-[0.625rem] font-bold rounded-md bg-gold-500/20 text-gold-300 border border-gold-500/30">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Admin Profile Footer */}
        <div className="p-3 border-t border-plum-800 flex items-center justify-between text-xs bg-plum-950/60">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-full bg-gold-500 text-plum-950 font-bold flex items-center justify-center text-xs">
              SA
            </div>
            <div>
              <p className="font-semibold text-ivory-100 leading-tight">Super Admin</p>
              <p className="text-[0.625rem] text-plum-400">admin@a1gems.com</p>
            </div>
          </div>
          <Link href="/admin/login" className="text-plum-400 hover:text-danger-500 p-1" title="Logout">
            <LogOut size={16} />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-plum-950/95 overflow-y-auto">
        {/* Top Navigation Bar */}
        <header className="h-14 border-b border-plum-800 bg-plum-900/40 px-4 sm:px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-gold-400 bg-gold-500/10 border border-gold-500/20 px-2.5 py-1 rounded-full">
              LIVE SYSTEM · v2.4
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg text-plum-300 hover:text-gold-300 hover:bg-plum-800 transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-gold-400 animate-ping" />
              <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-gold-400" />
            </button>
            <Link
              href="/admin/login"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-plum-700 bg-plum-800 text-plum-200 hover:border-gold-500 hover:text-gold-300 transition-all"
            >
              Role: Super Admin
            </Link>
          </div>
        </header>

        {/* Content Viewport */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
