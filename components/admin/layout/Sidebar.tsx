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
          className="fixed inset-0 bg-gold-950/60 backdrop-blur-xs z-40 md:hidden" 
          onClick={() => setIsOpen && setIsOpen(false)}
        />
      )}
      
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 shrink-0 bg-gold-950 text-ivory-100 flex flex-col h-full overflow-y-auto transition-transform duration-300 ease-in-out md:static md:translate-x-0 border-r border-gold-900 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-gold-900 flex items-center justify-center">
          <h1 className="text-2xl font-display font-bold text-gold-50 tracking-wider">
            A1 GEMS 
            <span className="align-top text-[0.6rem] font-sans font-bold text-gold-400 uppercase tracking-widest ml-1.5 bg-gold-900/80 px-2 py-0.5 rounded-full border border-gold-800">Admin</span>
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-7">
          {sidebarGroups.map((group) => (
          <div key={group.title}>
            <h2 className="text-[0.65rem] font-bold text-gold-600 uppercase tracking-[0.15em] mb-3 px-2">
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
                      className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[0.875rem] transition-all duration-300 ${
                        isActive
                          ? 'bg-gold-900 text-white font-medium shadow-inner border border-gold-800/60'
                          : 'text-gold-200 hover:bg-gold-900/50 hover:text-white border border-transparent'
                      }`}
                    >
                      <Icon size={18} className={`transition-colors duration-300 ${isActive ? 'text-gold-400' : 'text-gold-600 group-hover:text-gold-400'}`} />
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
