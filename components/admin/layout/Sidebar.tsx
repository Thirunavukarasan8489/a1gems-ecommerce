"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  Boxes,
  Image as ImageIcon,
  ShoppingCart,
  Users,
  CreditCard,
  Truck,
  RotateCcw,
  UserCheck,
  Calendar,
  BarChart3,
  Globe,
  Megaphone,
  FileSpreadsheet,
  BookOpen,
  FileText,
  PhoneCall,
  ShieldAlert,
  UserCog,
} from "lucide-react";
import Image from "next/image";

const sidebarGroups = [
  {
    title: "DASHBOARD",
    items: [{ name: "Overview", href: "/admin", icon: LayoutDashboard }],
  },
  {
    title: "CATALOGUE",
    items: [
      { name: "Categories", href: "/admin/categories", icon: Layers },
      { name: "Products", href: "/admin/products", icon: Package },
      { name: "Inventory", href: "/admin/inventory", icon: Boxes },
      { name: "Media Library", href: "/admin/media", icon: ImageIcon },
    ],
  },
  {
    title: "COMMERCE",
    items: [
      { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
      { name: "Customers", href: "/admin/customers", icon: Users },
      { name: "Payments", href: "/admin/payments", icon: CreditCard },
      { name: "Shipments", href: "/admin/shipments", icon: Truck },
      { name: "Returns", href: "/admin/returns", icon: RotateCcw },
    ],
  },
  {
    title: "LEAD MANAGEMENT",
    items: [
      { name: "Leads", href: "/admin/leads", icon: UserCheck },
      { name: "Follow-ups", href: "/admin/leads/follow-ups", icon: Calendar },
      { name: "Analytics", href: "/admin/leads/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "WEBSITE",
    items: [
      { name: "Homepage", href: "/admin/website/homepage", icon: Globe },
      { name: "Banners", href: "/admin/website", icon: Megaphone },
      { name: "Pages", href: "/admin/website/pages", icon: FileSpreadsheet },
    ],
  },
  {
    title: "CONTENT",
    items: [
      {
        name: "Gemstone Guides",
        href: "/admin/content/guides",
        icon: BookOpen,
      },
      { name: "Contact Us", href: "/admin/content/contact", icon: PhoneCall },
    ],
  },
  {
    title: "SYSTEM & SETTINGS",
    items: [
      { name: "Audit Logs", href: "/admin/system/audit", icon: ShieldAlert },
      {
        name: "Users & Permissions",
        href: "/admin/system/users",
        icon: UserCog,
      },
    ],
  },
];

export default function Sidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}) {
  const pathname = usePathname();

  // Find the longest matching href across all sidebar items to handle nested routes properly
  const allItems = sidebarGroups.flatMap((g) => g.items);
  let bestMatch = "";
  let maxLength = 0;

  allItems.forEach((item) => {
    if (pathname === item.href || pathname.startsWith(`${item.href}/`)) {
      if (item.href.length > maxLength) {
        maxLength = item.href.length;
        bestMatch = item.href;
      }
    }
  });

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-plum-950/70 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setIsOpen && setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 shrink-0 bg-plum-950 text-ivory-100 flex flex-col h-full overflow-y-auto transition-transform duration-300 ease-in-out md:static md:translate-x-0 border-r border-plum-900 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="py-2 border-b border-plum-900 bg-gold-50 flex items-center justify-center">
          {/* <h1 className="text-xl font-display font-bold text-ivory-100 tracking-wider">
            A1 GEMS
          </h1> */}
          <span className="relative grid shrink-0 place-items-center">
            <Image
              src="/logo.png"
              alt="A1 Gems Logo"
              width={80}
              height={80}
              className="object-contain w-auto h-auto"
            />
          </span>
          {/* <span className="align-middle text-[0.65rem] font-sans font-semibold text-plum-300 uppercase tracking-widest ml-2 bg-plum-900 px-2 py-0.5 rounded-md border border-plum-800">
            Admin
          </span> */}
        </div>

        <nav className="flex-1 p-4 space-y-6">
          {sidebarGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-[0.75rem] font-semibold text-gold-300 uppercase tracking-[0.14em] mb-2 px-2">
                {group.title}
              </h2>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive = item.href === bestMatch;
                  const Icon = item.icon;

                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                          isActive
                            ? "bg-plum-800 text-white font-semibold border-l-3 border-gold-400 shadow-xs"
                            : "text-plum-200 hover:bg-plum-900/70 hover:text-white border border-transparent"
                        }`}
                      >
                        <Icon
                          size={18}
                          className={`transition-colors duration-200 ${isActive ? "text-gold-400" : "text-plum-400 group-hover:text-plum-200"}`}
                        />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
