import React, { useState } from "react";
import {
  BriefcaseIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function PekerjaanCardFilter({ jobs = [], filters, companies = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 🔧 Mapping employer_id → company
  const companyMap = {};
  companies.forEach(c => {
    companyMap[c.user_id] = c;
  });

  // ✅ Helper function untuk format URL gambar
  const getImageUrl = (filename) => {
    if (!filename) {
      return "https://via.placeholder.com/80?text=No+Image";
    }

    return `http://localhost:3000/uploads/profile-images/${filename}`;
  };

  // ✅ Helper function untuk cek status aktif
  const isJobActive = (status) => {
    if (!status) return false;
    const normalizedStatus = status.toLowerCase().trim();
    return normalizedStatus === "active" || normalizedStatus === "open";
  };

  // ✅ Filter pertama: Hanya tampilkan lowongan dengan status aktif (Open/Active)
  let filteredJobs = jobs.filter(job => isJobActive(job.status));

  // 🔍 Filter search (hanya pada lowongan aktif)
  filteredJobs = filteredJobs.filter(job => {
    const title = job.title?.toLowerCase() || "";
    const employer = job.company_name?.toLowerCase() || "";
    const category = job.category_name?.toLowerCase() || "";
    const location = job.location?.toLowerCase() || "";
    
    const searchLower = searchTerm.toLowerCase();
    return title.includes(searchLower) || 
           employer.includes(searchLower) || 
           category.includes(searchLower) ||
           location.includes(searchLower);
  });

  // 🔧 Filter tambahan - DIPERBAIKI
  // Hanya terapkan filter jika filters bukan null (sudah klik tombol Cari)
  if (filters && Object.keys(filters).length > 0) {
    const { sort, kategori, provinsi, kota, gaji } = filters;

    console.log("🔍 Active Filters:", { kategori, provinsi, kota, gaji });

    // Filter berdasarkan kategori (menggunakan job_category_id)
    if (kategori) {
      filteredJobs = filteredJobs.filter(job => {
        const jobCategoryId = job.job_category_id;
        const filterCategoryId = parseInt(kategori);
        console.log(`Job: ${job.title}, Category ID: ${jobCategoryId}, Filter: ${filterCategoryId}`);
        return jobCategoryId === filterCategoryId;
      });
    }

    // Filter berdasarkan provinsi (check di company_province atau location)
    if (provinsi) {
      filteredJobs = filteredJobs.filter(job => {
        const companyProvince = job.company_province?.toLowerCase() || "";
        const location = job.location?.toLowerCase() || "";
        const filterProvinsi = provinsi.toLowerCase();
        
        return companyProvince.includes(filterProvinsi) || location.includes(filterProvinsi);
      });
    }

    // Filter berdasarkan kota (check di company_city atau location dengan substring matching)
    if (kota) {
      filteredJobs = filteredJobs.filter(job => {
        const companyCity = (job.company_city || "").toLowerCase()
          .replace(/^kota\s+/i, '')
          .replace(/^kabupaten\s+/i, '')
          .replace(/^kab\.\s+/i, '');
          
        const location = (job.location || "").toLowerCase()
          .replace(/^kota\s+/i, '')
          .replace(/^kabupaten\s+/i, '')
          .replace(/^kab\.\s+/i, '');
          
        const filterKota = kota.toLowerCase();
        
        // Cek apakah nama kota yang dipilih ADA DI DALAM company_city atau location
        // Contoh: filterKota = "jakarta" akan match dengan "Jakarta Pusat", "Jakarta Selatan", dll
        // Atau filterKota = "surakarta" akan match dengan "Kota Surakarta", "Surakarta", dll
        console.log(`Checking job: ${job.title} | City: ${companyCity} | Location: ${location} | Filter: ${filterKota}`);
        return companyCity.includes(filterKota) || location.includes(filterKota);
      });
    }

    // Filter berdasarkan gaji minimum
    if (gaji) {
      filteredJobs = filteredJobs.filter(job => {
        const salaryMin = parseFloat(job.salary_min || 0);
        const filterGaji = parseFloat(gaji);
        return salaryMin >= filterGaji;
      });
    }

    // Sorting
    if (sort === "terbaru") {
      filteredJobs.sort((a, b) => new Date(b.posted_at) - new Date(a.posted_at));
    } else if (sort === "terlama") {
      filteredJobs.sort((a, b) => new Date(a.posted_at) - new Date(b.posted_at));
    } else if (sort === "gaji_tertinggi") {
      filteredJobs.sort((a, b) => parseFloat(b.salary_max || 0) - parseFloat(a.salary_max || 0));
    } else if (sort === "gaji_terendah") {
      filteredJobs.sort((a, b) => parseFloat(a.salary_min || 0) - parseFloat(b.salary_min || 0));
    }
  }

  console.log(`📊 Total jobs after filter: ${filteredJobs.length}`);

  // ✅ Tambah info tentang jumlah lowongan yang difilter
  const totalJobs = jobs.length;
  const activeJobs = jobs.filter(job => isJobActive(job.status)).length;
  const closedJobs = totalJobs - activeJobs;

  // 📄 Pagination
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full bg-gray-50 py-10 px-4 flex flex-col">
      {/* 🔎 Search input */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Cari lowongan..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-xl px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
          />
          
        </div>
        
        {/* Indikator Filter Aktif */}
        {filters && Object.values(filters).some(v => v) && (
          <div className="flex items-center gap-2 text-sm">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
              ✓ Filter aktif
            </span>
            {filters.kategori && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                Kategori
              </span>
            )}
            {filters.provinsi && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                {filters.provinsi}
              </span>
            )}
            {filters.kota && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                {filters.kota}
              </span>
            )}
            {filters.gaji && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                Gaji: Rp {parseInt(filters.gaji).toLocaleString()}+
              </span>
            )}
            {filters.sort && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                Urutkan: {filters.sort === "terbaru" ? "Terbaru" : 
                         filters.sort === "terlama" ? "Terlama" :
                         filters.sort === "gaji_tertinggi" ? "Gaji Tertinggi" : "Gaji Terendah"}
              </span>
            )}
          </div>
        )}
      </div>

      {/* 🧾 Daftar job */}
      <div className="flex flex-col gap-6 w-full">
        {currentJobs.length > 0 ? (
          currentJobs.map((job) => {
            const company = companyMap[job.employer_id] || {};
            
            // ✅ Tambah badge status aktif
            const jobStatus = job.status?.toLowerCase();
            const isActive = isJobActive(job.status);
            
            return (
              <div
                key={job.job_id}
                className="bg-white border border-blue-900 rounded-3xl p-5 flex flex-col justify-between gap-4 shadow-sm transform transition-transform duration-200 hover:-translate-y-1 relative"
              >
                {/* Badge status */}
                {isActive && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></span>
                    Dibuka
                  </div>
                )}
                
                <Link
                  to={`/pekerjaan/${job.job_id}`}
                  className="block no-underline text-inherit" 
                >
                  <div className="flex items-center gap-4 mb-4 job-header">
                    <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center job-logo">
                      <img
                        src={getImageUrl(job.company_profile_image)}
                        alt={job.company_name || "Perusahaan"}
                        className="w-20 h-20 rounded-lg object-cover bg-gray-100"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/80?text=No+Image";
                          e.target.onerror = null;
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-blue-900 font-semibold text-lg mb-1">
                        {job.title}
                      </h3>
                      <p className="text-gray-900 text-sm flex items-center gap-1">
                        {job.company_name || "Perusahaan"}{" "}
                        {job.employer_status === "active" && (
                          <CheckBadgeIcon className="w-4 h-4 text-blue-500" />
                        )}
                      </p>
                    </div>
                  </div>
                </Link>

                <div className="flex flex-wrap gap-2 text-sm job-info">
                  {job.employment_type && (
                    <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-xl text-blue-900 font-medium">
                      <BriefcaseIcon className="w-4 h-4 text-gray-600" />{" "}
                      {job.employment_type}
                    </span>
                  )}
                  {job.location && (
                    <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-xl text-blue-900 font-medium">
                      <MapPinIcon className="w-4 h-4 text-gray-600" /> {job.location}
                    </span>
                  )}
                  {(job.salary_min || job.salary_max) && (
                    <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-xl text-blue-900 font-medium">
                      <CurrencyDollarIcon className="w-4 h-4 text-gray-600" />
                      {job.salary_min
                        ? `Rp ${parseInt(job.salary_min).toLocaleString()}`
                        : "-"}{" "}
                      {job.salary_max
                        ? `- Rp ${parseInt(job.salary_max).toLocaleString()}`
                        : ""}
                    </span>
                  )}
                  {job.category_name && (
                    <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-xl text-blue-900 font-medium">
                      <BuildingOfficeIcon className="w-4 h-4 text-gray-600" />{" "}
                      {job.category_name}
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center text-base font-medium text-black-600 mt-4 job-footer">
                  <div className="flex flex-col gap-1 job-footer-left">
                    <small>
                      Diposting{" "}
                      {job.posted_at
                        ? new Date(job.posted_at).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "-"}
                    </small>
                    <strong className="text-gray-500 text-xs font-medium">
                      Lamar Sebelum{" "}
                      {job.deadline
                        ? new Date(job.deadline).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "Belum ditentukan"}
                    </strong>
                  </div>
                  
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center col-span-full py-10">
            <div className="bg-white border border-gray-200 rounded-3xl p-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BriefcaseIcon className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg mb-2 font-medium">Tidak ada lowongan aktif yang cocok.</p>
              <p className="text-gray-400 text-sm mb-4">
                {searchTerm ? `Tidak ditemukan lowongan dengan kata kunci "${searchTerm}"` : 
                 filters ? "Tidak ada lowongan aktif sesuai filter yang dipilih" : 
                 "Tidak ada lowongan aktif tersedia saat ini"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 text-sm"
          >
            Sebelumnya
          </button>
          <span className="text-sm text-gray-600">
            Halaman {currentPage} dari {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 text-sm"
          >
            Selanjutnya
          </button>
        </div>
      )}
    </div>
  );
}