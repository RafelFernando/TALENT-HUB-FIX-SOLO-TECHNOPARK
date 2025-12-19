import React, { useState, useEffect, useMemo } from "react";
import { Eye, Calendar, Briefcase, ChevronRight, CheckCircle, Clock, XCircle, AlertCircle, Search, Filter } from "lucide-react";

export default function LamaranSaya() {
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [sortBy, setSortBy] = useState("latest");

    const API_BASE = "http://localhost:3000/talenthub/api/v1";
    const API_JOBS = `${API_BASE}/job_posts`;

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setLoading(true);
                const user = JSON.parse(localStorage.getItem("user"));
                if (!user?.user_id) {
                    throw new Error("User belum login");
                }
                const response = await fetch(
                    `${API_BASE}/job_applications/candidate/${user.user_id}`
                );
                if (!response.ok) {
                    throw new Error("Gagal memuat data lamaran");
                }
                const result = await response.json();
                const applications = result.payload?.data || [];
                setJobs(applications);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, []);

    const getStatusIcon = (status) => {
        switch (status) {
            case "Submitted":
                return <Clock className="w-4 h-4" />;
            case "Reviewed":
                return <Eye className="w-4 h-4" />;
            case "Accepted":
                return <CheckCircle className="w-4 h-4" />;
            case "Rejected":
                return <XCircle className="w-4 h-4" />;
            default:
                return <AlertCircle className="w-4 h-4" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Submitted":
                return "text-blue-600 bg-blue-50 border-blue-200";
            case "Reviewed":
                return "text-purple-600 bg-purple-50 border-purple-200";
            case "Accepted":
                return "text-emerald-600 bg-emerald-50 border-emerald-200";
            case "Rejected":
                return "text-rose-600 bg-rose-50 border-rose-200";
            default:
                return "text-gray-600 bg-gray-50 border-gray-200";
        }
    };

    const filtered = useMemo(() => {
        let filteredJobs = [...jobs];
        
        // Search filter
        const q = search.trim().toLowerCase();
        if (q) {
            filteredJobs = filteredJobs.filter(
                (item) =>
                    item.job_title?.toLowerCase().includes(q) ||
                    item.status?.toLowerCase().includes(q)
            );
        }

        // Sort filter
        switch (sortBy) {
            case "latest":
                filteredJobs.sort((a, b) => new Date(b.applied_at) - new Date(a.applied_at));
                break;
            case "oldest":
                filteredJobs.sort((a, b) => new Date(a.applied_at) - new Date(b.applied_at));
                break;
            case "jobTitle":
                filteredJobs.sort((a, b) => a.job_title?.localeCompare(b.job_title));
                break;
        }

        return filteredJobs;
    }, [search, jobs, sortBy]);

    // Pagination
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const current = Math.min(currentPage, totalPages);
    const startIndex = (current - 1) * perPage;
    const jobsToShow = filtered.slice(startIndex, startIndex + perPage);

    const goToPage = (p) => {
        if (p < 1 || p > totalPages) return;
        setCurrentPage(p);
    };

    const handlePerPageChange = (e) => {
        setPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Lamaran Saya
                        </h2>
                        <p className="text-gray-600 mt-1">
                            Lacak status lamaran pekerjaan Anda
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center gap-3">
                        <span className="text-sm text-gray-600">{total} lamaran</span>
                    </div>
                </div>

                {/* Filter dan Search Bar */}
                <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="Cari berdasarkan posisi atau status..."
                            />
                        </div>
                        
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                            >
                                <option value="latest">Terbaru</option>
                                <option value="oldest">Terlama</option>
                                <option value="jobTitle">A-Z Posisi</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-600">Tampilkan</span>
                        <select
                            value={perPage}
                            onChange={handlePerPageChange}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                        </select>
                        <span className="text-gray-600">entri</span>
                    </div>
                </div>

                {/* Konten */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-3"></div>
                        <p className="text-gray-500">Memuat data lamaran...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-8 bg-rose-50 rounded-lg border border-rose-200">
                        <AlertCircle className="w-12 h-12 text-rose-400 mx-auto mb-3" />
                        <p className="text-rose-600 font-medium">{error}</p>
                    </div>
                ) : jobsToShow.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 text-lg">Belum ada lamaran</p>
                        <p className="text-gray-400 mt-1">Lamaran yang Anda kirim akan muncul di sini</p>
                    </div>
                ) : (
                    <>
                        {/* List Lamaran */}
                        <div className="space-y-4">
                            {jobsToShow.map((item) => (
                                <div
                                    key={item.application_id}
                                    className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                        {/* Info Utama */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                                        {item.job_title}
                                                    </h3>
                                                    <div className="flex flex-wrap items-center gap-4 mt-2">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="w-4 h-4 text-gray-400" />
                                                            <span className="text-sm text-gray-600">
                                                                {new Date(item.applied_at).toLocaleDateString("id-ID", {
                                                                    day: "numeric",
                                                                    month: "long",
                                                                    year: "numeric"
                                                                })}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(item.status)}`}>
                                                                {getStatusIcon(item.status)}
                                                                {item.status}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-gray-200 gap-4">
                                <p className="text-sm text-gray-600">
                                    Menampilkan <span className="font-semibold">{startIndex + 1}</span> -{" "}
                                    <span className="font-semibold">{Math.min(startIndex + jobsToShow.length, total)}</span> dari{" "}
                                    <span className="font-semibold">{total}</span> lamaran
                                </p>

                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => goToPage(1)}
                                        disabled={current === 1}
                                        className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        &lt;&lt;
                                    </button>
                                    <button
                                        onClick={() => goToPage(current - 1)}
                                        disabled={current === 1}
                                        className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        &lt;
                                    </button>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                                        .filter(p => p >= Math.max(1, current - 2) && p <= Math.min(totalPages, current + 2))
                                        .map((p) => (
                                            <button
                                                key={p}
                                                onClick={() => goToPage(p)}
                                                className={`px-3 py-2 min-w-[40px] border rounded-lg transition ${p === current
                                                    ? "bg-blue-600 text-white border-blue-600"
                                                    : "border-gray-300 hover:bg-gray-50"
                                                    }`}
                                            >
                                                {p}
                                            </button>
                                        ))}

                                    <button
                                        onClick={() => goToPage(current + 1)}
                                        disabled={current === totalPages}
                                        className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        &gt;
                                    </button>
                                    <button
                                        onClick={() => goToPage(totalPages)}
                                        disabled={current === totalPages}
                                        className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        &gt;&gt;
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}