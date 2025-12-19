import React, { useState } from "react";

export default function TambahJobProvider({ onClose, onSave }) {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    level: "",
    telepon: "",
    status: "active",
    photo: null,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      onSave(form);
      setLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-lg w-[80%] max-w-3xl p-6 shadow-xl relative animate-slideUp">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-lg font-semibold text-[#193F7A]">
            Tambah Provider
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-lg font-bold"
          >
            ×
          </button>
        </div>

        {/* Form Input */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Nama */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Nama Lengkap"
              className="border border-gray-300 rounded w-full px-3 py-2 text-sm"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="contoh@gmail.com"
              className="border border-gray-300 rounded w-full px-3 py-2 text-sm"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Level <span className="text-red-500">*</span>
            </label>
            <select
              className="border border-gray-300 rounded w-full px-3 py-2 text-sm"
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
            >
              <option value="">-- Pilih Level --</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="vip">VIP</option>
            </select>
          </div>

          {/* Telepon */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telepon <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="08xxx"
              className="border border-gray-300 rounded w-full px-3 py-2 text-sm"
              value={form.telepon}
              onChange={(e) => setForm({ ...form, telepon: e.target.value })}
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              className="border border-gray-300 rounded w-full px-3 py-2 text-sm"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Upload Foto */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Foto
            </label>
            <input
              type="file"
              accept="image/*"
              className="text-sm"
              onChange={(e) =>
                setForm({ ...form, photo: e.target.files[0] || null })
              }
            />
            {form.photo && (
              <p className="text-sm text-gray-500 mt-1">
                File: {form.photo.name}
              </p>
            )}
          </div>
        </div>

        {/* Tombol */}
        <div className="flex justify-end gap-3 mt-6 border-t pt-4">
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#193F7A] hover:bg-blue-800 text-white px-5 py-2 rounded flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-spin border-2 border-t-transparent border-white rounded-full w-4 h-4"></span>
                Menyimpan...
              </>
            ) : (
              "Simpan"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
