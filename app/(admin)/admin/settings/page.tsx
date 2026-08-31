import { getCommerceSettings } from "@/lib/services/settings-service";
import SettingsForm from "./settings-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commerce Settings | Admin | A1 Gems",
};

export default async function SettingsAdminPage() {
  const settings = await getCommerceSettings();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-plum-900">Commerce Settings</h1>
      </div>

      <SettingsForm initialData={settings} />
    </div>
  );
}
