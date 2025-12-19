import React, { useState, useEffect, useMemo } from "react";
import { Eye, Trash2, Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function PekerjaanDisimpan() {
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const userId = 27;

    const API_SAVED = `http://localhost:3000/talenthub/api/v1/saved_jobs/user/${userId}`;
    const API_JOBS = "http://localhost:3000/talenthub/api/v1/job_posts";

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const savedRes = await fetch(API_SAVED);
                const savedJson = await savedRes.json();
                const savedJobs = savedJson?.payload?.data || [];

                const jobsRes = await fetch(API_JOBS);
                const jobsJson = await jobsRes.json();
                const allJobs = jobsJson?.payload?.data || [];

                const merged = savedJobs.map((saved) => {
                    const jobDetail = allJobs.find((job) => job.job_id === saved.job_id);
                    return {
                        ...saved,
                        ...jobDetail
                    };
                });

                setJobs(merged);
            } catch (err) {
                setError("Gagal memuat data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return jobs;
        return jobs.filter(
            (job) =>
                job.title?.toLowerCase().includes(q) ||
                job.location?.toLowerCase().includes(q) ||
                job.company_name?.toLowerCase().includes(q)
        );
    }, [search, jobs]);

    const handleDelete = async (savedId, savedData) => {
        if (!window.confirm("Yakin ingin menghapus pekerjaan ini dari daftar simpan?")) return;

        try {
            const res = await fetch(`http://localhost:3000/talenthub/api/v1/saved_jobs/${savedId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: savedData.user_id,
                    job_id: savedData.job_id,
                    saved_at: savedData.saved_at,
                }),
            });

            const result = await res.json();
            if (result?.payload?.status_code === 200) {
                setJobs((prev) => prev.filter((j) => j.id !== savedId));
                toast.success("Data berhasil dihapus");
            } else {
                toast.error("Gagal menghapus data");
            }
        } catch (err) {
            console.error("Delete error:", err);
            toast.error("Terjadi kesalahan saat menghapus");
        }
    };

    const getImageUrl = (filename) => {
        if (!filename) {
            return "https://via.placeholder.com/80?text=No+Image";
        }
        return `http://localhost:3000/uploads/profile-images/${filename}`;
    };

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const current = Math.min(currentPage, totalPages);
    const startIndex = (current - 1) * perPage;
    const jobsToShow = filtered.slice(startIndex, startIndex + perPage);

    const goToPage = (p) => {
        if (p < 1 || p > totalPages) return;
        setCurrentPage(p);
    };

    // Generate pagination numbers
    const getPaginationNumbers = () => {
        const numbers = [];
        const maxVisible = 5;
        let start = Math.max(1, current - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            numbers.push(i);
        }
        return numbers;
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900">Pekerjaan Disimpan</h2>
                    <p className="text-gray-500 text-sm mt-1">Kelola pekerjaan yang telah Anda simpan</p>
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 w-64 transition-all"
                                placeholder="Cari judul, perusahaan, lokasi..."
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600 text-sm">Tampilkan</span>
                            <select
                                value={perPage}
                                onChange={(e) => {
                                    setPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                            </select>
                            <span className="text-gray-600 text-sm">per halaman</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
                            <p className="text-red-600 font-medium">{error}</p>
                        </div>
                    </div>
                ) : jobsToShow.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="max-w-md mx-auto">
                            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Calendar className="text-gray-400" size={32} />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada pekerjaan disimpan</h3>
                            <p className="text-gray-500">
                                {search ? "Tidak ditemukan pekerjaan yang sesuai dengan pencarian" : "Mulai simpan pekerjaan yang menarik untuk Anda"}
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Job Cards */}
                        <div className="grid gap-4 mb-8">
                            {jobsToShow.map((job) => (
                                <div
                                    key={job.id}
                                    className="border border-gray-200 rounded-xl p-5 hover:border-green-500 hover:shadow-md transition-all duration-300 bg-white group"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        {/* Left Section */}
                                        <div className="flex items-start gap-4 flex-1">
                                            <div className="flex-shrink-0">
                                                <div className="w-16 h-16 rounded-lg border border-gray-200 overflow-hidden bg-white p-1.5">
                                                    <img
                                                        src={getImageUrl(job.company_profile_image)}
                                                        alt={job.company_name}
                                                        className="w-full h-full object-contain"
                                                        onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/80?text=Logo")}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                                                    {job.title}
                                                </h3>
                                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                                    <span className="text-gray-700 font-medium text-sm">
                                                        {job.company_name}
                                                    </span>
                                                    <span className="text-gray-500 text-sm">•</span>
                                                    <span className="flex items-center gap-1 text-gray-600 text-sm">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        {job.location}
                                                    </span>
                                                </div>

                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${job.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                        {job.status}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-gray-500 text-xs px-3 py-1 bg-gray-50 rounded-full">
                                                        <Calendar size={12} />
                                                        Disimpan: {job.saved_at?.slice(0, 10)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <Link
                                                to={`/pekerjaan/${job.job_id}`}
                                                className="inline-flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 px-4 py-2.5 rounded-lg font-medium transition-colors border border-green-200 group-hover:border-green-300"
                                            >
                                                <Eye size={16} />
                                                Detail
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(job.id, job)}
                                                className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 px-4 py-2.5 rounded-lg font-medium transition-colors border border-red-200 hover:border-red-300"
                                            >
                                                <Trash2 size={16} />
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-200">
                            <div className="text-sm text-gray-600">
                                Menampilkan <span className="font-semibold">{startIndex + 1}</span> - <span className="font-semibold">{Math.min(startIndex + jobsToShow.length, total)}</span> dari <span className="font-semibold">{total}</span> entri
                            </div>

                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => goToPage(1)}
                                    disabled={current === 1}
                                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronsLeft size={16} />
                                </button>
                                <button
                                    onClick={() => goToPage(current - 1)}
                                    disabled={current === 1}
                                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeft size={16} />
                                </button>

                                {getPaginationNumbers().map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => goToPage(p)}
                                        className={`min-w-[40px] px-3 py-2 rounded-lg border transition-colors ${p === current
                                                ? 'bg-green-600 text-white border-green-600'
                                                : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}

                                <button
                                    onClick={() => goToPage(current + 1)}
                                    disabled={current === totalPages}
                                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronRight size={16} />
                                </button>
                                <button
                                    onClick={() => goToPage(totalPages)}
                                    disabled={current === totalPages}
                                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronsRight size={16} />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}