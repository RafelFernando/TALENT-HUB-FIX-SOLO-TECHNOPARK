import {
  CheckCircleIcon,
  BriefcaseIcon,
  UserGroupIcon,
  MapPinIcon,
  GlobeAltIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

export default function CompanyInfoCard({ company }) {
  if (!company)
    return <p className="mt-6 text-gray-500">Informasi perusahaan tidak tersedia.</p>;

  // ✅ Helper function untuk format URL gambar
  const getImageUrl = (filename) => {
    if (!filename) {
      return "https://via.placeholder.com/80?text=No+Image";
    }

    return `http://localhost:3000/uploads/profile-images/${filename}`;
  };

  return (
    <div className="border p-6 rounded-2xl mt-6 bg-white shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <img
            src={getImageUrl(company.profileImage)}
            alt={company.companyName}
            className="w-20 h-20 rounded-lg object-cover bg-gray-100"
            onError={(e) => {
              // ✅ Fallback jika gambar gagal load
              console.error("Failed to load image:", company.profileImage);
              console.error("Attempted URL:", e.target.src);
              e.target.src = "https://via.placeholder.com/80?text=No+Image";
              e.target.onerror = null; // Prevent infinite loop
            }}
          />
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-1">
              {company.companyName}
              <CheckCircleIcon className="w-5 h-5 text-blue-500" />
            </h3>
            <p className="text-gray-500 text-sm">
              {company.province}, {company.city}
            </p>
          </div>
        </div>

        {company.website && (
          <a
            href={company.website.startsWith("http") ? company.website : `https://${company.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#193F7A] text-sm font-semibold flex items-center gap-1 hover:underline"
          >
            Kunjungi Situs <ChevronRightIcon className="w-4 h-4" />
          </a>
        )}
      </div>

      {/* Body */}
      <div className="mt-4 text-sm text-gray-700 space-y-2">
        <p className="flex items-center gap-1">
          <BriefcaseIcon className="w-4 h-4" /> {company.field || "Bidang tidak ditentukan"}
        </p>
        <p className="flex items-center gap-1">
          <UserGroupIcon className="w-4 h-4" /> {company.employeeCount} karyawan
        </p>
        <p className="flex items-center gap-1">
          <GlobeAltIcon className="w-4 h-4" /> {company.email}
        </p>
        <p className="flex items-center gap-1">
          <MapPinIcon className="w-4 h-4" /> {company.address}
        </p>

        <p className="mt-3 leading-relaxed">{company.aboutUs}</p>
      </div>
    </div>
  );
}