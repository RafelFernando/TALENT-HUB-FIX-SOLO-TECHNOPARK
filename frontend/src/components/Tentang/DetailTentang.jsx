import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function DetailTentang() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // durasi animasi 1 detik
      once: true, // animasi hanya muncul sekali
      offset: 120, // jarak sebelum animasi aktif
    });
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-[80%] mx-auto mt-[150px] mb-8 gap-10">
      
      {/* Bagian teks */}
      <div
        className="flex-[1] description text-center md:text-left"
        data-aos="fade-right"
      >
        <span className="text-gray-600 uppercase tracking-wide">Tentang Kami</span>
        <h1 className="text-7xl font-bold text-[#193F7A] my-4">Talent Hub</h1>
        <span className="text-gray-700 leading-relaxed">
          Pusat Inovasi dan Vokasi yang Memadukan Unsur Pengembangan Iptek, Kebutuhan Pasar, Industri dan Bisnis
          Untuk Penguatan Daya Saing Daerah
        </span>
      </div>

      {/* Bagian gambar */}
      <div
        className="flex-[0.9] image flex justify-center md:justify-end"
        data-aos="fade-left"
      >
        <img
          src="/Foto-Web.png"
          alt="Tentang Talent Hub"
          className="w-full max-w-lg rounded-2xl"
        />
      </div>

    </div>
  );
}
