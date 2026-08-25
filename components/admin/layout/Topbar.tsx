'use client';

import { Search, Bell, Moon, Sun, User as UserIcon, Menu, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const [isDark, setIsDark] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { data: session } = useSession();
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Simple toggle for dark mode (requires a ThemeProvider in layout)
  const toggleDark = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="h-16 bg-white/95 dark:bg-plum-900/95 border-b border-ivory-300 dark:border-plum-800 flex items-center justify-between px-4 md:px-6 shadow-xs backdrop-blur-md z-10">
      
      {/* Left side: Search & Mobile Menu */}
      <div className="flex-1 flex items-center gap-2">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-plum-700 dark:text-plum-200 hover:bg-ivory-200 dark:hover:bg-plum-800 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
        <div className="relative w-full max-w-xs hidden sm:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={18} className="text-plum-400 dark:text-plum-400" />
          </span>
          <input
            type="text"
            placeholder="Search (CMD+K)"
            className="w-full pl-10 pr-4 py-2 bg-ivory-100 dark:bg-plum-950 border border-ivory-300 dark:border-plum-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 text-plum-900 dark:text-ivory-100 placeholder-plum-400 transition-colors"
          />
        </div>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center gap-4">
        

        <div className="h-6 w-px bg-ivory-300 dark:bg-plum-800 mx-1"></div>

        {/* Theme Toggle */}
        <button 
          onClick={toggleDark}
          className="p-2 text-plum-600 dark:text-plum-300 hover:bg-ivory-200 dark:hover:bg-plum-800 rounded-full transition-colors"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-plum-600 dark:text-plum-300 hover:bg-ivory-200 dark:hover:bg-plum-800 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-gold-500 border-2 border-white dark:border-plum-900 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 hover:bg-ivory-200 dark:hover:bg-plum-800 rounded-full pr-3 transition-colors border border-transparent hover:border-ivory-300 dark:hover:border-plum-700"
          >
            <div className="w-8 h-8 bg-gold-500/15 dark:bg-gold-500/20 rounded-full flex items-center justify-center text-gold-600 dark:text-gold-300 border border-gold-500/30">
              <UserIcon size={16} />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-plum-900 dark:text-ivory-100 leading-none">
                {session?.user?.name || 'Admin User'}
              </p>
              <p className="text-xs text-gold-700 dark:text-gold-400 mt-1 capitalize font-semibold">
                {((session as any)?.role as string)?.replace('_', ' ').toLowerCase() || 'Super Admin'}
              </p>
            </div>
            <ChevronDown size={14} className="text-plum-400 hidden md:block" />
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700 md:hidden">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  {session?.user?.name || 'Admin User'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 capitalize mt-1">
                  {((session as any)?.role as string)?.replace('_', ' ').toLowerCase() || 'Super Admin'}
                </p>
              </div>
              <button 
                onClick={() => {
                  setIsProfileOpen(false);
                  // Optional: route to settings
                }}
                className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2"
              >
                <Settings size={16} className="text-slate-400" />
                Account Settings
              </button>
              <button 
                onClick={() => {
                  setIsProfileOpen(false);
                  signOut({ callbackUrl: '/admin/login' });
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
