"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Lock, Mail, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const [role, setRole] = useState("Super Admin");
  const [email, setEmail] = useState("admin@a1gems.com");
  const [password, setPassword] = useState("••••••••••••");

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="rounded-2xl border border-gold-500/30 bg-plum-900 p-8 shadow-2xl">
        <div className="text-center">
          <div className="size-14 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-display text-xl font-bold text-plum-950 mx-auto shadow-gold">
            A1
          </div>
          <h1 className="mt-4 text-2xl font-bold text-ivory-100">
            A1 Gems Admin Access
          </h1>
          <p className="mt-1 text-xs text-gold-400 font-semibold uppercase tracking-wider">
            §5 Role Based Access Control (RBAC)
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-plum-200 uppercase mb-1">
              Select Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border border-plum-700 bg-plum-950 px-3 py-2 text-sm text-ivory-100 focus:border-gold-400 focus:outline-none"
            >
              <option value="Super Admin">Super Admin (Full Access)</option>
              <option value="Content Manager">Content Manager (CMS & Catalogue)</option>
              <option value="Lead Manager">Lead Manager (CRM & Enquiries)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-plum-200 uppercase mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 size-4 text-plum-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-plum-700 bg-plum-950 pl-9 pr-3 py-2 text-sm text-ivory-100 focus:border-gold-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-plum-200 uppercase mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 size-4 text-plum-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-plum-700 bg-plum-950 pl-9 pr-3 py-2 text-sm text-ivory-100 focus:border-gold-400 focus:outline-none"
              />
            </div>
          </div>

          <Link
            href="/admin"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-4 py-2.5 text-sm font-semibold text-plum-950 shadow-gold hover:from-gold-400 hover:to-gold-500 transition-all mt-4"
          >
            Sign In as {role}
            <ArrowRight size={16} />
          </Link>
        </form>

        <div className="mt-6 pt-4 border-t border-plum-800 text-center text-xs text-plum-400">
          <p className="flex items-center justify-center gap-1">
            <ShieldCheck size={14} className="text-emerald-400" />
            Protected by A1 Gems 2FA Security System
          </p>
        </div>
      </div>
    </div>
  );
}
