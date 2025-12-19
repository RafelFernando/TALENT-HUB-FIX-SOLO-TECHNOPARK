import React, { useState, useEffect } from "react";

export default function EditLowonganForm({ onClose, onSave, editData }) {
  const [isRange, setIsRange] = useState(false);
  const [isSecret, setIsSecret] = useState(false);
  const [deskripsi, setDeskripsi] = useState("");
  const [loading, setLoading] = useState(false);
  const [closing, setClosing] = useState(false);

  // 🔹 State untuk input lain
  const [formData, setFormData] = useState({
    nama: "",
    tanggalAkhir: "",
    kategori: "",
    jobLevel: "",
    posisi: "",
    gajiMin: "",
    gajiMax: "",
    gajiSingle: "",
    jumlahOrang: 1,
  });

  // 🔹 Isi otomatis kalau ada editData
  useEffect(() => {
    if (editData) {
      setFormData({
        nama: editData.nama || "",
        tanggalAkhir: editData.tanggalAkhir || "",
        kategori: editData.kategori || "",
        jobLevel: editData.jobLevel || "",
        posisi: editData.posisi || "",
        gajiMin: editData.gajiMin || "",
        gajiMax: editData.gajiMax || "",
        gajiSingle: editData.gajiSingle || "",
        jumlahOrang: editData.jumlahOrang || 1,
      });
      setDeskripsi(editData.deskripsi || "");
      setIsRange(!!editData.gajiMax);
      setIsSecret(editData.isSecret || false);
    }
  }, [editData]);

  // 🔹 Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle close animasi
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => onClose(), 300);
  };

  // 🔹 Submit edit
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSave?.(formData);
      handleClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background blur */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
        onClick={handleClose}
      ></div>

      {/* Modal box */}
      <div
        className={`relative bg-white w-[90%] max-w-2xl rounded-2xl shadow-2xl p-6 z-50 max-h-[90vh] overflow-y-auto transition-all duration-300 ${
          closing ? "animate-fadeOutDown" : "animate-fadeInUp"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-5 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-[#193F7A]">
            Edit Lowongan
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-red-500 font-bold text-xl cursor-pointer transition"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nama Lowongan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lowongan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Contoh: Frontend Developer ReactJS"
              className="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Tanggal Akhir */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Akhir Lowongan
            </label>
            <input
              type="date"
              name="tanggalAkhir"
              value={formData.tanggalAkhir}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategori
            </label>
            <select
              name="kategori"
              value={formData.kategori}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Pilih Kategori</option>
              <option>Administrative</option>
              <option>Design & Creative</option>
              <option>Software Engineer</option>
              <option>Customer Service</option>
              <option>Marketing</option>
            </select>
          </div>

          {/* Job Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Level
            </label>
            <select
              name="jobLevel"
              value={formData.jobLevel}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Pilih Job Level</option>
              <option>Junior</option>
              <option>Mid-Level</option>
              <option>Senior</option>
              <option>Manager</option>
            </select>
          </div>

          {/* Posisi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Posisi
            </label>
            <select
              name="posisi"
              value={formData.posisi}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Pilih Posisi</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>UI/UX Designer</option>
              <option>Customer Support</option>
            </select>
          </div>

          {/* Gaji */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gaji
            </label>
            <div className="flex items-center gap-3">
              <span className="bg-gray-100 border border-gray-300 px-3 py-2 rounded-lg text-gray-700">
                Rp
              </span>
              {isRange ? (
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  <input
                    type="number"
                    name="gajiMin"
                    value={formData.gajiMin}
                    onChange={handleChange}
                    placeholder="Minimum"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <span className="text-gray-600 text-sm text-center">s/d</span>
                  <input
                    type="number"
                    name="gajiMax"
                    value={formData.gajiMax}
                    onChange={handleChange}
                    placeholder="Maksimum"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              ) : (
                <input
                  type="number"
                  name="gajiSingle"
                  value={formData.gajiSingle}
                  onChange={handleChange}
                  placeholder="Nominal Gaji"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-3 text-sm text-gray-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isRange}
                  onChange={() => setIsRange(!isRange)}
                  className="accent-blue-600 w-4 h-4"
                />
                Range
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSecret}
                  onChange={() => setIsSecret(!isSecret)}
                  className="accent-blue-600 w-4 h-4"
                />
                Dirahasiakan
              </label>
            </div>
          </div>

          {/* Jumlah Orang */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jumlah Orang yang Dibutuhkan
            </label>
            <input
              type="number"
              name="jumlahOrang"
              value={formData.jumlahOrang}
              onChange={handleChange}
              min="1"
              className="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi
            </label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Tuliskan detail pekerjaan..."
              rows="5"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            ></textarea>
          </div>

          {/* Tombol Simpan */}
          <div className="flex justify-end gap-3 pt-4 border-t mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#193F7A] hover:bg-blue-800 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition cursor-pointer shadow-md hover:shadow-lg"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                  Menyimpan...
                </>
              ) : (
                "Simpan Perubahan"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* 🔹 Animasi CSS */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOutDown {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(30px); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.35s ease forwards;
        }
        .animate-fadeOutDown {
          animation: fadeOutDown 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
}
