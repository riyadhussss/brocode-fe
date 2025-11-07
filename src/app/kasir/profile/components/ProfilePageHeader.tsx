import { ShieldCheck } from "lucide-react";

export function ProfilePageHeader() {
  return (
    <div className="mb-6">
      <div className="flex items-center space-x-3 mb-2">
        <ShieldCheck className="h-8 w-8 text-[#FDFB03]" />
        <h1 className="text-2xl font-bold text-gray-900">Profil</h1>
      </div>
      <p className="text-gray-600 text-sm">
        Kelola informasi profil dan keamanan Anda
      </p>
    </div>
  );
}
