'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  // Don't render on the root admin dashboard
  if (pathname === '/admin') return null;

  const paths = pathname.split('/').filter((p) => p !== '');
  
  // Example: /admin/leads/create
  // paths = ['admin', 'leads', 'create']
  // We want to skip 'admin' visually but include it in the href

  return (
    <nav className="flex items-center text-sm text-gold-600 dark:text-gold-300 mb-6" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <Link href="/admin" className="hover:text-gold-600 dark:hover:text-gold-400 flex items-center transition-colors">
            <Home size={16} className="mr-1 text-gold-500" />
            Dashboard
          </Link>
        </li>
        {paths.map((path, index) => {
          if (path === 'admin') return null; // Skip the root word
          
          const href = `/${paths.slice(0, index + 1).join('/')}`;
          const isLast = index === paths.length - 1;
          
          // Format text: 'follow-ups' -> 'Follow-ups'
          const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');

          return (
            <li key={path}>
              <div className="flex items-center">
                <ChevronRight size={16} className="mx-1 text-gold-400 dark:text-gold-500" />
                {isLast ? (
                  <span className="text-gold-900 dark:text-gold-100 font-semibold">{label}</span>
                ) : (
                  <Link href={href} className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors">
                    {label}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
