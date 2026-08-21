"use client";

import { useState } from "react";
import { Search, Phone, MessageCircle } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
  product: string;
  category: string;
  message: string;
  source: string;
  date: string;
  status: "NEW" | "CONTACTED" | "FOLLOW_UP" | "QUALIFIED" | "CONVERTED" | "CLOSED" | "SPAM";
  assignedTo: string;
  notes: string;
  followUpDate: string;
}

const MOCK_LEADS: Lead[] = [
  {
    id: "LD-104",
    name: "Priya Kulkarni",
    phone: "+91 98201 44102",
    whatsapp: "+91 98201 44102",
    email: "priya.kulkarni@example.com",
    location: "Mumbai, Maharashtra",
    product: "Burmese Ruby 4.05 Carat",
    category: "Ruby (Manik)",
    message: "Interested in unheated Burmese ruby for astrological ring setting. Please share video of GRS report.",
    source: "Website Product Detail Page",
    date: "2026-08-21 11:30 AM",
    status: "NEW",
    assignedTo: "Lead Manager (Suresh)",
    notes: "Requires high clarity GRS report video.",
    followUpDate: "2026-08-21",
  },
  {
    id: "LD-103",
    name: "Dr. Arvind Mehta",
    phone: "+91 98450 11293",
    whatsapp: "+91 98450 11293",
    email: "arvind.mehta@example.com",
    location: "Bengaluru, Karnataka",
    product: "Zambian Emerald 3.82 Carat",
    category: "Emerald (Panna)",
    message: "Need 4 ratti panna for Mercury graha. Confirming if certificate specifies no oil treatment.",
    source: "Astrology Rashi Finder",
    date: "2026-08-20 04:15 PM",
    status: "CONTACTED",
    assignedTo: "Lead Manager (Suresh)",
    notes: "Called on 20th Aug. Customer wants lab photo over WhatsApp.",
    followUpDate: "2026-08-22",
  },
  {
    id: "LD-102",
    name: "Siddharth Verma",
    phone: "+91 97110 88321",
    whatsapp: "+91 97110 88321",
    email: "siddharth.v@example.com",
    location: "New Delhi",
    product: "Ceylon Blue Sapphire 5.62 Carat",
    category: "Blue Sapphire (Neelam)",
    message: "Checking availability of cornflower blue sapphire. Prefer IGI certificate.",
    source: "Direct WhatsApp Button",
    date: "2026-08-19 02:40 PM",
    status: "QUALIFIED",
    assignedTo: "Super Admin",
    notes: "Customer ready to pay via Bank Transfer once lab report verified.",
    followUpDate: "2026-08-21",
  },
];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(MOCK_LEADS[0]);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLeads = leads.filter((l) => {
    const matchesStatus = statusFilter === "ALL" || l.status === statusFilter;
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (leadId: string, newStatus: Lead["status"]) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ivory-100 font-display">
            Lead CRM (§10 & §10.2)
          </h1>
          <p className="text-xs text-gold-400 font-semibold uppercase tracking-wider">
            Lead Management & Customer Consultation Flow
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-plum-900/60 p-4 rounded-2xl border border-plum-800">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-2.5 size-4 text-plum-400" />
          <input
            type="text"
            placeholder="Search leads by customer name, product, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-plum-700 bg-plum-950 pl-9 pr-3 py-1.5 text-xs text-ivory-100 placeholder:text-plum-400 focus:border-gold-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-plum-300">Filter Status:</span>
          {["ALL", "NEW", "CONTACTED", "FOLLOW_UP", "QUALIFIED", "CONVERTED", "CLOSED"].map(
            (st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  statusFilter === st
                    ? "bg-gold-500 text-plum-950 font-bold"
                    : "bg-plum-950 text-plum-300 border border-plum-800 hover:border-gold-500/40"
                }`}
              >
                {st}
              </button>
            )
          )}
        </div>
      </div>

      {/* Grid view: Lead list (Left) + Lead Detail (Right) */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Lead List Table */}
        <div className="lg:col-span-6 space-y-3">
          {filteredLeads.map((lead) => {
            const isSelected = selectedLead?.id === lead.id;
            return (
              <div
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? "border-gold-400 bg-plum-900 shadow-gold"
                    : "border-plum-800 bg-plum-900/40 hover:border-plum-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-gold-300">
                    {lead.id}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[0.625rem] font-bold border ${
                      lead.status === "NEW"
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                        : lead.status === "QUALIFIED"
                        ? "bg-gold-500/20 text-gold-300 border-gold-500/30"
                        : "bg-plum-800 text-plum-300 border-plum-700"
                    }`}
                  >
                    {lead.status}
                  </span>
                </div>

                <h3 className="mt-2 text-base font-semibold text-ivory-100">
                  {lead.name}
                </h3>
                <p className="text-xs text-gold-400 font-medium">{lead.product}</p>
                <p className="mt-2 text-xs text-plum-300 line-clamp-2">
                  &ldquo;{lead.message}&rdquo;
                </p>

                <div className="mt-3 pt-2 border-t border-plum-800/80 flex items-center justify-between text-[0.6875rem] text-plum-400">
                  <span>{lead.location}</span>
                  <span>{lead.date}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Lead Detail (§10.2) */}
        <div className="lg:col-span-6">
          {selectedLead ? (
            <div className="rounded-2xl border border-gold-500/30 bg-plum-900 p-6 space-y-6 sticky top-20">
              <div className="flex items-center justify-between border-b border-plum-800 pb-4">
                <div>
                  <span className="font-mono text-xs font-semibold text-gold-400">
                    {selectedLead.id} · Lead Detail (§10.2)
                  </span>
                  <h2 className="text-xl font-bold text-ivory-100">{selectedLead.name}</h2>
                </div>
                <select
                  value={selectedLead.status}
                  onChange={(e) =>
                    handleStatusChange(selectedLead.id, e.target.value as Lead["status"])
                  }
                  className="rounded-xl border border-gold-500 bg-plum-950 px-3 py-1.5 text-xs font-semibold text-gold-300 focus:outline-none"
                >
                  <option value="NEW">NEW</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="FOLLOW_UP">FOLLOW_UP</option>
                  <option value="QUALIFIED">QUALIFIED</option>
                  <option value="CONVERTED">CONVERTED</option>
                  <option value="CLOSED">CLOSED</option>
                  <option value="SPAM">SPAM</option>
                </select>
              </div>

              {/* Customer Info */}
              <div>
                <h4 className="text-xs font-bold text-gold-400 uppercase tracking-widest mb-2">
                  Customer Information
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs bg-plum-950/60 p-3 rounded-xl border border-plum-800">
                  <div>
                    <span className="text-plum-400 block">Phone:</span>
                    <span className="text-ivory-100 font-semibold">{selectedLead.phone}</span>
                  </div>
                  <div>
                    <span className="text-plum-400 block">WhatsApp:</span>
                    <span className="text-emerald-400 font-semibold">{selectedLead.whatsapp}</span>
                  </div>
                  <div>
                    <span className="text-plum-400 block">Email:</span>
                    <span className="text-ivory-100 font-semibold">{selectedLead.email}</span>
                  </div>
                  <div>
                    <span className="text-plum-400 block">Location:</span>
                    <span className="text-ivory-100 font-semibold">{selectedLead.location}</span>
                  </div>
                </div>
              </div>

              {/* Enquiry Info */}
              <div>
                <h4 className="text-xs font-bold text-gold-400 uppercase tracking-widest mb-2">
                  Enquiry Details
                </h4>
                <div className="bg-plum-950/60 p-3 rounded-xl border border-plum-800 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-plum-400">Target Product:</span>
                    <span className="text-gold-300 font-semibold">{selectedLead.product}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-plum-400">Category:</span>
                    <span className="text-ivory-100 font-medium">{selectedLead.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-plum-400">Source:</span>
                    <span className="text-ivory-100">{selectedLead.source}</span>
                  </div>
                  <div className="pt-2 border-t border-plum-800">
                    <span className="text-plum-400 block mb-1">Customer Message:</span>
                    <p className="text-ivory-100 italic bg-plum-900 p-2 rounded-lg">
                      &ldquo;{selectedLead.message}&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions Taken Process (§10.2) */}
              <div>
                <h4 className="text-xs font-bold text-gold-400 uppercase tracking-widest mb-2">
                  Actions & CRM Operations
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`https://wa.me/${selectedLead.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors"
                  >
                    <MessageCircle size={15} />
                    WhatsApp Customer
                  </a>
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="flex items-center justify-center gap-2 rounded-xl bg-plum-800 border border-plum-700 px-3 py-2 text-xs font-semibold text-plum-200 hover:text-white transition-colors"
                  >
                    <Phone size={15} />
                    Direct Phone Call
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-2xl border border-plum-800 text-center text-plum-400 text-sm">
              Select a lead from the left to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
