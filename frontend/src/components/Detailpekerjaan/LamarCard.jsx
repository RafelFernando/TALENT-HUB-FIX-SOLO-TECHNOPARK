import React from "react";

export default function LamarCard({ job, onClose, isOpen }) {
  if (!isOpen || !job) return null; // ✅ ini penting

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg relative animate-fadeIn">
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold mb-4 text-center">Lamar Cepat</h2>

        {/* Informasi Pekerjaan */}
        <div className="flex items-center gap-3 mb-4">
          {job.logoUrl ? (
            <img
              src={job.logoUrl}
              alt={job.perusahaan}
              className="w-12 h-12 object-contain rounded-md"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-md font-semibold text-lg">
              {job.perusahaan?.[0] ?? "?"}
            </div>
          )}
          <div>
            <p className="font-medium text-gray-800">{job.posisi || job.title}</p>
            <p className="text-sm text-gray-600">{job.perusahaan}</p>
          </div>
        </div>

        {/* Form Lamar */}
        <form className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Nama lengkap"
            className="border rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-300"
          />
          <input
            type="email"
            placeholder="Email"
            className="border rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-300"
          />
          <textarea
            placeholder="Pesan atau catatan (opsional)"
            className="border rounded-md px-3 py-2 text-sm h-24 focus:ring focus:ring-blue-300"
          ></textarea>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
          >
            Kirim Lamaran
          </button>
        </form>
      </div>
    </div>
  );
}
