import React, { useState, useEffect, useMemo } from "react";
import { Pencil, Trash2, PlusCircle, RefreshCw } from "lucide-react";

export default function FiturPremiumAdmin() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Ganti URL dengan API backend kamu
  const API_URL = "http://localhost:5000/api/premium";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Gagal memuat data");
        const json = await res.json();
        const arrayData = Array.isArray(json)
          ? json
          : json.data || json.premium || [];
        setData(arrayData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 🔍 Filter pencarian
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (item) =>
        item.nama?.toLowerCase().includes(q) ||
        item.tipe?.toLowerCase().includes(q)
    );
  }, [data, search]);

  // 📑 Pagination
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(currentPage, totalPages);
  const startIndex = (current - 1) * perPage;
  const itemsToShow = filtered.slice(startIndex, startIndex + perPage);

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
      <div className="bg-white rounded-lg shadow p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-800">Data Premium</h2>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded">
              <PlusCircle size={16} /> Tambah
            </button>
            <button className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded">
              <RefreshCw size={16} /> Reload
            </button>
          </div>
        </div>

        {/* Kontrol atas */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select
              value={perPage}
              onChange={handlePerPageChange}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={100}>100</option>
            </select>
            <span>entries</span>
          </div>

          <div className="flex items-center gap-2">
            <span>Search:</span>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Cari paket..."
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
        </div>

        {/* Tabel data */}
        {loading ? (
          <p className="text-center text-gray-500 py-5">Memuat data...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-5">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead>
                <tr className="bg-red-500 text-white text-left">
                  <th className="px-3 py-2 border">No</th>
                  <th className="px-3 py-2 border">Nama</th>
                  <th className="px-3 py-2 border">Tipe</th>
                  <th className="px-3 py-2 border">Harga</th>
                  <th className="px-3 py-2 border">Bulan</th>
                  <th className="px-3 py-2 border">Status</th>
                  <th className="px-3 py-2 border">Opsi</th>
                </tr>
              </thead>
              <tbody>
                {itemsToShow.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-3 text-gray-500">
                      Tidak ada data ditemukan.
                    </td>
                  </tr>
                ) : (
                  itemsToShow.map((item, i) => (
                    <tr
                      key={item.id}
                      className="border hover:bg-gray-50 transition"
                    >
                      <td className="px-3 py-2 border">{startIndex + i + 1}</td>
                      <td className="px-3 py-2 border">{item.nama}</td>
                      <td className="px-3 py-2 border">{item.tipe}</td>
                      <td className="px-3 py-2 border">
                        Rp {item.harga?.toLocaleString("id-ID")}
                      </td>
                      <td className="px-3 py-2 border">{item.bulan} Bulan</td>
                      <td className="px-3 py-2 border">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" checked={item.status === "Aktif"} readOnly />
                          <span>{item.status}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2 border flex gap-2">
                        <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded">
                          <Pencil size={14} /> Ubah
                        </button>
                        <button className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded">
                          <Trash2 size={14} /> Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination bawah */}
        {!loading && !error && total > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm mt-3 gap-3">
            <p>
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsToShow.length, total)} of {total} entries
            </p>

            <div className="flex gap-1">
              <button
                onClick={() => goToPage(1)}
                disabled={current === 1}
                className="px-2 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(Math.max(0, current - 3), Math.min(totalPages, current + 2))
                .map((p) => (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`px-2 py-1 border rounded ${
                      p === current
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    {p}
                  </button>
                ))}

              <button
                onClick={() => goToPage(totalPages)}
                disabled={current === totalPages}
                className="px-2 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
