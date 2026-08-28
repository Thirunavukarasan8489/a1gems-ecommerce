'use client';

import { useState } from 'react';
import { Search, Download, FileText, FileSpreadsheet, ChevronLeft, ChevronRight, ChevronDown, Filter } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  title?: string;
  selectable?: boolean;
}

export default function DataTable<T>({ columns, data, title = "Data", selectable = false }: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gold-950 border border-gold-200 dark:border-gold-900 shadow-sm rounded-2xl overflow-hidden">
      
      {/* Table Toolbar */}
      <div className="p-5 border-b border-gold-200 dark:border-gold-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-gold-950">
        <h3 className="text-lg font-display font-semibold text-gold-900 dark:text-gold-50 tracking-wide">{title}</h3>
        
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search size={16} className="text-gold-400" />
            </span>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gold-200 dark:border-gold-800 rounded-xl text-sm bg-gold-50/50 dark:bg-gold-900/50 text-gold-900 dark:text-gold-100 focus:outline-none focus:ring-2 focus:ring-gold-400/30 w-full sm:w-64 transition-all hover:bg-gold-50 dark:hover:bg-gold-900"
            />
          </div>

          {/* Filter */}
          <button className="p-2 border border-gold-200 dark:border-gold-800 text-gold-700 dark:text-gold-300 rounded-xl hover:bg-gold-50 dark:hover:bg-gold-900 transition-colors">
            <Filter size={18} />
          </button>

          {/* Export Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setExportOpen(!exportOpen)}
              className="flex items-center gap-2 px-3 py-2 border border-gold-200 dark:border-gold-800 text-gold-800 dark:text-gold-200 rounded-xl hover:bg-gold-50 dark:hover:bg-gold-900 text-sm font-medium transition-colors"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Export</span>
              <ChevronDown size={14} className="text-gold-400" />
            </button>

            {exportOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gold-900 border border-gold-300 dark:border-gold-800 rounded-lg shadow-lg z-20 py-1">
                <button className="w-full text-left px-4 py-2 text-sm text-gold-800 dark:text-gold-100 hover:bg-gold-100 dark:hover:bg-gold-800 flex items-center gap-2">
                  <FileText size={16} className="text-gold-400" /> CSV
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gold-800 dark:text-gold-100 hover:bg-gold-100 dark:hover:bg-gold-800 flex items-center gap-2">
                  <FileSpreadsheet size={16} className="text-emerald-600 dark:text-emerald-400" /> Excel
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gold-800 dark:text-gold-100 hover:bg-gold-100 dark:hover:bg-gold-800 flex items-center gap-2">
                  <FileText size={16} className="text-red-500 dark:text-red-400" /> PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gold-50/80 dark:bg-gold-900/40 border-b border-gold-200 dark:border-gold-900">
              {selectable && (
                <th className="px-5 py-4 w-12">
                  <input type="checkbox" className="rounded border-gold-300 text-gold-600 focus:ring-gold-500/50 dark:border-gold-700 dark:bg-gold-950" />
                </th>
              )}
              {columns.map((col, i) => (
                <th key={i} className="px-5 py-4 text-[0.7rem] font-bold text-gold-600 dark:text-gold-400 uppercase tracking-wider">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gold-100 dark:divide-gold-900">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-5 py-8 text-center text-gold-500 dark:text-gold-400">
                  No data found.
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={i} className="hover:bg-gold-50/50 dark:hover:bg-gold-900/30 transition-colors group">
                  {selectable && (
                    <td className="px-5 py-4.5 whitespace-nowrap">
                      <input type="checkbox" className="rounded border-gold-300 text-gold-600 focus:ring-gold-500/50 dark:border-gold-700 dark:bg-gold-900" />
                    </td>
                  )}
                  {columns.map((col, j) => (
                    <td key={j} className="px-5 py-4.5 whitespace-nowrap text-sm text-gold-800 dark:text-gold-200">
                      {col.cell ? col.cell(row) : col.accessorKey ? String(row[col.accessorKey]) : null}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-5 py-4 border-t border-gold-200 dark:border-gold-900 flex items-center justify-between bg-gold-50/30 dark:bg-gold-950">
        <p className="text-sm text-gold-500 dark:text-gold-400">
          Showing <span className="font-medium text-gold-700 dark:text-gold-200">1</span> to <span className="font-medium text-gold-700 dark:text-gold-200">{Math.min(10, data.length)}</span> of <span className="font-medium text-gold-700 dark:text-gold-200">{data.length}</span> results
        </p>
        <div className="flex gap-1.5">
          <button className="p-1.5 border border-gold-200 dark:border-gold-800 rounded-lg text-gold-500 dark:text-gold-400 hover:bg-gold-100 dark:hover:bg-gold-900 transition-colors disabled:opacity-50 disabled:pointer-events-none">
            <ChevronLeft size={18} />
          </button>
          <button className="p-1.5 border border-gold-200 dark:border-gold-800 rounded-lg text-gold-500 dark:text-gold-400 hover:bg-gold-100 dark:hover:bg-gold-900 transition-colors disabled:opacity-50 disabled:pointer-events-none">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
