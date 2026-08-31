import { getRashiList } from "@/lib/services/rashi-service";
import RashiManager from "./rashi-manager";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rashi Astrology | Admin | A1 Gems",
};

export default async function RashiAdminPage() {
  const rashis = await getRashiList();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-plum-900">Rashi Astrology Configuration</h1>
      </div>

      <RashiManager initialData={rashis} />
    </div>
    
  );
}
