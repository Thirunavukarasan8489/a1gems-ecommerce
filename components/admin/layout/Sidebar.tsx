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
          className="fixed inset-0 bg-plum-950/60 backdrop-blur-xs z-40 md:hidden" 
          onClick={() => setIsOpen && setIsOpen(false)}
        />
      )}
      
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 shrink-0 bg-plum-950 text-ivory-100 flex flex-col h-full overflow-y-auto transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b border-plum-900/60 flex items-center justify-center">
          <h1 className="text-xl font-display font-bold text-ivory-100 tracking-wider">A1 GEMS <span className="text-xs font-sans font-semibold text-gold-400 uppercase tracking-widest ml-1 bg-gold-500/10 px-2 py-0.5 rounded-full border border-gold-500/20">Admin</span></h1>
        </div>

        <nav className="flex-1 p-4 space-y-6">
          {sidebarGroups.map((group) => (
          <div key={group.title}>
            <h2 className="text-[0.65rem] font-semibold text-gold-500/70 uppercase tracking-[0.14em] mb-2">
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
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                        isActive
                          ? 'bg-gold-500/15 text-gold-300 font-semibold border-l-2 border-gold-400 ring-1 ring-gold-400/20'
                          : 'text-plum-200 hover:bg-plum-900/60 hover:text-gold-200'
                      }`}
                    >
                      <Icon size={18} className={isActive ? 'text-gold-400' : 'text-plum-300/70'} />
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
