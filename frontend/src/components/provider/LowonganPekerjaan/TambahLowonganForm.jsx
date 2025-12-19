import React, { useState } from "react";

export default function TambahLowonganForm({ onClose, onSave }) {
  const [isRange, setIsRange] = useState(false);
  const [isSecret, setIsSecret] = useState(false);
  const [deskripsi, setDeskripsi] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSave?.();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background blur */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
        onClick={onClose}
      ></div>

      {/* Modal scrollable */}
      <div className="relative bg-white w-[90%] max-w-2xl rounded-2xl shadow-2xl p-6 z-50 animate-fadeInUp max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-5 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-[#193F7A]">
            Tambah Lowongan
          </h2>
          <button
            onClick={onClose}
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
              placeholder="Contoh: Frontend Developer ReactJS"
              className="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Tanggal Akhir Lowongan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Akhir Lowongan
            </label>
            <input
              type="date"
              className="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategori
            </label>
            <select className="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none">
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
            <select className="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none">
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
            <select className="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none">
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
                    placeholder="Minimum"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <span className="text-gray-600 text-sm text-center">s/d</span>
                  <input
                    type="number"
                    placeholder="Maksimum"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              ) : (
                <input
                  type="number"
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
              min="1"
              defaultValue="1"
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
              onClick={onClose}
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
                "Posting Lowongan"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Animasi */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.35s ease forwards;
        }
      `}</style>
    </div>
  );
}
