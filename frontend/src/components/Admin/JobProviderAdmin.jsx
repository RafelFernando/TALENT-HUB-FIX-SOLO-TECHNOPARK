import React, { useState, useMemo, useEffect } from "react";
import { Power, X, XCircle, CheckCircle, Edit2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function JobProviderAdmin() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const [notif, setNotif] = useState({ show: false, msg: "", type: "success" });

  // 🔔 Notifikasi
  const showNotif = (msg, type = "success") => {
    setNotif({ show: true, msg, type });
    setTimeout(() => setNotif({ show: false, msg: "", type }), 2000);
  };

  // Helper function untuk format URL gambar
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/80";

    if (imagePath.startsWith("http")) return imagePath;

    // Coba cek di /uploads
    return `http://localhost:4000/${imagePath}`;
  };


  // 🔹 Fetch data dari backend API
  useEffect(() => {
    const fetchJobSeekers = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "http://localhost:3000/talenthub/api/v1/admin/user_roles/employer"
        );

        if (!res.ok) throw new Error("Gagal memuat data Job Seeker");

        const json = await res.json();

        // Pastikan data berupa array
        setRoles(json.payload.data || []);
      } catch (err) {
        console.error("Error Fetch Job Seeker:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobSeekers();
  }, []);

  // 🔍 Filter pencarian
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return roles;

    return roles.filter(
      (r) =>
        r.full_name?.toLowerCase().includes(q) ||
        r.email?.toLowerCase().includes(q) ||
        r.phone?.toLowerCase().includes(q)
    );
  }, [roles, search]);


  // === Toggle Aktif / Nonaktif === //
  const handleConfirmToggle = () => {
    if (!selectedProvider) return;
    setRoles((prev) =>
      prev.map((r) =>
        r.id === selectedProvider.id ? { ...r, active: !r.active } : r
      )
    );
    showNotif(
      `${selectedProvider.name} berhasil ${selectedProvider.active ? "dinonaktifkan" : "diaktifkan"
      }!`
    );
    setShowModal(false);
  };

  // === PAGINATION === //
  const total = filtered.length;
  const totalPages = Math.ceil(total / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const rolesToShow = filtered.slice(startIndex, startIndex + perPage);

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setCurrentPage(p);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      {/* 🔔 Notifikasi */}
      {notif.show && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg text-white flex items-center gap-2 z-50 transition-all ${notif.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
        >
          <span>✅</span>
          <span>{notif.msg}</span>
        </div>
      )}

      {/* === LOADING || ERROR === */}
      {loading && (
        <p className="text-center py-10 text-gray-600">Memuat data...</p>
      )}
      {error && (
        <p className="text-center py-10 text-red-600">Error: {error}</p>
      )}

      {!loading && !error && (
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <h2 className="text-lg font-semibold text-[#193F7A]">
              Data Job Provider
            </h2>
          </div>

          {/* Kontrol Tabel */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Tampilkan</span>
              <select
                value={perPage}
                onChange={(e) => {
                  setPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
              </select>
              <span className="text-sm text-gray-600">entri</span>
            </div>

            <input
              type="text"
              placeholder="Cari nama, email atau telepon..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded px-3 py-1 text-sm w-56"
            />
          </div>

          {/* === TABLE === */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200">
              <thead>
                <tr className="bg-[#E84118] text-white text-left">
                  <th className="px-3 py-2 border-r">No</th>
                  <th className="px-3 py-2 border-r">Nama Lengkap</th>
                  <th className="px-3 py-2 border-r">Email</th>
                  <th className="px-3 py-2 border-r">Telepon</th>
                  <th className="px-3 py-2 border-r text-center">Status</th>
                  <th className="px-3 py-2 text-center">Opsi</th>
                </tr>
              </thead>

              <tbody>
                {rolesToShow.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-3 py-6 text-center text-gray-500"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                ) : (
                  rolesToShow.map((r, i) => (
                    <tr
                      key={r.user_id}
                      className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } border-b`}
                    >
                      <td className="px-3 py-2">{startIndex + i + 1}</td>
                      <td className="px-3 py-2">{r.full_name}</td>
                      <td className="px-3 py-2">{r.email}</td>
                      <td className="px-3 py-2">{r.phone}</td>

                      {/* STATUS */}
                      <td className="px-3 py-2 text-center">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={r.status === "active"}
                            onChange={() => handleToggleActive(r.user_id)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-[#193F7A] relative transition-all">
                            <div className="absolute left-[2px] top-[2px] bg-white w-5 h-5 rounded-full transition-all peer-checked:translate-x-full"></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-700">
                            {r.status === "active" ? "Aktif" : "Nonaktif"}
                          </span>
                        </label>
                      </td>

                      {/* Opsi */}
                      <td className="px-3 py-2 text-center">
                        <button
                          onClick={() => handleEdit(r.user_id)}
                          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition"
                        >
                          <Edit2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 text-sm text-gray-600 gap-3">
            <p>
              Menampilkan {startIndex + 1} sampai{" "}
              {Math.min(startIndex + rolesToShow.length, total)} dari {total}{" "}
              entri
            </p>
            <div className="flex gap-1 items-center">
              <button
                onClick={() => goToPage(1)}
                className="px-2 py-1 border rounded hover:bg-gray-200"
              >
                &lt;&lt;
              </button>
              <button
                onClick={() => goToPage(currentPage - 1)}
                className="px-2 py-1 border rounded hover:bg-gray-200"
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }, (_, idx) => idx + 1)
                .slice(
                  Math.max(0, currentPage - 3),
                  Math.min(totalPages, currentPage + 2)
                )
                .map((p) => (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`px-2 py-1 border rounded ${p === currentPage
                        ? "bg-[#193F7A] text-white"
                        : "hover:bg-gray-200"
                      }`}
                  >
                    {p}
                  </button>
                ))}

              <button
                onClick={() => goToPage(currentPage + 1)}
                className="px-2 py-1 border rounded hover:bg-gray-200"
              >
                &gt;
              </button>
              <button
                onClick={() => goToPage(totalPages)}
                className="px-2 py-1 border rounded hover:bg-gray-200"
              >
                &gt;&gt;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === MODAL === */}
      <AnimatePresence>
        {showModal && selectedProvider && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 15 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div
                className={`flex items-center justify-between px-5 py-3 ${selectedProvider.active ? "bg-red-600" : "bg-green-600"
                  } text-white`}
              >
                <div className="flex items-center gap-2">
                  <Power size={20} />
                  <h3 className="font-semibold text-lg">Status User</h3>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="hover:bg-white/20 p-1 rounded"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 bg-red-50 text-center rounded-b-xl">
                <p className="text-gray-700 mb-6">
                  {selectedProvider.active
                    ? `Nonaktifkan Job Provider ${selectedProvider.name}?`
                    : `Aktifkan Job Provider ${selectedProvider.name}?`}
                </p>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex items-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-medium transition"
                  >
                    <XCircle size={18} />
                    Batal
                  </button>

                  <button
                    onClick={handleConfirmToggle}
                    className={`flex items-center gap-2 text-white px-4 py-2 rounded-lg font-medium transition ${selectedProvider.active
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-green-600 hover:bg-green-700"
                      }`}
                  >
                    <CheckCircle size={18} />
                    YA
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
