import { useState, useEffect } from "react";
import {
  UserIcon,
  MapPinIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  BookmarkIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

export default function JobDetailHeader({
  job,
  isShareActive,
  setShareActive,
  onLamar,
  company,
}) {
  const [isBookmarkActive, setIsBookmarkActive] = useState(false);
  const [savedJobId, setSavedJobId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [isApplyLoading, setIsApplyLoading] = useState(false);


  const companyData = company || {};

  // 🔥 Ambil user dari localStorage
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData?.user_id;

  // 🔥 Ambil jobId aman
  const jobId = Number(job.job_id || job.id);

  // ========== CEK STATUS BOOKMARK SAAT PAGE DIBUKA ==========
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (!userId || !jobId) return;

      try {
        const response = await fetch(
          "http://localhost:3000/talenthub/api/v1/saved_jobs"
        );
        const data = await response.json();

        const savedJobs = data.payload?.data || [];

        const found = savedJobs.find(
          (item) =>
            Number(item.user_id) === Number(userId) &&
            Number(item.job_id) === Number(jobId)
        );

        if (found) {
          setIsBookmarkActive(true);
          setSavedJobId(found.id);
        } else {
          setIsBookmarkActive(false);
          setSavedJobId(null);
        }
      } catch (err) {
        console.error("Gagal mengecek saved job:", err);
      }
    };

    checkBookmarkStatus();
  }, [jobId, userId]);

  // ========== Helper Gambar Perusahaan ==========
  const getImageUrl = (filename) => {
    if (!filename) {
      return "https://via.placeholder.com/80?text=No+Image";
    }

    return `http://localhost:3000/uploads/profile-images/${filename}`;
  };


  // ========== TOGGLE BOOKMARK ==========
  const handleBookmarkToggle = async () => {
    if (!userId) {
      alert("Anda harus login untuk menyimpan lowongan.");
      return;
    }

    setIsLoading(true);

    try {
      // ================== DELETE MODE ==================
      if (isBookmarkActive) {
        if (!savedJobId) {
          alert("Gagal menghapus, ID saved job tidak ditemukan.");
          return;
        }

        const response = await fetch(
          `http://localhost:3000/talenthub/api/v1/saved_jobs/${savedJobId}`,
          {
            method: "DELETE",
          }
        );

        const data = await response.json();
        console.log("DELETE response:", data);

        if (response.ok) {
          setIsBookmarkActive(false);
          setSavedJobId(null);
          alert("Lowongan berhasil dihapus dari simpanan");
        }

        return;
      }

      // ================== POST MODE ==================
      const response = await fetch(
        "http://localhost:3000/talenthub/api/v1/saved_jobs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            job_id: jobId,
          }),
        }
      );

      const data = await response.json();
      console.log("POST response:", data);

      if (response.ok || response.status === 201) {
        setIsBookmarkActive(true);

        // 🔥 Simpan ID dari backend untuk DELETE selanjutnya
        if (data.payload?.data?.id) {
          setSavedJobId(data.payload.data.id);
        }

        alert("Lowongan berhasil disimpan");
      }
    } catch (err) {
      console.error("Error toggle bookmark:", err);
      alert("Terjadi kesalahan saat menyimpan lowongan.");
    } finally {
      setIsLoading(false);
    }
  };

  // ========== CEK STATUS SUDAH MELAMAR ==========
  useEffect(() => {
    const checkApplyStatus = async () => {
      if (!userId || !jobId) return;

      try {
        const response = await fetch(
          `http://localhost:3000/talenthub/api/v1/job_applications/candidate/${userId}`
        );

        const data = await response.json();
        const applications = data.payload?.data || [];

        const alreadyApplied = applications.some(
          (item) => Number(item.job_id) === Number(jobId)
        );

        if (alreadyApplied) {
          setIsApplied(true);
        }
      } catch (err) {
        console.error("Gagal cek status lamaran:", err);
      }
    };

    checkApplyStatus();
  }, [userId, jobId]);

  const handleApplyJob = async () => {
    if (isApplied) {
      alert("Anda sudah melamar pekerjaan ini.");
      return;
    }

    if (!jobId) {
      alert("Job tidak valid.");
      return;
    }

    setIsApplyLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/talenthub/api/v1/job_applications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            job_id: jobId,
            candidate_id: userId,
            status: "Submitted",
          }),
        }
      );

      const data = await response.json();
      console.log("Apply response:", data);

      if (response.ok || response.status === 201) {
        setIsApplied(true);
        alert("Lamaran berhasil dikirim");
      } else {
        alert(data.message || "Gagal mengirim lamaran");
      }
    } catch (err) {
      console.error("Error apply job:", err);
      alert("Terjadi kesalahan saat melamar");
    } finally {
      setIsApplyLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 border rounded-2xl bg-white shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <img
            src={getImageUrl(companyData.profileImage)}
            alt={companyData.companyName || job.perusahaan || "Perusahaan"}
            className="w-16 h-16 rounded-lg object-cover bg-gray-100"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/80?text=No+Logo";
              e.target.onerror = null;
            }}
          />

          <div>
            <h2 className="text-xl font-semibold">{job.title}</h2>

            <p className="text-gray-700 font-medium flex items-center gap-1">
              {companyData.companyName ||
                job.perusahaan ||
                "Perusahaan Tidak Ditemukan"}
              {job.companyVerified && (
                <CheckCircleIcon className="w-5 h-5 text-blue-500" />
              )}
            </p>

            <div className="flex flex-wrap gap-2 text-sm text-gray-600 mt-1">
              {companyData.city && companyData.province && (
                <span className="flex items-center gap-1">
                  <MapPinIcon className="w-4 h-4" /> {companyData.city},{" "}
                  {companyData.province}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleBookmarkToggle}
            disabled={isLoading}
            className={`p-3 rounded-full border transition ${isBookmarkActive
              ? "border-orange-500 bg-orange-50 text-orange-500"
              : "border-gray-400 text-gray-600 hover:border-orange-500 hover:text-orange-500"
              }`}
            title={
              isBookmarkActive ? "Hapus dari simpanan" : "Simpan lowongan"
            }
          >
            <BookmarkIcon
              className={`w-5 h-5 ${isBookmarkActive ? "fill-current" : ""
                }`}
            />
          </button>

          <button
            onClick={() => setShareActive(!isShareActive)}
            className={`p-3 rounded-full border transition ${isShareActive
              ? "bg-blue-600 text-white border-blue-600"
              : "border-gray-400 text-gray-600 hover:border-blue-500 hover:text-blue-500"
              }`}
            title="Bagikan lowongan"
          >
            <ShareIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        {job.employment_type && (
          <span className="bg-blue-100 px-3 py-1 rounded-lg flex items-center gap-1">
            <UserIcon className="w-4 h-4" /> {job.employment_type}
          </span>
        )}

        {job.location && (
          <span className="bg-blue-100 px-3 py-1 rounded-lg flex items-center gap-1">
            <MapPinIcon className="w-4 h-4" /> {job.location}
          </span>
        )}

        {job.experience && (
          <span className="bg-blue-100 px-3 py-1 rounded-lg flex items-center gap-1">
            <BriefcaseIcon className="w-4 h-4" /> {job.experience}
          </span>
        )}

        {job.salary_min && (
          <span className="bg-blue-100 px-3 py-1 rounded-lg flex items-center gap-1">
            <CurrencyDollarIcon className="w-4 h-4" /> {job.salary_min}
          </span>
        )}

        <button
          onClick={handleApplyJob}
          disabled={isApplied || isApplyLoading}
          className={`ml-auto px-4 py-2 rounded-lg transition ${isApplied
            ? "bg-green-600 text-white cursor-not-allowed"
            : "bg-[#193F7A] text-white hover:bg-[#162f5c]"
            }`}
        >
          {isApplied ? "Sudah Dilamar" : isApplyLoading ? "Mengirim..." : "Lamar Sekarang"}
        </button>

      </div>
    </div>
  );
}
