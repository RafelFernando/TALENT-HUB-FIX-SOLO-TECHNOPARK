import { useState, useEffect } from "react";
import {
  BookmarkIcon,
  MapPinIcon,
  BriefcaseIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export default function RelatedJobCard({ related, navigate }) {
  const [isBookmarkActive, setIsBookmarkActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [savedJobId, setSavedJobId] = useState(null); // 🔥 Simpan ID saved_jobs

  // 🔥 Ambil user dari localStorage
  const userData = JSON.parse(localStorage.getItem("user") || "null");
  const userId = userData?.user_id;

  // ========== VALIDASI: Return early jika data tidak lengkap ==========
  if (!related || !related.job_id) {
    return null; // Jangan render apapun jika data tidak valid
  }

  // ========== CEK STATUS SAVED JOB ==========
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (!userId || !related?.job_id) return;

      try {
        const response = await fetch(
          "http://localhost:3000/talenthub/api/v1/saved_jobs"
        );
        const data = await response.json();

        const savedJobs = data.payload?.data || [];

        // Cek apakah job ini sudah disimpan oleh user
        const savedItem = savedJobs.find(
          (item) =>
            Number(item.user_id) === Number(userId) &&
            Number(item.job_id) === Number(related.job_id)
        );

        if (savedItem) {
          setIsBookmarkActive(true);
          setSavedJobId(savedItem.id); // 🔥 Simpan ID saved_jobs
        } else {
          setIsBookmarkActive(false);
          setSavedJobId(null);
        }
      } catch (err) {
        console.error("Gagal mengecek saved job:", err);
      }
    };

    checkBookmarkStatus();
  }, [related?.job_id, userId]);

  // ========== Helper untuk gambar perusahaan ==========
  const getImageUrl = (filename) => {
    if (!filename) {
      return "https://via.placeholder.com/80?text=No+Image";
    }

    return `http://localhost:3000/uploads/profile-images/${filename}`;
  };

  // ========== TOGGLE BOOKMARK ==========
  const handleBookmarkToggle = async (e) => {
    // Prevent navigation when clicking bookmark
    e.stopPropagation();

    if (!userId) {
      alert("Anda harus login untuk menyimpan lowongan.");
      return;
    }

    setIsLoading(true);

    try {
      const jobId = Number(related.job_id);

      if (isBookmarkActive && savedJobId) {
        // DELETE saved job menggunakan ID saved_jobs
        const response = await fetch(
          `http://localhost:3000/talenthub/api/v1/saved_jobs/${savedJobId}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setIsBookmarkActive(false);
          setSavedJobId(null);
          alert("Lowongan berhasil dihapus dari simpanan");
        } else {
          throw new Error(data.payload?.message || "Gagal menghapus simpanan");
        }
      } else {
        // POST saved job
        const now = new Date();
        const saved_at = now.toISOString().slice(0, 19).replace("T", " ");

        const payload = {
          user_id: userId,
          job_id: jobId,
          saved_at,
        };

        const response = await fetch(
          "http://localhost:3000/talenthub/api/v1/saved_jobs",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        const data = await response.json();

        if (response.ok || response.status === 201) {
          setIsBookmarkActive(true);

          // 🔥 Simpan ID saved_jobs yang baru dibuat
          if (data.payload?.data?.id) {
            setSavedJobId(data.payload.data.id);
          }

          alert("Lowongan berhasil disimpan");
        } else {
          throw new Error(data.payload?.message || "Gagal menyimpan lowongan");
        }
      }
    } catch (err) {
      console.error("Error toggle bookmark:", err);
      alert(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={() => navigate(`/pekerjaan/${related.job_id}`)}
      className="border p-4 rounded-xl mb-3 cursor-pointer hover:shadow-md transition"
    >
      <div className="flex justify-between items-center gap-3">
        {/* Logo Perusahaan */}
        <img
          src={getImageUrl(related?.company_profile_image)}
          alt={related?.company_name || related.employer_name || "Perusahaan"}
          className="w-12 h-12 rounded-lg object-cover bg-gray-100"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/80?text=No+Image";
            e.target.onerror = null;
          }}
        />


        {/* Info Job */}
        <div className="flex-1">
          <p className="font-semibold text-sm">{related?.title || "Judul Pekerjaan"}</p>
          <p className="text-gray-600 text-xs">
            {related?.company_name || related?.employer_name || "Perusahaan"}
          </p>
        </div>

        {/* Tombol Bookmark */}
        <button
          onClick={handleBookmarkToggle}
          disabled={isLoading}
          className={`p-2 rounded-full transition ${isBookmarkActive
              ? "text-orange-500 hover:text-orange-600"
              : "text-gray-400 hover:text-orange-500"
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          title={isBookmarkActive ? "Hapus dari simpanan" : "Simpan lowongan"}
        >
          <BookmarkIcon
            className={`w-5 h-5 ${isBookmarkActive ? "fill-current" : ""}`}
          />
        </button>
      </div>

      {/* Detail Job */}
      <div className="text-xs text-gray-600 mt-2 space-y-1">
        <p>
          <MapPinIcon className="inline w-4 h-4 mr-1" />
          {related?.employment_type || "Penuh Waktu"} •{" "}
          {related?.location || "Tidak diketahui"}
        </p>
        <p>
          <BriefcaseIcon className="inline w-4 h-4 mr-1" />
          {related?.experience || "Semua level"}
        </p>
        <p>
          <UserIcon className="inline w-4 h-4 mr-1" />
          {related?.employment_type || "Kontrak"}
        </p>
      </div>

      {/* Deadline */}
      <p className="text-xs text-gray-500 mt-2">
        Lamar sebelum{" "}
        {related?.deadline
          ? new Date(related.deadline).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
          : "Belum ditentukan"}
      </p>
    </div>
  );
}