import { getNavData } from "@/lib/services/nav-service";
import NavForm from "./nav-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Navigation & Business Config | Admin | A1 Gems",
};

export default async function NavAdminPage() {
  const navData = await getNavData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-plum-900">Navigation & Business Config</h1>
      </div>

      <NavForm initialData={navData} />
    </div>
  );
}
