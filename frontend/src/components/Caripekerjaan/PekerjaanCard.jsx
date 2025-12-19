import React, { useState, useEffect } from "react";
import {
  BriefcaseIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function PekerjaanCard({ filters = {} }) {
  const [jobs, setJobs] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Cek status aktif
  const isJobActive = (status) => {
    if (!status) return false;
    const normalized = status.toLowerCase().trim();
    return normalized === "active" || normalized === "open";
  };

  // Ambil Jobs + Company Profile
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const jobRes = await fetch("http://localhost:3000/talenthub/api/v1/job_posts");
        const jobJson = await jobRes.json();
        const jobsData = jobJson?.payload?.data || [];

        const profileRes = await fetch("http://localhost:3000/talenthub/api/v1/company_profiles");
        const profileJson = await profileRes.json();
        const profileData = profileJson?.payload?.data || [];

        // Filter hanya job aktif
        const activeJobs = jobsData.filter((job) => isJobActive(job.status));

        setJobs(activeJobs);
        setProfiles(profileData);
      } catch (error) {
        console.error("❌ Error:", error);
        setJobs([]);
        setProfiles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCompanyImage = (filename) => {
    if (!filename) {
      return "https://via.placeholder.com/80?text=No+Image";
    }

    return `http://localhost:3000/uploads/profile-images/${filename}`;
  };




  // Filter pencarian
  let filteredJobs = jobs.filter((job) => {
    const title = job.title?.toLowerCase() || "";
    const company = job.company_name?.toLowerCase() || "";
    const employerName = job.employer_name?.toLowerCase() || "";
    const location = job.location?.toLowerCase() || "";
    const category = job.category_name?.toLowerCase() || "";

    return (
      title.includes(searchTerm.toLowerCase()) ||
      company.includes(searchTerm.toLowerCase()) ||
      employerName.includes(searchTerm.toLowerCase()) ||
      location.includes(searchTerm.toLowerCase()) ||
      category.includes(searchTerm.toLowerCase())
    );
  });

  // Filter tambahan
  if (filters) {
    const { kategori, provinsi, kota, gaji, sort } = filters;

    if (kategori)
      filteredJobs = filteredJobs.filter(
        (job) => job.category_name?.toLowerCase() === kategori.toLowerCase()
      );

    if (provinsi)
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.company_province?.toLowerCase().includes(provinsi.toLowerCase()) ||
          job.location?.toLowerCase().includes(provinsi.toLowerCase())
      );

    if (kota)
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.company_city?.toLowerCase().includes(kota.toLowerCase()) ||
          job.location?.toLowerCase().includes(kota.toLowerCase())
      );

    if (gaji)
      filteredJobs = filteredJobs.filter(
        (job) => parseFloat(job.salary_min || 0) >= parseInt(gaji)
      );

    if (sort === "terbaru")
      filteredJobs.sort((a, b) => new Date(b.posted_at) - new Date(a.posted_at));
    else if (sort === "terlama")
      filteredJobs.sort((a, b) => new Date(a.posted_at) - new Date(b.posted_at));
  }

  // Filter deadline
  const now = new Date();
  filteredJobs = filteredJobs.filter((job) => {
    if (!job.deadline) return true;
    try {
      const deadlineDate = new Date(job.deadline);
      return deadlineDate > now;
    } catch {
      return true;
    }
  });

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="w-full bg-gray-50 py-10 px-4 flex justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat lowongan pekerjaan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 py-10 px-4 flex flex-col">
      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Cari lowongan pekerjaan..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded-xl px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
        />
      </div>

      {/* Job Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {currentJobs.map((job) => {
          const isExpired = job.deadline ? new Date(job.deadline) < new Date() : false;

          return (
            <div
              key={job.job_id}
              className={`bg-white border rounded-3xl p-5 flex flex-col shadow-sm hover:-translate-y-1 transition max-w-md w-full ${
                isExpired ? "border-red-300 opacity-80" : "border-blue-900"
              }`}
            >
              <Link to={`/pekerjaan/${job.job_id}`} className="no-underline">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200">
                    <img
                      src={getCompanyImage(job.company_profile_image)}
                      alt="Company Logo"
                      className="w-12 h-12 object-cover"
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
                      {job.company_name}
                      {job.employer_status === "verified" && (
                        <CheckBadgeIcon className="w-4 h-4 text-blue-500" />
                      )}
                    </p>
                  </div>
                </div>
              </Link>

              {/* Job badges */}
              <div className="flex flex-wrap gap-2 text-sm">
                {job.employment_type && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-xl text-blue-900 font-medium">
                    <BriefcaseIcon className="w-4 h-4 text-gray-600" /> {job.employment_type}
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
                      ? `Rp ${parseFloat(job.salary_min).toLocaleString("id-ID")}`
                      : "-"}{" "}
                    {job.salary_max
                      ? `- Rp ${parseFloat(job.salary_max).toLocaleString("id-ID")}`
                      : ""}
                  </span>
                )}
                {job.category_name && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-xl text-blue-900 font-medium">
                    <BuildingOfficeIcon className="w-4 h-4 text-gray-600" /> {job.category_name}
                  </span>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center text-base font-medium text-black-600 mt-4">
                <div>
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
                  <strong
                    className={`block text-xs ${
                      isExpired ? "text-red-600" : "text-gray-500"
                    }`}
                  >
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

                <Link to={`/pekerjaan/${job.job_id}`}>
                  <button
                    className={`px-4 py-2 rounded-2xl font-semibold transition-all duration-300 ${
                      isExpired
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-blue-900 text-white hover:bg-yellow-600"
                    }`}
                    disabled={isExpired}
                  >
                    {isExpired ? "Ditutup" : "Lamar Cepat"}
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-900 text-white rounded-lg disabled:bg-gray-300"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-700">
            Halaman {currentPage} dari {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-900 text-white rounded-lg disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
