import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  BriefcaseIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  BookmarkIcon,
  ShareIcon,
  CheckCircleIcon,
  UserIcon } from "@heroicons/react/24/outline";

export default function PekerjaanDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarkActive, setBookmarkActive] = useState(false);
  const [isShareActive, setShareActive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/api/talenthub/jobs/${id}`);
        const data = await res.json();
        setJob(data.job || data); // tergantung struktur response API
      } catch (err) {
        console.error("Gagal mengambil detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Memuat detail...</p>;
  if (!job) return <p className="text-center mt-10 text-gray-500">Lowongan tidak ditemukan.</p>;

  return (
    <div className="max-w-[65%] flex flex-col gap-5 mt-12">
      <div className="mt-0 bg-white rounded-2xl flex-1 border border-gray-300 flex flex-col">
        
        {/* Header */}
        <div className="flex flex-col gap-8 px-5 py-7">
          
          {/* Bagian Atas */}
          <div className="flex justify-between gap-8">
            {/* Kiri */}
            <div className="flex gap-5 items-start">
              {job.logoUrl ? (
                <img
                  src={job.logoUrl}
                  alt={job.perusahaan}
                  className="w-16 h-16 object-contain rounded-lg"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-200 text-gray-700 flex items-center justify-center rounded-lg font-semibold text-xl">
                  {job.perusahaan?.[0] ?? "?"}
                </div>
              )}

              <div className="flex flex-col">
                <h2 className="text-2xl font-semibold m-0">{job.title}</h2>
                <p className="text-gray-800 font-semibold mt-1 flex items-center gap-1">
                  {job.perusahaan}
                  {job.companyVerified && (
                    <span className="text-blue-500">
                      <CheckCircleIcon className="w-5 h-5 inline-block" />
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Kanan */}
            <div className="flex gap-3">
              {/* Bookmark */}
              <div
                className={`w-12 h-12 border-2 rounded-full flex justify-center items-center cursor-pointer transition-all duration-300 ${
                  isBookmarkActive
                    ? "border-orange-500 text-orange-500"
                    : "border-gray-400 text-gray-800"
                }`}
                onClick={() => setBookmarkActive(!isBookmarkActive)}
              >
                <BookmarkIcon className="w-6 h-6" />
              </div>

              {/* Share */}
              <div
                className={`w-12 h-12 border-2 rounded-full flex justify-center items-center cursor-pointer transition-all duration-300 ${
                  isShareActive
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "border-gray-400 text-gray-800"
                }`}
                onClick={() => setShareActive(!isShareActive)}
              >
                <ShareIcon className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Info Header */}
          <div className="w-4/5 mx-auto">
            <ul className="list-none flex flex-wrap gap-3">
              {job.employment_type && (
                <li className="bg-blue-100 px-3 py-1 rounded-md text-sm text-black flex items-center gap-2 w-32">
                  <UserIcon className="w-4 h-4" /> {job.employment_type}
                </li>
              )}
              {job.location && (
                <li className="bg-blue-100 px-3 py-1 rounded-md text-sm text-black flex items-center gap-2 w-32">
                  <MapPinIcon className="w-4 h-4" /> {job.location}
                </li>
              )}
              {job.experience && (
                <li className="bg-blue-100 px-3 py-1 rounded-md text-sm text-black flex items-center gap-2 w-32">
                  <BriefcaseIcon className="w-4 h-4" /> {job.experience}
                </li>
              )}
              {job.salary_min && (
                <li className="bg-blue-100 px-3 py-1 rounded-md text-sm text-black flex items-center gap-2 w-32">
                  <CurrencyDollarIcon className="w-4 h-4" /> {job.salary_min}
                </li>
              )}
            </ul>

            <button
              className="bg-blue-600 text-white px-5 py-2 rounded-md mt-5 hover:bg-blue-700 transition-all duration-200"
              onClick={() => setModalOpen(true)}
            >
              Lamar Cepat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
