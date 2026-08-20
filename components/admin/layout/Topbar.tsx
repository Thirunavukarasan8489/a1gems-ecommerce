'use client';

import { Search, Bell, Moon, Sun, User as UserIcon, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const [isDark, setIsDark] = useState(false);

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
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-6 shadow-sm z-10">
      
      {/* Left side: Search & Mobile Menu */}
      <div className="flex-1 flex items-center gap-2">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
        >
          <Menu size={24} />
        </button>
        <div className="relative w-full max-w-xs hidden sm:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={18} className="text-slate-400" />
          </span>
          <input
            type="text"
            placeholder="Search (CMD+K)"
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-200 transition-colors"
          />
        </div>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center gap-4">
        
        {/* Quick Add Dropdown placeholder */}
        <button className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
          + Add New
        </button>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>

        {/* Theme Toggle */}
        <button 
          onClick={toggleDark}
          className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full pr-3 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300">
            <UserIcon size={16} />
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200 leading-none">Admin</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Super Admin</p>
          </div>
        </button>
      </div>
    </header>
  );
}
