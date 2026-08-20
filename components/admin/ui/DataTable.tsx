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
}

export default function DataTable<T>({ columns, data, title = "Data" }: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-xl overflow-hidden">
      
      {/* Table Toolbar */}
      <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{title}</h3>
        
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search size={16} className="text-slate-400" />
            </span>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-md text-sm bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64 transition-colors"
            />
          </div>

          {/* Filter */}
          <button className="p-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <Filter size={18} />
          </button>

          {/* Export Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setExportOpen(!exportOpen)}
              className="flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-medium transition-colors"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Export</span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>

            {exportOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg z-20 py-1">
                <button className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2">
                  <FileText size={16} className="text-slate-400" /> CSV
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2">
                  <FileSpreadsheet size={16} className="text-green-600 dark:text-green-500" /> Excel
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2">
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
            <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <th className="px-5 py-3 w-12">
                <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700" />
              </th>
              {columns.map((col, i) => (
                <th key={i} className="px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-5 py-8 text-center text-slate-500 dark:text-slate-400">
                  No data found.
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-5 py-4 whitespace-nowrap">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700" />
                  </td>
                  {columns.map((col, j) => (
                    <td key={j} className="px-5 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">
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
      <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing <span className="font-medium text-slate-700 dark:text-slate-200">1</span> to <span className="font-medium text-slate-700 dark:text-slate-200">{Math.min(10, data.length)}</span> of <span className="font-medium text-slate-700 dark:text-slate-200">{data.length}</span> results
        </p>
        <div className="flex gap-1">
          <button className="p-1 border border-slate-200 dark:border-slate-700 rounded text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50">
            <ChevronLeft size={18} />
          </button>
          <button className="p-1 border border-slate-200 dark:border-slate-700 rounded text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
