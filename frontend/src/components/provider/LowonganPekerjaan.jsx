import React, { useState, useMemo, useEffect } from "react";
import { Plus, RefreshCw, Eye, Edit2, XCircle, Calendar, MapPin, DollarSign, Briefcase, Filter, X, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Komponen Modal Box untuk pesan
const MessageModal = ({ isOpen, onClose, title, message, type = "info", onConfirm }) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case "error":
        return (
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case "warning":
        return (
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.872 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex justify-center mb-4">
          {getIcon()}
        </div>

        <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">
          {title}
        </h3>

        <div className="text-gray-600 text-center">
          <p className="text-sm whitespace-pre-line">{message}</p>
        </div>

        <div className="flex gap-3 mt-6">
          {type === "warning" && onConfirm ? (
            <>
              <button
                onClick={onClose}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="flex-1 bg-[#193F7A] text-white py-3 rounded-lg font-semibold hover:bg-[#152f5a] transition-all"
              >
                Ya, Lanjutkan
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full bg-[#193F7A] text-white py-3 rounded-lg font-semibold hover:bg-[#152f5a] transition-all"
            >
              Ok
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function LowonganPekerjaan() {
  const [showModal, setShowModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageModalData, setMessageModalData] = useState({
    title: "",
    message: "",
    type: "info",
    onConfirm: null
  });
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const [provider, setProvider] = useState(null);
  const [lowonganList, setLowonganList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    job_category_id: "",
    salary_min: "",
    salary_max: "",
    location: "",
    employment_type: "Full-time",
    deadline: ""
  });

  // 🔹 Ambil provider login dari localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        const userId = parsedUser.user_id || parsedUser.id;
        const providerData = { ...parsedUser, id: userId };
        setProvider(providerData);
      } catch (err) {
        console.error("❌ Error parsing user data:", err);
        setMessageModalData({
          title: "Error",
          message: "Gagal memuat data user",
          type: "error"
        });
        setShowMessageModal(true);
      }
    } else {
      setMessageModalData({
        title: "Error",
        message: "User tidak login",
        type: "error"
      });
      setShowMessageModal(true);
    }
    setLoading(false);
  }, []);

  // 🔹 Ambil categories dari API endpoint yang benar
  // 🔹 Ambil categories dari API endpoint yang benar
  useEffect(() => {
    setCategoriesLoading(true);
    fetch(`http://localhost:3000/talenthub/api/v1/job_categories`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("📥 Data kategori DITERIMA (raw):", data);

        // Perbaikan: Cek struktur data dengan lebih detail
        let categoriesData = [];

        // Cek berbagai kemungkinan struktur respons
        if (data && data.payload && data.payload.data) {
          // Struktur: { payload: { data: [...] } }
          categoriesData = data.payload.data;
        } else if (data && data.data) {
          // Struktur: { data: [...] }
          categoriesData = data.data;
        } else if (Array.isArray(data)) {
          // Struktur langsung array
          categoriesData = data;
        } else if (data && data.payload && Array.isArray(data.payload)) {
          // Struktur: { payload: [...] }
          categoriesData = data.payload;
        }

        console.log("📊 Data kategori DIPROSES:", categoriesData);

        // Filter hanya kategori yang statusnya aktif
        const activeCategories = categoriesData.filter(
          category => {
            // Debug: log setiap kategori
            console.log(`Kategori: ${category.name}, Status: ${category.status}`);
            return category.status &&
              (category.status.toLowerCase() === "active" ||
                category.status.toLowerCase() === "aktif");
          }
        );

        console.log("✅ Kategori aktif:", activeCategories);
        setCategories(activeCategories);
        setCategoriesLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error loading categories:", err);
        setMessageModalData({
          title: "Error",
          message: "Gagal memuat kategori pekerjaan",
          type: "error"
        });
        setShowMessageModal(true);
        setCategories([]);
        setCategoriesLoading(false);
      });
  }, []);

  // 🔹 Ambil data provinsi dari API wilayah Indonesia
  useEffect(() => {
    fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((res) => res.json())
      .then((data) => {
        setProvinces(data);
      })
      .catch((err) => console.error("❌ Error loading provinces:", err));
  }, []);

  // 🔹 Ambil data kota berdasarkan provinsi yang dipilih
  useEffect(() => {
    if (!selectedProvince) {
      setCities([]);
      return;
    }

    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`)
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
      })
      .catch((err) => console.error("❌ Error loading cities:", err));
  }, [selectedProvince]);

  // 🔹 Ambil lowongan dari API berdasarkan employer yang login
  const fetchLowongan = () => {
    if (!provider || !provider.id) return;

    setLoading(true);
    setRefreshing(true);
    setError(null);

    fetch(`http://localhost:3000/talenthub/api/v1/job_posts/employer/${provider.id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("📥 Data lowongan diterima:", data);

        if (data && data.payload && data.payload.data) {
          // Urutkan berdasarkan terbaru (posted_at terbaru)
          const sortedData = data.payload.data.sort((a, b) => {
            return new Date(b.posted_at) - new Date(a.posted_at);
          });
          setLowonganList(sortedData);
        } else if (Array.isArray(data)) {
          const sortedData = data.sort((a, b) => {
            return new Date(b.posted_at) - new Date(a.posted_at);
          });
          setLowonganList(sortedData);
        } else {
          console.warn("⚠️ Struktur data tidak dikenali:", data);
          setLowonganList([]);
        }
        setLoading(false);
        setRefreshing(false);
      })
      .catch((err) => {
        console.error("❌ Error Load Lowongan:", err);
        setMessageModalData({
          title: "Error",
          message: "Gagal memuat data lowongan: " + err.message,
          type: "error"
        });
        setShowMessageModal(true);
        setLowonganList([]);
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchLowongan();
  }, [provider]);

  // 🔍 Filter pencarian
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return lowonganList;
    return lowonganList.filter(
      (l) =>
        l.title?.toLowerCase().includes(q) ||
        l.category_name?.toLowerCase().includes(q) ||
        l.location?.toLowerCase().includes(q) ||
        l.company_name?.toLowerCase().includes(q)
    );
  }, [search, lowonganList]);

  // 📄 Pagination
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

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      requirements: "",
      job_category_id: "",
      salary_min: "",
      salary_max: "",
      location: "",
      employment_type: "Full-time",
      deadline: ""
    });
    setSelectedProvince("");
    setCities([]);
  };

  const handleTambah = () => {
    resetForm();
    setEditData(null);
    setShowModal(true);
  };

  const handleEdit = (data) => {
    setEditData(data);
    setFormData({
      title: data.title || "",
      description: data.description || "",
      requirements: data.requirements || "",
      job_category_id: data.job_category_id || "",
      salary_min: data.salary_min || "",
      salary_max: data.salary_max || "",
      location: data.location || "",
      employment_type: data.employment_type || "Full-time",
      deadline: data.deadline ? data.deadline.split('T')[0] : ""
    });
    setSelectedProvince("");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditData(null);
    resetForm();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setFormData(prev => ({
      ...prev,
      location: ""
    }));
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    const selectedCity = cities.find(city => city.id === cityId);
    if (selectedCity) {
      setFormData(prev => ({
        ...prev,
        location: selectedCity.name
      }));
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setMessageModalData({
        title: "Validasi Error",
        message: "Judul lowongan tidak boleh kosong!",
        type: "error"
      });
      setShowMessageModal(true);
      return false;
    }
    if (!formData.description.trim()) {
      setMessageModalData({
        title: "Validasi Error",
        message: "Deskripsi tidak boleh kosong!",
        type: "error"
      });
      setShowMessageModal(true);
      return false;
    }
    if (!formData.requirements.trim()) {
      setMessageModalData({
        title: "Validasi Error",
        message: "Requirements tidak boleh kosong!",
        type: "error"
      });
      setShowMessageModal(true);
      return false;
    }
    if (!formData.job_category_id) {
      setMessageModalData({
        title: "Validasi Error",
        message: "Pilih kategori pekerjaan!",
        type: "error"
      });
      setShowMessageModal(true);
      return false;
    }
    if (!formData.salary_min || !formData.salary_max) {
      setMessageModalData({
        title: "Validasi Error",
        message: "Salary range tidak boleh kosong!",
        type: "error"
      });
      setShowMessageModal(true);
      return false;
    }
    if (parseInt(formData.salary_min) > parseInt(formData.salary_max)) {
      setMessageModalData({
        title: "Validasi Error",
        message: "Salary minimum tidak boleh lebih besar dari maximum!",
        type: "error"
      });
      setShowMessageModal(true);
      return false;
    }
    if (!formData.location.trim()) {
      setMessageModalData({
        title: "Validasi Error",
        message: "Lokasi tidak boleh kosong!",
        type: "error"
      });
      setShowMessageModal(true);
      return false;
    }
    if (!formData.deadline) {
      setMessageModalData({
        title: "Validasi Error",
        message: "Deadline tidak boleh kosong!",
        type: "error"
      });
      setShowMessageModal(true);
      return false;
    }

    // Validasi deadline tidak boleh tanggal yang sudah lewat
    const deadlineDate = new Date(formData.deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (deadlineDate < today) {
      setMessageModalData({
        title: "Validasi Error",
        message: "Deadline tidak boleh tanggal yang sudah lewat!",
        type: "error"
      });
      setShowMessageModal(true);
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    if (!provider || !provider.id) {
      setMessageModalData({
        title: "Error",
        message: "User tidak ditemukan!",
        type: "error"
      });
      setShowMessageModal(true);
      return;
    }

    setSaving(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessageModalData({
          title: "Error",
          message: "Token tidak ditemukan. Silakan login ulang.",
          type: "error"
        });
        setShowMessageModal(true);
        setSaving(false);
        return;
      }

      const payload = {
        employer_id: provider.id,
        title: formData.title,
        description: formData.description,
        requirements: formData.requirements,
        job_category_id: parseInt(formData.job_category_id),
        salary_min: parseFloat(formData.salary_min),
        salary_max: parseFloat(formData.salary_max),
        location: formData.location,
        employment_type: formData.employment_type,
        status: "Open",
        deadline: `${formData.deadline} 23:59:59`
      };

      console.log("📤 Sending payload:", payload);

      let response;
      if (editData) {
        // Update existing job
        console.log("🔄 Updating job:", editData.job_id);
        response = await fetch(
          `http://localhost:3000/talenthub/api/v1/job_posts/${editData.job_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
          }
        );
      } else {
        // Create new job
        console.log("➕ Creating new job");
        response = await fetch(
          `http://localhost:3000/talenthub/api/v1/job_posts`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
          }
        );
      }

      console.log("📡 Response status:", response.status);

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          console.error("❌ Error response:", errorData);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (parseErr) {
          const errorText = await response.text();
          console.error("❌ Error response (text):", errorText);
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log("✅ Success:", result);

      setMessageModalData({
        title: "Success",
        message: `Lowongan berhasil ${editData ? "diperbarui" : "ditambahkan"}!`,
        type: "success"
      });
      setShowMessageModal(true);

      handleCloseModal();
      fetchLowongan(); // Refresh data
    } catch (err) {
      console.error("❌ Error saving:", err);
      setMessageModalData({
        title: "Error",
        message: "Gagal menyimpan: " + err.message,
        type: "error"
      });
      setShowMessageModal(true);
    } finally {
      setSaving(false);
    }
  };

  const refreshData = () => {
    console.log("🔄 Refreshing data...");
    fetchLowongan();
  };

  const handleToggleStatus = async (jobId, currentStatus, jobTitle) => {
  console.log("🔍 All job data:", lowonganList);
  
  const normalizedStatus = currentStatus?.toLowerCase();
  const isCurrentlyActive = normalizedStatus === "active" || normalizedStatus === "open";
  let newStatus = isCurrentlyActive ? "Closed" : "Open";
  
  console.log("🔍 Current status:", currentStatus, "New status:", newStatus);

  setMessageModalData({
    title: "Konfirmasi",
    message: `Apakah Anda yakin ingin ${isCurrentlyActive ? "menonaktifkan" : "mengaktifkan"} lowongan "${jobTitle}"?`,
    type: "warning",
    onConfirm: async () => {
      try {
        const token = localStorage.getItem("token");
        const jobData = lowonganList.find(l => l.job_id == jobId);
        
        console.log("🔍 Found job data:", jobData);
        console.log("🔍 Original posted_at value:", jobData.posted_at);
        console.log("🔍 Original posted_at type:", typeof jobData.posted_at);

        if (!jobData) {
          throw new Error("Data lowongan tidak ditemukan");
        }

        if (!provider || !provider.id) {
          throw new Error("Provider tidak ditemukan");
        }

        // DEBUG: Cek format asli dari API
        console.log("🔍 DEBUG - Checking date format:");
        console.log("🔍 posted_at raw:", jobData.posted_at);
        
        // Format posted_at - JANGAN BUAT BARU, GUNAKAN YANG SUDAH ADA
        let formattedPostedAt;
        if (jobData.posted_at) {
          // Jika sudah dalam format string yang valid, gunakan langsung
          // Cek jika sudah dalam format MySQL (YYYY-MM-DD HH:MM:SS)
          const mysqlFormatRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
          const isoFormatRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
          
          if (mysqlFormatRegex.test(jobData.posted_at)) {
            // Sudah format MySQL, gunakan langsung
            formattedPostedAt = jobData.posted_at;
            console.log("🔍 Already in MySQL format, using as-is");
          } else if (isoFormatRegex.test(jobData.posted_at)) {
            // Format ISO, convert ke MySQL
            const date = new Date(jobData.posted_at);
            // Pastikan timezone benar (UTC+7 untuk Indonesia)
            formattedPostedAt = date.toISOString().slice(0, 19).replace('T', ' ');
            console.log("🔍 ISO format, converting to MySQL:", formattedPostedAt);
          } else {
            // Format lain, coba parse
            const date = new Date(jobData.posted_at);
            if (!isNaN(date.getTime())) {
              formattedPostedAt = date.toISOString().slice(0, 19).replace('T', ' ');
            } else {
              // Fallback: gunakan sekarang
              formattedPostedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
            }
          }
        } else {
          // Jika tidak ada posted_at, gunakan tanggal sekarang
          formattedPostedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
        }

        console.log("🔍 Final formatted posted_at:", formattedPostedAt);

        // Format deadline
        let formattedDeadline = null;
        if (jobData.deadline) {
          try {
            const date = new Date(jobData.deadline);
            formattedDeadline = date.toISOString().slice(0, 19).replace('T', ' ');
          } catch (err) {
            console.warn("⚠️ Error formatting deadline:", err);
          }
        }

        console.log("🔍 Formatted deadline:", formattedDeadline);

        // Siapkan payload
        const payload = {
          employer_id: parseInt(provider.id),
          title: jobData.title || "",
          description: jobData.description || "",
          requirements: jobData.requirements || "",
          job_category_id: parseInt(jobData.job_category_id) || 0,
          salary_min: parseFloat(jobData.salary_min) || 0.00,
          salary_max: parseFloat(jobData.salary_max) || 0.00,
          location: jobData.location || "",
          employment_type: jobData.employment_type || "Full-time",
          status: newStatus,
          posted_at: formattedPostedAt, // Gunakan format yang sudah diperbaiki
          deadline: formattedDeadline
        };

        console.log("📤 Final payload:", JSON.stringify(payload, null, 2));

        const response = await fetch(
          `http://localhost:3000/talenthub/api/v1/job_posts/${jobId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
          }
        );

        console.log("📡 Response status:", response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error("❌ Error response text:", errorText);
          
          try {
            const errorData = JSON.parse(errorText);
            console.error("❌ Error response JSON:", errorData);
            
            if (errorData.payload?.sqlMessage) {
              console.error("❌ SQL Error:", errorData.payload.sqlMessage);
            }
          } catch (e) {
            console.error("❌ Could not parse error as JSON");
          }
          
          throw new Error(`HTTP ${response.status}: Gagal mengupdate job`);
        }

        const result = await response.json();
        console.log("✅ Success response:", result);

        setMessageModalData({
          title: "Berhasil",
          message: `Lowongan "${jobTitle}" berhasil ${isCurrentlyActive ? "ditutup" : "diaktifkan"}.`,
          type: "success"
        });
        setShowMessageModal(true);
        
        setTimeout(() => {
          fetchLowongan();
        }, 1000);
      } catch (err) {
        console.error("❌ Error toggle status:", err);
        setMessageModalData({
          title: "Error",
          message: `Gagal mengubah status: ${err.message}`,
          type: "error"
        });
        setShowMessageModal(true);
      }
    }
  });
  setShowMessageModal(true);
};



  const handleDelete = async (jobId, jobTitle) => {
    setMessageModalData({
      title: "Konfirmasi Hapus",
      message: `Apakah Anda yakin ingin menghapus lowongan "${jobTitle}"?\n\nTindakan ini tidak dapat dibatalkan.`,
      type: "warning",
      onConfirm: async () => {
        try {
          const token = localStorage.getItem("token");
          console.log(`🗑️ Deleting job ${jobId}`);

          const response = await fetch(
            `http://localhost:3000/talenthub/api/v1/job_posts/${jobId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              }
            }
          );

          console.log("📡 Delete response status:", response.status);

          if (!response.ok) {
            const errorText = await response.text();
            console.error("❌ Error response text:", errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();
          console.log("✅ Delete success:", result);

          setMessageModalData({
            title: "Success",
            message: "Lowongan berhasil dihapus!",
            type: "success"
          });
          setShowMessageModal(true);

          // Refresh data setelah beberapa detik
          setTimeout(() => {
            fetchLowongan();
          }, 1000);
        } catch (err) {
          console.error("❌ Error deleting job:", err);
          setMessageModalData({
            title: "Error",
            message: "Gagal menghapus lowongan: " + err.message,
            type: "error"
          });
          setShowMessageModal(true);
        }
      }
    });
    setShowMessageModal(true);
  };

  const formatSalary = (min, max) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Tidak ditentukan";

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (err) {
      console.error("Error formatting date:", err);
      return dateString;
    }
  };

  const getStatusBadge = (status) => {
    const normalized = status?.toLowerCase();
    if (normalized === "open" || normalized === "active") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          Aktif
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
          Tidak Aktif
        </span>
      );
    }
  };

  const getImageUrl = (filename) => {
    if (!filename) {
      return "https://via.placeholder.com/80?text=No+Image";
    }

    return `http://localhost:3000/uploads/profile-images/${filename}`;
  };

  const getEmploymentTypeBadge = (type) => {
    const typeColors = {
      "Full-time": "bg-blue-100 text-blue-800",
      "Full Time": "bg-blue-100 text-blue-800",
      "Part-time": "bg-purple-100 text-purple-800",
      "Part Time": "bg-purple-100 text-purple-800",
      "Contract": "bg-orange-100 text-orange-800",
      "Internship": "bg-pink-100 text-pink-800",
      "Freelance": "bg-indigo-100 text-indigo-800"
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[type] || "bg-gray-100 text-gray-800"}`}>
        {type}
      </span>
    );
  };

  const getCompanyLogo = (lowongan) => {
    if (lowongan.company_profile_image) {
      return `http://localhost:3000/uploads/${lowongan.company_profile_image}`;
    }
    if (lowongan.employer_profile_picture) {
      return `http://localhost:3000/uploads/${lowongan.employer_profile_picture}`;
    }
    return 'https://via.placeholder.com/80';
  };

  if (loading && lowonganList.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin mx-auto mb-4 text-green-600" />
          <p className="text-gray-600 font-medium">Memuat data lowongan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Lowongan Pekerjaan Saya
              </h1>
              {provider && (
                <p className="text-gray-600 mt-2 flex items-center">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Employer: {provider.full_name || provider.email}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleTambah}
                className="flex items-center gap-2 bg-[#193F7A] hover:from-green-700 hover:to-emerald-700 text-white px-5 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <Plus size={20} />
                Tambah Lowongan
              </button>

              <button
                onClick={refreshData}
                disabled={refreshing}
                className="flex items-center gap-2 bg-red-600 hover:from-gray-800 hover:to-gray-900 text-white px-5 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
              >
                <RefreshCw size={20} className={refreshing ? "animate-spin" : ""} />
                Refresh
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Lowongan</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{lowonganList.length}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Lowongan Dibuka</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {lowonganList.filter(l => l.status === "Open" || l.status === "open").length}
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Lowongan Ditutup</p>
                  <p className="text-3xl font-bold text-red-600 mt-2">
                    {lowonganList.filter(l => l.status === "Closed" || l.status === "closed").length}
                  </p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700 font-medium">Filter</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm">Tampilkan</span>
                <select
                  value={perPage}
                  onChange={handlePerPageChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                </select>
                <span className="text-gray-600 text-sm">entri</span>
              </div>
            </div>

            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none w-full lg:w-80"
                  placeholder="Cari judul, kategori, atau lokasi..."
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lowongan List */}
        {jobsToShow.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {search ? "Tidak ada lowongan yang sesuai" : "Belum ada lowongan"}
              </h3>
              <p className="text-gray-600 mb-6">
                {search ? "Coba ubah kata kunci pencarian Anda" : "Mulai buat lowongan pertama Anda untuk menemukan talenta terbaik"}
              </p>
              {!search && (
                <button
                  onClick={handleTambah}
                  className="inline-flex items-center gap-2 bg-[#193F7A] hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Plus size={20} />
                  Buat Lowongan Pertama
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {jobsToShow.map((lowongan) => {
              const normalizedStatus = lowongan.status?.toLowerCase();
              const isActive = normalizedStatus === "active" || normalizedStatus === "open";

              return (
                <motion.div
                  key={lowongan.job_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-200 transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      {/* Company Logo */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200">
                          <img
                            src={getImageUrl(lowongan.company_profile_image)}
                            alt={lowongan.company_name || lowongan.employer_name || "Perusahaan"}
                            className="w-full h-full"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/80?text=No+Image";
                              e.target.onerror = null;
                            }}
                          />
                        </div>
                      </div>

                      {/* Job Details */}
                      <div className="flex-1">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-gray-900">
                                {lowongan.title}
                              </h3>
                              {getStatusBadge(lowongan.status)}
                            </div>

                            <div className="flex items-center gap-4 mb-4">
                              <div className="flex items-center gap-1.5 text-gray-700">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                <span className="text-sm font-medium">{lowongan.company_name}</span>
                              </div>

                              <div className="flex items-center gap-1.5 text-gray-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <span className="text-sm">{lowongan.category_name}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-start lg:items-end gap-3">
                            <div className="text-right">
                              <p className="text-lg font-bold text-green-700">
                                {formatSalary(lowongan.salary_min, lowongan.salary_max)}
                              </p>
                              <p className="text-sm text-gray-500">per bulan</p>
                            </div>
                          </div>
                        </div>

                        {/* Job Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                          <div className="flex items-center gap-2 text-gray-700">
                            <MapPin className="w-5 h-5 text-gray-400" />
                            <span className="text-sm">{lowongan.location}</span>
                          </div>

                          <div className="flex items-center gap-2 text-gray-700">
                            <Briefcase className="w-5 h-5 text-gray-400" />
                            <span className="text-sm">{getEmploymentTypeBadge(lowongan.employment_type)}</span>
                          </div>

                          <div className="flex items-center gap-2 text-gray-700">
                            <Calendar className="w-5 h-5 text-gray-400" />
                            <span className="text-sm">Deadline: {formatDate(lowongan.deadline)}</span>
                          </div>

                          <div className="flex items-center gap-2 text-gray-700">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm">Dibuat: {formatDate(lowongan.posted_at)}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                          <button
                            onClick={() => handleEdit(lowongan)}
                            className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2.5 rounded-lg font-medium transition-colors duration-200"
                          >
                            <Edit2 size={16} />
                            Edit Lowongan
                          </button>

                          <button
                            onClick={() => handleToggleStatus(lowongan.job_id, lowongan.status, lowongan.title)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors duration-200 ${isActive
                              ? "bg-red-50 hover:bg-red-100 text-red-700"
                              : "bg-green-50 hover:bg-green-100 text-green-700"
                              }`}
                          >
                            {isActive ? (
                              <>
                                <XCircle size={16} />
                                Nonaktifkan
                              </>
                            ) : (
                              <>
                                <RefreshCw size={16} />
                                Aktifkan
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => handleDelete(lowongan.job_id, lowongan.title)}
                            className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2.5 rounded-lg font-medium transition-colors duration-200"
                          >
                            <Trash2 size={16} />
                            Hapus
                          </button>

                          <button className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg font-medium transition-colors duration-200">
                            <Eye size={16} />
                            Lihat Detail
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {jobsToShow.length > 0 && (
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mt-8">
            <p className="text-gray-600 text-sm">
              Menampilkan {startIndex + 1} sampai{" "}
              {Math.min(startIndex + jobsToShow.length, total)} dari {total} lowongan
            </p>

            <div className="flex items-center gap-1">
              <button
                onClick={() => goToPage(1)}
                disabled={current === 1}
                className="px-3 py-2 border border-gray-300 rounded-l-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                &lt;&lt;
              </button>
              <button
                onClick={() => goToPage(current - 1)}
                disabled={current === 1}
                className="px-3 py-2 border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(Math.max(0, current - 3), Math.min(totalPages, current + 2))
                .map((p) => (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`px-3 py-2 border border-gray-300 min-w-[40px] ${p === current
                      ? "bg-green-600 text-white border-green-600"
                      : "hover:bg-gray-50"
                      } transition-colors`}
                  >
                    {p}
                  </button>
                ))}

              <button
                onClick={() => goToPage(current + 1)}
                disabled={current === totalPages}
                className="px-3 py-2 border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                &gt;
              </button>
              <button
                onClick={() => goToPage(totalPages)}
                disabled={current === totalPages}
                className="px-3 py-2 border border-gray-300 rounded-r-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                &gt;&gt;
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              key="modalBox"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full max-w-4xl bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900">
                  {editData ? "Edit Lowongan" : "Tambah Lowongan Baru"}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  disabled={saving}
                >
                  <XCircle size={24} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Judul Lowongan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    disabled={saving}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none disabled:bg-gray-100 text-lg"
                    placeholder="Contoh: Frontend Developer"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Deskripsi Pekerjaan <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    disabled={saving}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none disabled:bg-gray-100"
                    placeholder="Jelaskan detail pekerjaan, tanggung jawab, dan lingkungan kerja..."
                  />
                </div>

                {/* Requirements */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Requirements <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    disabled={saving}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none disabled:bg-gray-100"
                    placeholder="Tuliskan kualifikasi dan skill yang dibutuhkan (pisahkan dengan baris baru atau bullet points)"
                  />
                </div>

                {/* Category & Employment Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Kategori Pekerjaan <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="job_category_id"
                      value={formData.job_category_id}
                      onChange={handleInputChange}
                      disabled={saving || categoriesLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none disabled:bg-gray-100"
                    >
                      <option value="">Pilih Kategori</option>
                      {categoriesLoading ? (
                        <option value="" disabled>Memuat kategori...</option>
                      ) : categories.length === 0 ? (
                        <option value="" disabled>Tidak ada kategori tersedia</option>
                      ) : (
                        categories.map((cat) => {
                          // Debug: log setiap kategori di dropdown
                          console.log(`Dropdown - Kategori: ${cat.name}, ID: ${cat.category_id || cat.id}`);
                          return (
                            <option key={cat.category_id || cat.id} value={cat.category_id || cat.id}>
                              {cat.name}
                            </option>
                          );
                        })
                      )}
                    </select>
                    {categoriesLoading && (
                      <p className="text-xs text-gray-500 mt-1 flex items-center">
                        <RefreshCw className="w-3 h-3 animate-spin mr-1" />
                        Memuat kategori...
                      </p>
                    )}
                    {!categoriesLoading && categories.length > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        Ditemukan {categories.length} kategori
                      </p>
                    )}
                  </div>


                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tipe Pekerjaan <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="employment_type"
                      value={formData.employment_type}
                      onChange={handleInputChange}
                      disabled={saving}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none disabled:bg-gray-100"
                    >
                      <option value="Full-time">Full Time</option>
                      <option value="Part-time">Part Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </div>
                </div>

                {/* Salary Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Gaji Minimum (IDR) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        Rp
                      </div>
                      <input
                        type="number"
                        name="salary_min"
                        value={formData.salary_min}
                        onChange={handleInputChange}
                        disabled={saving}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none disabled:bg-gray-100"
                        placeholder="5000000"
                        min="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Gaji Maximum (IDR) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        Rp
                      </div>
                      <input
                        type="number"
                        name="salary_max"
                        value={formData.salary_max}
                        onChange={handleInputChange}
                        disabled={saving}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none disabled:bg-gray-100"
                        placeholder="8000000"
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Location & Deadline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Provinsi <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={selectedProvince}
                        onChange={handleProvinceChange}
                        disabled={saving}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none disabled:bg-gray-100"
                      >
                        <option value="">Pilih Provinsi</option>
                        {provinces.map((province) => (
                          <option key={province.id} value={province.id}>
                            {province.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Kota/Kabupaten <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.location}
                        onChange={handleCityChange}
                        disabled={saving || !selectedProvince}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none disabled:bg-gray-100"
                      >
                        <option value="">Pilih Kota/Kabupaten</option>
                        {cities.map((city) => (
                          <option key={city.id} value={city.id}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Deadline Pendaftaran <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      disabled={saving}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none disabled:bg-gray-100"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Pilih tanggal terakhir pendaftaran untuk lowongan ini
                    </p>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-800">
                        <span className="font-semibold">Informasi:</span> Lowongan akan otomatis terdaftar atas nama perusahaan Anda. Pastikan semua informasi yang diisi akurat dan sesuai dengan kebutuhan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                <button
                  onClick={handleCloseModal}
                  disabled={saving}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Batal
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 bg-[#193F7A] hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md"
                >
                  {saving ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      {editData ? "Update Lowongan" : "Simpan Lowongan"}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Box untuk Pesan */}
      <MessageModal
        isOpen={showMessageModal}
        onClose={() => {
          setShowMessageModal(false);
          setMessageModalData({
            title: "",
            message: "",
            type: "info",
            onConfirm: null
          });
        }}
        title={messageModalData.title}
        message={messageModalData.message}
        type={messageModalData.type}
        onConfirm={messageModalData.onConfirm}
      />
    </div>
  );
}