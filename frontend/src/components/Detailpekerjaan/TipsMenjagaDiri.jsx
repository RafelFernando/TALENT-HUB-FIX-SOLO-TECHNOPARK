import { ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function TipsMenjagaDiri() {
  return (
    <div className="flex gap-4 bg-yellow-50 p-4 rounded-xl border mt-8">
      <ShieldCheckIcon className="w-6 h-6 text-yellow-600" />
      <p className="text-sm text-gray-700">
        Perusahaan dan lowongan di TalentHub tidak pernah meminta data pribadi sensitif, informasi rekening, atau biaya apapun selama proses lamaran.
        Waspada lowongan melalui Google Form atau grup Telegram yang tidak terverifikasi.
      </p>
    </div>
  );
}
