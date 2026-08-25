'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  UserCog
} from 'lucide-react';

const sidebarGroups = [
  {
    title: 'DASHBOARD',
    items: [
      { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    ],
  },
  {
    title: 'CATALOGUE',
    items: [
      { name: 'Categories', href: '/admin/categories', icon: Layers },
      { name: 'Products', href: '/admin/products', icon: Package },
      { name: 'Inventory', href: '/admin/inventory', icon: Boxes },
      { name: 'Media Library', href: '/admin/media', icon: ImageIcon },
    ],
  },
  {
    title: 'COMMERCE',
    items: [
      { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
      { name: 'Customers', href: '/admin/customers', icon: Users },
      { name: 'Payments', href: '/admin/payments', icon: CreditCard },
      { name: 'Shipments', href: '/admin/shipments', icon: Truck },
      { name: 'Returns', href: '/admin/returns', icon: RotateCcw },
    ],
  },
  {
    title: 'LEAD MANAGEMENT',
    items: [
      { name: 'Leads', href: '/admin/leads', icon: UserCheck },
      { name: 'Follow-ups', href: '/admin/leads/follow-ups', icon: Calendar },
      { name: 'Analytics', href: '/admin/leads/analytics', icon: BarChart3 },
    ],
  },
  {
    title: 'WEBSITE',
    items: [
      { name: 'Homepage', href: '/admin/website/homepage', icon: Globe },
      { name: 'Banners', href: '/admin/website', icon: Megaphone },
      { name: 'Pages', href: '/admin/website/pages', icon: FileSpreadsheet },
    ],
  },
  {
    title: 'CONTENT',
    items: [
      { name: 'Gemstone Guides', href: '/admin/content/guides', icon: BookOpen },
      { name: 'Contact Us', href: '/admin/content/contact', icon: PhoneCall },
    ],
  },
  {
    title: 'SYSTEM & SETTINGS',
    items: [
      { name: 'Audit Logs', href: '/admin/system/audit', icon: ShieldAlert },
      { name: 'Users & Permissions', href: '/admin/system/users', icon: UserCog },
    ],
  }
];

export default function Sidebar({ isOpen, setIsOpen }: { isOpen?: boolean, setIsOpen?: (isOpen: boolean) => void }) {
  const pathname = usePathname();

  // Find the longest matching href across all sidebar items to handle nested routes properly
  const allItems = sidebarGroups.flatMap(g => g.items);
  let bestMatch = '';
  let maxLength = 0;

  allItems.forEach(item => {
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
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden" 
          onClick={() => setIsOpen && setIsOpen(false)}
        />
      )}
      
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 shrink-0 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 flex flex-col h-full overflow-y-auto transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b border-gray-200 dark:border-slate-800 flex items-center justify-center">
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">A1 GEMS <span className="text-sm font-normal text-slate-500">Admin</span></h1>
        </div>

        <nav className="flex-1 p-4 space-y-6">
          {sidebarGroups.map((group) => (
          <div key={group.title}>
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
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
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400 font-medium'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Icon size={18} className={isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'} />
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
