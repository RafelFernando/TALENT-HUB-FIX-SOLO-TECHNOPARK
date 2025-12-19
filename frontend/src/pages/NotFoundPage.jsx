import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Konten 404 */}
      <div className="flex flex-col md:flex-row items-center justify-center flex-grow px-6 py-20 gap-12 md:gap-20">
        
        {/* Gambar ilustrasi */}
        <div
          className="w-full md:w-1/2 flex justify-center"
          data-aos="fade-right"
          data-aos-duration="800"
        >
          <img
            src="/404.png"
            alt="404 Not Found"
            className="w-full max-w-lg transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Teks */}
        <div
          className="w-full md:w-1/2 text-center md:text-left"
          data-aos="fade-left"
          data-aos-duration="800"
        >
          <h1 className="text-[100px] md:text-[120px] font-extrabold text-[#193F7A] leading-none mb-3">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-lg mb-8">
            Maaf, halaman yang kamu cari tidak tersedia atau telah dipindahkan.
            Yuk kembali ke beranda dan lanjutkan menjelajah!
          </p>

          <button
            onClick={() => navigate("/")}
            className="bg-[#193F7A] text-white px-8 py-3 rounded-xl text-lg hover:bg-[#1450a1] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
