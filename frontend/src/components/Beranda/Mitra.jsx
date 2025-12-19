import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowUpRight } from "react-feather";

export default function Mitra() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <div className="w-full text-center py-16 bg-white mt-8">
      {/* Judul */}
      <h2
        className="text-2xl md:text-3xl font- text-black leading-snug mb-4"
        data-aos="fade-up"
      >
        Bangun Karir Bersama <br /> Mitra Unggulan & Terpercaya
      </h2>

      <p
        className="text-base md:text-lg text-black mb-10 max-w-2xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Temukan pekerjaan dari perusahaan yang berkomitmen membentuk talenta
        berdaya saing global.bold
      </p>

      {/* Logo Mitra */}
      <div
        className="flex flex-wrap justify-center gap-6 mb-10"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        <div className="bg-gray-100 rounded-xl shadow-md p-5 w-48 h-28 flex items-center justify-center">
          <img src="/logo-stp.png" alt="Solo Technopark" className="max-h-full" />
        </div>
        <div className="bg-gray-100 rounded-xl shadow-md p-5 w-48 h-28 flex items-center justify-center">
          <img src="/logo-pemkot-surakarta.png" alt="Pemkot Surakarta" className="max-h-full" />
        </div>
        <div className="bg-gray-100 rounded-xl shadow-md p-5 w-48 h-28 flex items-center justify-center">
          <img src="/logo-livin.jpg" alt="Livin Mandiri" className="max-h-full" />
        </div>
      </div>

      {/* Button */}
      <button
        className="px-6 py-3 bg-[#193F7A] hover:bg-[#152e5a] text-white font-medium text-sm rounded-full inline-flex items-center gap-2 transition-all duration-300"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        Jelajahi Peluangmu Sekarang
        <span className="bg-white text-[#193F7A] rounded-full p-1">
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </button>
    </div>
  );
}
