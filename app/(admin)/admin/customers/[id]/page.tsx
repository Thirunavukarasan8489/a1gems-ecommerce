import { getCustomerById } from "@/lib/actions/customer.actions";
import { notFound } from "next/navigation";
import { Mail, Phone, MapPin, Briefcase, ShoppingBag } from "lucide-react";
import StatusBadge from "@/components/admin/ui/StatusBadge";

export const dynamic = "force-dynamic";

export default async function CustomerDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const result = await getCustomerById(params.id);

  if (!result.success || !result.data) {
    notFound();
  }

  const customer = result.data;
  const name =
    `${customer.profile?.firstName || ""} ${customer.profile?.lastName || ""}`.trim() ||
    "Guest Customer";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-plum-950">{name}</h1>
          <p className="text-sm text-plum-600 mt-1 capitalize">
            {customer.type?.toLowerCase() || "Personal"} Customer
          </p>
        </div>
        <div>
          <StatusBadge
            label={customer.metrics?.totalOrders > 0 ? "Active" : "Inactive"}
            variant={customer.metrics?.totalOrders > 0 ? "success" : "neutral"}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Info */}
        <div className="rounded-xl border border-ivory-300 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-plum-950 mb-4 flex items-center gap-2">
            <Mail size={18} className="text-plum-400" />
            Contact Information
          </h2>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-plum-500 mb-1">Email</p>
              <p className="font-medium text-plum-900">
                {customer.contact?.email || "—"}
              </p>
            </div>
            <div>
              <p className="text-plum-500 mb-1">Phone</p>
              <p className="font-medium text-plum-900">
                {customer.contact?.phone || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Business Info (If applicable) */}
        {customer.type === "BUSINESS" && (
          <div className="rounded-xl border border-ivory-300 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-plum-950 mb-4 flex items-center gap-2">
              <Briefcase size={18} className="text-plum-400" />
              Business Details
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-plum-500 mb-1">Company Name</p>
                <p className="font-medium text-plum-900">
                  {customer.businessDetails?.companyName || "—"}
                </p>
              </div>
              <div>
                <p className="text-plum-500 mb-1">GSTIN</p>
                <p className="font-medium text-plum-900">
                  {customer.businessDetails?.gstin || "—"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Metrics Overview */}
        <div className="rounded-xl border border-ivory-300 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-plum-950 mb-4 flex items-center gap-2">
            <ShoppingBag size={18} className="text-plum-400" />
            Commerce Metrics
          </h2>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-plum-500 mb-1">Total Orders</p>
              <p className="font-medium text-plum-900 text-lg">
                {customer.metrics?.totalOrders || 0}
              </p>
            </div>
            <div>
              <p className="text-plum-500 mb-1">Total Spent</p>
              <p className="font-medium text-gold-600 text-lg">
                ₹{(customer.metrics?.totalSpend || 0).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Addresses */}
      {customer.addresses && customer.addresses.length > 0 && (
        <div className="rounded-xl border border-ivory-300 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-ivory-300 bg-plum-50/50 px-6 py-4">
            <h2 className="font-semibold text-plum-950 flex items-center gap-2">
              <MapPin size={18} className="text-plum-400" />
              Saved Addresses
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            {customer.addresses.map((address: any, index: number) => (
              <div
                key={index}
                className="rounded-lg border border-ivory-200 p-4 text-sm bg-ivory-50/30"
              >
                <p className="font-semibold text-plum-900">{address.name}</p>
                <p className="text-plum-600 mt-1">{address.phone}</p>
                <div className="mt-2 text-plum-700">
                  <p>{address.street1}</p>
                  {address.street2 && <p>{address.street2}</p>}
                  <p>
                    {address.city}, {address.state} {address.zip}
                  </p>
                  <p>{address.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
