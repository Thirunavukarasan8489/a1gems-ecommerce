'use client';

import React, { useState, useEffect } from 'react';
import { PhoneCall, Save, MapPin, Mail, Phone, Clock, MessageSquare } from 'lucide-react';
import { AdminButton } from '@/components/admin/ui/AdminButton';
import { AdminInput } from '@/components/admin/ui/AdminInput';

export default function ContactContentPage() {
  const [phone, setPhone] = useState('+91 98765 43210');
  const [whatsapp, setWhatsapp] = useState('+91 98765 43210');
  const [email, setEmail] = useState('support@a1gems.com');
  const [address, setAddress] = useState('42, Gemstone Plaza, Johari Bazaar, Jaipur, Rajasthan 302003');
  const [mapEmbedUrl, setMapEmbedUrl] = useState('https://www.google.com/maps/embed?...');
  const [workingHours, setWorkingHours] = useState('Mon - Sat: 10:00 AM - 7:30 PM (Sunday Closed)');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Simulate save / API
    await new Promise(r => setTimeout(r, 600));
    setSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gold-800 dark:text-white flex items-center gap-2">
            <PhoneCall className="w-6 h-6 text-gold-600" />
            Contact Information CMS
          </h1>
          <p className="text-sm text-gold-500 dark:text-gold-400 mt-1">
            Update phone numbers, WhatsApp lines, showroom address, and operating hours.
          </p>
        </div>
        <AdminButton onClick={handleSave} isLoading={saving} className="gap-2">
          <Save size={18} />
          Save Changes
        </AdminButton>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-green-50 text-green-700 border border-green-200 rounded-xl text-sm font-medium">
          Contact details updated successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white dark:bg-gold-900 border border-gold-200 dark:border-gold-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Direct Contacts */}
        <div>
          <h2 className="text-base font-semibold text-gold-900 dark:text-white mb-4 border-b border-gold-100 dark:border-gold-800 pb-2">
            Direct Communication Channels
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AdminInput
              label="Primary Phone Number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+91..."
            />
            <AdminInput
              label="WhatsApp Support Number"
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
              placeholder="+91..."
            />
            <div className="sm:col-span-2">
              <AdminInput
                label="Official Email Address"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="contact@a1gems.com"
              />
            </div>
          </div>
        </div>

        {/* Location & Hours */}
        <div>
          <h2 className="text-base font-semibold text-gold-900 dark:text-white mb-4 border-b border-gold-100 dark:border-gold-800 pb-2">
            Showroom Location & Working Hours
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gold-700 dark:text-gold-300 mb-1.5">
                Physical Showroom Address
              </label>
              <textarea
                rows={3}
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full rounded-lg bg-gold-50 dark:bg-gold-900/50 text-gold-900 dark:text-white border border-gold-200 dark:border-gold-700 focus:outline-none focus:ring-2 focus:ring-gold-500 px-3 py-2.5 text-sm"
              />
            </div>

            <AdminInput
              label="Operating / Working Hours"
              value={workingHours}
              onChange={e => setWorkingHours(e.target.value)}
              placeholder="e.g. Mon-Sat 10am - 8pm"
            />

            <AdminInput
              label="Google Maps Embed URL"
              value={mapEmbedUrl}
              onChange={e => setMapEmbedUrl(e.target.value)}
              placeholder="https://maps.google.com/..."
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gold-100 dark:border-gold-800">
          <AdminButton type="submit" isLoading={saving} className="gap-2">
            <Save size={18} />
            Save Changes
          </AdminButton>
        </div>
      </form>
    </div>
  );
}
