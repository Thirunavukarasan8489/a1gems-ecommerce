'use client';

import React, { useState, useEffect } from 'react';
import { UserCog, Plus, Trash2, Shield, Lock, Mail, User as UserIcon, Check, X, Edit } from 'lucide-react';
import { AdminButton } from '@/components/admin/ui/AdminButton';
import { AdminInput } from '@/components/admin/ui/AdminInput';
import DeleteConfirmButton from '@/components/admin/ui/DeleteConfirmButton';
import { getAdminUsers, createAdminUser, deleteAdminUser, updateAdminUser } from '@/lib/actions/user.actions';

const SCREEN_PERMISSIONS = [
  { id: 'CATALOGUE', label: 'Catalogue (Products, Categories, Inventory, Media)' },
  { id: 'COMMERCE', label: 'Commerce (Orders, Customers, Payments, Shipments, Returns)' },
  { id: 'LEAD_MANAGEMENT', label: 'Lead Management (Leads, Follow-ups, Analytics)' },
  { id: 'WEBSITE', label: 'Website CMS (Homepage, Banners, Pages)' },
  { id: 'CONTENT', label: 'Content CMS (Guides, About, Contact Us)' },
  { id: 'SYSTEM', label: 'System & Settings (Audit Logs, Users)' },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'SUPER_ADMIN' | 'CONTENT_MANAGER' | 'LEAD_MANAGER'>('LEAD_MANAGER');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(['LEAD_MANAGEMENT']);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    const res = await getAdminUsers();
    if (res.success) {
      setUsers(res.data);
    }
    setLoading(false);
  };

  const handleRoleChange = (newRole: 'SUPER_ADMIN' | 'CONTENT_MANAGER' | 'LEAD_MANAGER') => {
    setRole(newRole);
    if (newRole === 'SUPER_ADMIN') {
      setSelectedPermissions(SCREEN_PERMISSIONS.map(p => p.id));
    } else if (newRole === 'CONTENT_MANAGER') {
      setSelectedPermissions(['CATALOGUE', 'WEBSITE', 'CONTENT']);
    } else if (newRole === 'LEAD_MANAGER') {
      setSelectedPermissions(['LEAD_MANAGEMENT', 'COMMERCE']);
    }
  };

  const togglePermission = (permId: string) => {
    if (selectedPermissions.includes(permId)) {
      setSelectedPermissions(selectedPermissions.filter(p => p !== permId));
    } else {
      setSelectedPermissions([...selectedPermissions, permId]);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name || !email || !password) {
      setError('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    const res = await createAdminUser({
      name,
      email,
      password,
      role,
      screenPermissions: selectedPermissions,
    });

    if (res.success) {
      setIsModalOpen(false);
      setName('');
      setEmail('');
      setPassword('');
      fetchUsers();
    } else {
      setError(res.error || 'Failed to create user');
    }
    setSubmitting(false);
  };

  const handleDeleteUser = async (id: string) => {
    const res = await deleteAdminUser(id);
    if (res.success) {
      setUsers(users.filter(u => u._id !== id));
      return { success: true };
    } else {
      return { success: false, error: res.error || 'Failed to delete user' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gold-800 dark:text-white flex items-center gap-2">
            <UserCog className="w-6 h-6 text-gold-600" />
            Admin Users & Permissions
          </h1>
          <p className="text-sm text-gold-500 dark:text-gold-400 mt-1">
            Create administrative accounts, assign roles, and configure screen permissions.
          </p>
        </div>
        <AdminButton onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus size={18} />
          Create Admin User
        </AdminButton>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gold-900 border border-gold-200 dark:border-gold-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gold-50 dark:bg-gold-800/50 border-b border-gold-200 dark:border-gold-700 text-gold-600 dark:text-gold-400">
              <tr>
                <th className="px-6 py-3.5 font-semibold">User</th>
                <th className="px-6 py-3.5 font-semibold">Role</th>
                <th className="px-6 py-3.5 font-semibold">Screen Permissions</th>
                <th className="px-6 py-3.5 font-semibold">Status</th>
                <th className="px-6 py-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-100 dark:divide-gold-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gold-400">
                    Loading admin users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gold-400">
                    No admin users found.
                  </td>
                </tr>
              ) : (
                users.map(u => (
                  <tr key={u._id} className="hover:bg-gold-50 dark:hover:bg-gold-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gold-100 dark:bg-gold-900/40 text-gold-600 dark:text-gold-300 flex items-center justify-center font-bold text-sm">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gold-900 dark:text-white">{u.name}</p>
                          <p className="text-xs text-gold-500">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        u.role === 'SUPER_ADMIN'
                          ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300'
                          : u.role === 'CONTENT_MANAGER'
                          ? 'bg-gold-100 dark:bg-gold-900/40 text-gold-700 dark:text-gold-300'
                          : 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
                      }`}>
                        {u.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-md">
                        {u.role === 'SUPER_ADMIN' ? (
                          <span className="text-xs bg-gold-100 dark:bg-gold-800 text-gold-700 dark:text-gold-300 px-2 py-0.5 rounded font-medium">
                            Full Access (All Screens)
                          </span>
                        ) : u.screenPermissions && u.screenPermissions.length > 0 ? (
                          u.screenPermissions.map((perm: string) => (
                            <span key={perm} className="text-xs bg-gold-100 dark:bg-gold-800 text-gold-600 dark:text-gold-300 px-2 py-0.5 rounded">
                              {perm.replace('_', ' ')}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-gold-400">None assigned</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span> Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DeleteConfirmButton
                        entityId={u._id}
                        entityName={u.name}
                        deleteAction={handleDeleteUser}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-gold-900/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gold-900 rounded-2xl shadow-xl max-w-lg w-full p-6 border border-gold-200 dark:border-gold-800 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gold-100 dark:border-gold-800 pb-4">
              <h2 className="text-lg font-bold text-gold-900 dark:text-white flex items-center gap-2">
                <UserCog className="w-5 h-5 text-gold-600" />
                Create New Admin User
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gold-400 hover:text-gold-600">
                <X size={20} />
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-4">
              <AdminInput
                label="Full Name *"
                placeholder="e.g. Rahul Sharma"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />

              <AdminInput
                label="Email Address *"
                type="email"
                placeholder="e.g. rahul@a1gems.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />

              <AdminInput
                label="Password *"
                type="password"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gold-700 dark:text-gold-300 mb-1.5">
                  Choose Role *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['SUPER_ADMIN', 'CONTENT_MANAGER', 'LEAD_MANAGER'] as const).map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => handleRoleChange(r)}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                        role === r
                          ? 'border-gold-600 bg-gold-50 text-gold-700 dark:bg-gold-900/30 dark:text-gold-300'
                          : 'border-gold-200 dark:border-gold-700 text-gold-600 dark:text-gold-400 hover:bg-gold-50'
                      }`}
                    >
                      {r.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Screen Permissions Selection */}
              <div>
                <label className="block text-sm font-medium text-gold-700 dark:text-gold-300 mb-2">
                  Screen Permissions
                </label>
                <div className="space-y-2 bg-gold-50 dark:bg-gold-800/40 p-3 rounded-lg border border-gold-200 dark:border-gold-700">
                  {SCREEN_PERMISSIONS.map(perm => (
                    <label key={perm.id} className="flex items-center gap-2 text-xs text-gold-700 dark:text-gold-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPermissions.includes(perm.id)}
                        onChange={() => togglePermission(perm.id)}
                        disabled={role === 'SUPER_ADMIN'}
                        className="rounded border-gold-300 text-gold-600 focus:ring-gold-500"
                      />
                      <span>{perm.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gold-100 dark:border-gold-800">
                <AdminButton type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </AdminButton>
                <AdminButton type="submit" isLoading={submitting}>
                  Save & Create Login
                </AdminButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
