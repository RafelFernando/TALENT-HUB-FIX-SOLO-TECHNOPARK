import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function EditRole({ data, onClose, onSave }) {
  const [form, setForm] = useState({
    nama: data.nama || "",
    email: data.email || "",
    telepon: data.telepon || "",
    role: data.level || "",
    password: "",
    photo: null,
  });
  const [showPassword, setShowPassword] = useState(false);
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
            Edit Data Role
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

          {/* Telepon */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              No Telepon <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="08xxx"
              className="border border-gray-300 rounded w-full px-3 py-2 text-sm"
              value={form.telepon}
              onChange={(e) => setForm({ ...form, telepon: e.target.value })}
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pilih Role <span className="text-red-500">*</span>
            </label>
            <select
              className="border border-gray-300 rounded w-full px-3 py-2 text-sm"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="">-- Pilih Role --</option>
              <option value="admin">Admin Role</option>
              <option value="moderator">Moderator</option>
              <option value="superadmin">Superadmin</option>
            </select>
          </div>

          {/* Password */}
          <div className="relative sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password (Opsional)
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Kosongkan jika tidak ingin mengubah"
              className="border border-gray-300 rounded w-full px-3 py-2 text-sm pr-10"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[35px] text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Upload Photo */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Photo (Opsional)
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
              "Update"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
