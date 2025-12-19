import { useState, useMemo, useEffect } from 'react';
import {
    MapPin,
    Download,
    MessageCircle,
    Eye,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Mail,
    Phone,
    Calendar,
    Briefcase,
    Users,
    Filter,
    Search,
    XCircle,
    CheckCircle,
    Clock,
    AlertCircle
} from 'lucide-react';

export default function PelamarPekerjaan() {
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [assessment, setAssessment] = useState('Assessment');

    const [employer, setEmployer] = useState(null);
    const [jobList, setJobList] = useState([]);
    const [applicationList, setApplicationList] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 🔹 Ambil data employer dari localStorage
    useEffect(() => {
        const userData = localStorage.getItem("user");
        console.log("📦 Raw localStorage user:", userData);

        if (userData) {
            try {
                const parsedUser = JSON.parse(userData);
                console.log("👤 Parsed User:", parsedUser);

                const userId = parsedUser.user_id || parsedUser.id;
                console.log("🆔 Employer ID:", userId);

                const employerData = { ...parsedUser, user_id: userId };
                setEmployer(employerData);
            } catch (err) {
                console.error("❌ Error parsing user data:", err);
                setError("Gagal memuat data user");
            }
        } else {
            setError("User tidak login");
        }
        setLoading(false);
    }, []);

    // 🔹 Ambil semua data user untuk mendapatkan detail pelamar
    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/talenthub/api/v1/users');
                if (!response.ok) throw new Error('Gagal memuat data user');

                const result = await response.json();
                setAllUsers(result.payload?.data || []);
            } catch (err) {
                console.error('❌ Error loading users:', err);
            }
        };

        fetchAllUsers();
    }, []);

    // 🔹 Ambil lowongan berdasarkan employer_id dari localStorage
    useEffect(() => {
        if (!employer || !employer.user_id) {
            console.log("⏳ Waiting for employer data...");
            return;
        }

        console.log("🔄 Fetching jobs for employer ID:", employer.user_id);
        setLoading(true);
        setError(null);

        fetch(`http://localhost:3000/talenthub/api/v1/job_posts/employer/${employer.user_id}`)
            .then((res) => {
                console.log("📡 Response status:", res.status);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                console.log("📥 Full API Response:", data);

                if (data.payload?.data && Array.isArray(data.payload.data)) {
                    console.log("📊 Total jobs from API:", data.payload.data.length);
                    setJobList(data.payload.data);

                    // Set job pertama sebagai default
                    if (data.payload.data.length > 0 && !selectedJob) {
                        setSelectedJob(data.payload.data[0].job_id);
                    }
                } else {
                    console.log("⚠️ No jobs array in response");
                    setJobList([]);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("❌ Error Load Lowongan:", err);
                setError("Gagal memuat data lowongan: " + err.message);
                setJobList([]);
                setLoading(false);
            });
    }, [employer]);

    // 🔹 Ambil semua aplikasi pekerjaan
    useEffect(() => {
        const fetchAllApplications = async () => {
            try {
                const response = await fetch('http://localhost:3000/talenthub/api/v1/job_applications');
                if (!response.ok) throw new Error('Gagal memuat data lamaran');

                const result = await response.json();
                setApplicationList(result.payload?.data || []);
            } catch (err) {
                console.error('❌ Error loading applications:', err);
                setApplicationList([]);
            }
        };

        fetchAllApplications();
    }, []);

    // 🔹 Gabungkan data pelamar dengan data user
    const getApplicantsForJob = useMemo(() => {
        if (!selectedJob) return [];

        // Filter aplikasi berdasarkan job_id yang dipilih
        const jobApplications = applicationList.filter(app => app.job_id === selectedJob);

        // Gabungkan dengan data user
        const applicantsWithDetails = jobApplications.map(app => {
            const userData = allUsers.find(user => user.user_id === app.candidate_id);
            return {
                ...app,
                user: userData || {
                    full_name: app.candidate_name || 'Unknown',
                    email: 'N/A',
                    phone: 'N/A',
                    profile_picture: null
                }
            };
        });

        return applicantsWithDetails;
    }, [selectedJob, applicationList, allUsers]);

    // 🔹 Filter pelamar berdasarkan pencarian dan status
    const filteredApplicants = useMemo(() => {
        return getApplicantsForJob.filter(applicant => {
            const matchesSearch =
                (applicant.user.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (applicant.user.email || '').toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = filterStatus === 'all' ||
                (applicant.status || '').toLowerCase() === filterStatus.toLowerCase();

            return matchesSearch && matchesStatus;
        });
    }, [getApplicantsForJob, searchTerm, filterStatus]);

    // 🔹 Pagination
    const totalEntries = filteredApplicants.length;
    const totalPages = Math.ceil(totalEntries / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = Math.min(startIndex + entriesPerPage, totalEntries);
    const currentApplicants = filteredApplicants.slice(startIndex, endIndex);

    const handleFirstPage = () => setCurrentPage(1);
    const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const handleLastPage = () => setCurrentPage(totalPages);

    // 🔹 Fungsi helper untuk status
    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'submitted': return <Clock className="w-4 h-4" />;
            case 'reviewed': return <Eye className="w-4 h-4" />;
            case 'accepted': return <CheckCircle className="w-4 h-4" />;
            case 'rejected': return <XCircle className="w-4 h-4" />;
            default: return <AlertCircle className="w-4 h-4" />;
        }
    };

    const getStatusColor = (status) => {
        switch ((status || '').toLowerCase()) {
            case 'submitted': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'reviewed': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'accepted': return 'bg-green-100 text-green-700 border-green-200';
            case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getJobApplicantsCount = (jobId) => {
        return applicationList.filter(app => app.job_id === jobId).length;
    };

    // 🔹 Modal handlers
    const handleOpenModal = (applicant) => {
        setSelectedApplicant(applicant);
        setShowModal(true);
        setAssessment(applicant.status || 'Assessment');
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedApplicant(null);
    };

    const handleSave = async () => {
        if (!selectedApplicant) return;

        console.log('Updating status to:', assessment, 'for application ID:', selectedApplicant.application_id);

        try {
            const response = await fetch(
                `http://localhost:3000/talenthub/api/v1/job_applications/${selectedApplicant.application_id}/status`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        status: assessment
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to update status');
            }

            console.log('✅ Update successful:', result);

            alert(result.message || 'Status lamaran berhasil diperbarui!');

            // Update state tanpa perlu fetch ulang semua data
            setApplicationList(prevApplications =>
                prevApplications.map(app =>
                    app.application_id === selectedApplicant.application_id
                        ? { ...app, status: assessment }
                        : app
                )
            );

            // Tutup modal dan reset state
            setShowModal(false);
            setSelectedApplicant(null);
            setAssessment('Assessment');

        } catch (err) {
            console.error('❌ Error updating status:', err);
            alert(`Gagal memperbarui status: ${err.message}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Pelamar Pekerjaan</h1>
                    <p className="text-gray-600 mt-2">Kelola dan tinjau pelamar untuk lowongan Anda</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                        <div className="flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" />
                            <span>{error}</span>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
                        <p className="text-gray-500">Memuat data lowongan...</p>
                    </div>
                ) : jobList.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                        <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Belum ada lowongan</h3>
                        <p className="text-gray-500">Anda belum membuat lowongan pekerjaan.</p>
                    </div>
                ) : (
                    <>
                        {/* Job Selection Cards */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">Pilih Lowongan</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {jobList.map((job) => {
                                    const applicantCount = getJobApplicantsCount(job.job_id);
                                    return (
                                        <div
                                            key={job.job_id}
                                            onClick={() => {
                                                setSelectedJob(job.job_id);
                                                setCurrentPage(1);
                                            }}
                                            className={`bg-white rounded-xl p-5 cursor-pointer transition-all duration-300 border-2 hover:shadow-lg ${selectedJob === job.job_id
                                                ? 'border-blue-500 shadow-md'
                                                : 'border-gray-200 hover:border-blue-300'
                                                }`}
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                                                    {job.title}
                                                </h3>
                                                <div className={`px-2 py-1 rounded text-xs font-medium ${job.status === 'Open'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {job.status}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                                                <MapPin className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm">{job.location}</span>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="text-sm text-gray-500">
                                                    {job.employment_type}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-4 h-4 text-gray-400" />
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {applicantCount} pelamar
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Applicants Section */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            {/* Section Header */}
                            <div className="border-b border-gray-200 p-6">
                                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800">Daftar Pelamar</h2>
                                        <p className="text-gray-600 text-sm mt-1">
                                            {selectedJob ? jobList.find(j => j.job_id === selectedJob)?.title : 'Pilih lowongan'}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-gray-600 font-medium">
                                            {filteredApplicants.length} pelamar ditemukan
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="p-6 border-b border-gray-200 bg-gray-50">
                                <div className="flex flex-col lg:flex-row gap-4 justify-between">
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        {/* Search */}
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <input
                                                type="text"
                                                value={searchTerm}
                                                onChange={(e) => {
                                                    setSearchTerm(e.target.value);
                                                    setCurrentPage(1);
                                                }}
                                                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg w-full sm:w-64 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                                placeholder="Cari nama atau email..."
                                            />
                                        </div>

                                        {/* Status Filter */}
                                        <div className="relative">
                                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <select
                                                value={filterStatus}
                                                onChange={(e) => {
                                                    setFilterStatus(e.target.value);
                                                    setCurrentPage(1);
                                                }}
                                                className="pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white w-full sm:w-auto"
                                            >
                                                <option value="all">Semua Status</option>
                                                <option value="submitted">Submitted</option>
                                                <option value="reviewed">Reviewed</option>
                                                <option value="accepted">Accepted</option>
                                                <option value="rejected">Rejected</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Entries Per Page */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-600">Tampilkan</span>
                                        <select
                                            value={entriesPerPage}
                                            onChange={(e) => {
                                                setEntriesPerPage(Number(e.target.value));
                                                setCurrentPage(1);
                                            }}
                                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        >
                                            <option value={10}>10</option>
                                            <option value={25}>25</option>
                                            <option value={50}>50</option>
                                        </select>
                                        <span className="text-sm text-gray-600">entri</span>
                                    </div>
                                </div>
                            </div>

                            {/* Applicants List */}
                            <div className="p-6">
                                {selectedJob ? (
                                    filteredApplicants.length > 0 ? (
                                        <div className="space-y-4">
                                            {currentApplicants.map((applicant) => (
                                                <div
                                                    key={applicant.application_id}
                                                    className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-300 group"
                                                >
                                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                                        {/* Applicant Info */}
                                                        <div className="flex gap-4 flex-1">
                                                            <div className="flex-shrink-0">
                                                                <img
                                                                    src={applicant.user.profile_picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(applicant.user.full_name)}&background=random`}
                                                                    alt={applicant.user.full_name}
                                                                    className="w-16 h-16 rounded-xl object-cover border border-gray-200"
                                                                />
                                                            </div>

                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                                                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                                                        {applicant.user.full_name}
                                                                    </h3>
                                                                    <div className="flex items-center gap-2">
                                                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(applicant.status)}`}>
                                                                            {getStatusIcon(applicant.status)}
                                                                            {applicant.status}
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="space-y-2">
                                                                    <div className="flex flex-wrap items-center gap-4 text-sm">
                                                                        <div className="flex items-center gap-2">
                                                                            <Mail className="w-4 h-4 text-gray-400" />
                                                                            <span className="text-gray-600">{applicant.user.email}</span>
                                                                        </div>

                                                                        <div className="flex items-center gap-2">
                                                                            <Phone className="w-4 h-4 text-gray-400" />
                                                                            <span className="text-gray-600">{applicant.user.phone || 'N/A'}</span>
                                                                        </div>

                                                                        <div className="flex items-center gap-2">
                                                                            <Calendar className="w-4 h-4 text-gray-400" />
                                                                            <span className="text-gray-600">
                                                                                Melamar: {new Date(applicant.applied_at).toLocaleDateString('id-ID')}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Action Button */}
                                                        <div className="flex flex-col sm:flex-row gap-2">
                                                            <button
                                                                onClick={() => handleOpenModal(applicant)}
                                                                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg font-medium transition-colors group/btn"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                                <span>Detail</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                                <Users className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Tidak ada pelamar</h3>
                                            <p className="text-gray-500">
                                                {searchTerm || filterStatus !== 'all'
                                                    ? 'Tidak ada pelamar yang sesuai dengan filter'
                                                    : 'Belum ada yang melamar ke lowongan ini'}
                                            </p>
                                        </div>
                                    )
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
                                            <Briefcase className="w-8 h-8 text-blue-400" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Pilih Lowongan</h3>
                                        <p className="text-gray-500">Klik salah satu lowongan di atas untuk melihat pelamar</p>
                                    </div>
                                )}
                            </div>

                            {/* Pagination - Only show if there are applicants */}
                            {filteredApplicants.length > 0 && selectedJob && (
                                <div className="border-t border-gray-200 p-6 bg-gray-50">
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <div className="text-sm text-gray-600">
                                            Menampilkan <span className="font-semibold">{totalEntries > 0 ? startIndex + 1 : 0}</span> -{" "}
                                            <span className="font-semibold">{endIndex}</span> dari{" "}
                                            <span className="font-semibold">{totalEntries}</span> pelamar
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={handleFirstPage}
                                                disabled={currentPage === 1}
                                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                title="Halaman Pertama"
                                            >
                                                <ChevronsLeft className="w-4 h-4" />
                                            </button>

                                            <button
                                                onClick={handlePrevPage}
                                                disabled={currentPage === 1}
                                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                title="Sebelumnya"
                                            >
                                                <ChevronLeft className="w-4 h-4" />
                                            </button>

                                            <div className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium text-sm min-w-[60px] text-center">
                                                {currentPage}/{totalPages || 1}
                                            </div>

                                            <button
                                                onClick={handleNextPage}
                                                disabled={currentPage === totalPages || totalPages === 0}
                                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                title="Selanjutnya"
                                            >
                                                <ChevronRight className="w-4 h-4" />
                                            </button>

                                            <button
                                                onClick={handleLastPage}
                                                disabled={currentPage === totalPages || totalPages === 0}
                                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                title="Halaman Terakhir"
                                            >
                                                <ChevronsRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* Modal Detail Pelamar */}
            {showModal && selectedApplicant && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div
                        className="absolute inset-0"
                        onClick={handleCloseModal}
                    ></div>

                    <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Detail Pelamar</h2>
                                <p className="text-sm text-gray-600 mt-1">{selectedApplicant.user.full_name}</p>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
                            >
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Profile Image */}
                                <div className="md:col-span-1">
                                    <div className="sticky top-24">
                                        <img
                                            src={selectedApplicant.user.profile_picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedApplicant.user.full_name)}&background=random&size=300`}
                                            alt={selectedApplicant.user.full_name}
                                            className="w-full h-64 object-cover rounded-xl shadow-lg"
                                        />

                                        <div className="mt-4">
                                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(selectedApplicant.status)}`}>
                                                {getStatusIcon(selectedApplicant.status)}
                                                {selectedApplicant.status}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Applicant Details */}
                                <div className="md:col-span-2 space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-500 mb-1 block">Nama Lengkap</label>
                                            <p className="text-gray-800 font-medium">{selectedApplicant.user.full_name}</p>
                                        </div>

                                        <div>
                                            <label className="text-sm text-gray-500 mb-1 block">Email</label>
                                            <p className="text-gray-800 font-medium">{selectedApplicant.user.email}</p>
                                        </div>

                                        <div>
                                            <label className="text-sm text-gray-500 mb-1 block">No Telepon</label>
                                            <p className="text-gray-800 font-medium">{selectedApplicant.user.phone || 'N/A'}</p>
                                        </div>

                                        <div>
                                            <label className="text-sm text-gray-500 mb-1 block">Tanggal Melamar</label>
                                            <p className="text-gray-800 font-medium">
                                                {new Date(selectedApplicant.applied_at).toLocaleDateString('id-ID', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm text-gray-500 mb-1 block">Posisi yang Dilamar</label>
                                        <p className="text-gray-800 font-medium">{selectedApplicant.job_title || 'N/A'}</p>
                                    </div>

                                    <div>
                                        <label className="text-sm text-gray-500 mb-1 block">Ubah Status Lamaran</label>
                                        <select
                                            value={assessment}
                                            onChange={(e) => setAssessment(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                        >
                                            <option value="submitted">Submitted</option>
                                            <option value="reviewed">Reviewed</option>
                                            <option value="accepted">Accepted</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3 rounded-b-2xl">
                            <button
                                onClick={handleCloseModal}
                                className="px-6 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                            >
                                Simpan Perubahan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}