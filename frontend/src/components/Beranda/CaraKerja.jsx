import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { FileText, Users, CheckSquare } from "react-feather";

export default function CaraKerja() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <div className="py-24 px-10 bg-white text-center">
      {/* Judul */}
      <div className="mb-16" data-aos="fade-up">
        <h1 className="text-4xl font-bold text-black mb-2">
          Cara Kerja Talent Hub
        </h1>

        <p className="text-lg text-black">
          Hubungkan talenta terbaik dengan peluang kerja dalam tiga langkah
          mudah, cepat, dan efisien.
        </p>
      </div>

      {/* Steps */}
      <div className="grid md:grid-cols-3 gap-12">
        {/* Step 1 */}
        <div className="relative p-6 text-center" data-aos="zoom-in" data-aos-delay="100">
          <span className="text-5xl font-bold text-yellow-600 absolute -top-6 left-1/2 -translate-x-1/2">
            01
          </span>
          <div className="w-28 h-28 mx-auto mb-6 flex items-center justify-center outline-blue-900 clip-hex">
            <FileText className="w-12 h-12 text-blue-900" strokeWidth={1.2} />
          </div>
          <h3 className="text-xl font-bold text-blue-900 mb-2">
            Daftar & Buat Profil
          </h3>
          <p className="text-black">
            Buat akun sebagai pencari kerja atau perusahaan, lalu lengkapi
            profil dengan informasi dan keahlian.
          </p>
        </div>

        {/* Step 2 */}
        <div className="relative p-6 text-center" data-aos="zoom-in" data-aos-delay="200">
          <span className="text-5xl font-bold text-yellow-600 absolute -top-6 left-1/2 -translate-x-1/2">
            02
          </span>
          <div className="w-28 h-28 mx-auto mb-6 flex items-center justify-center outline-blue-900 clip-hex">
            <Users className="w-12 h-12 text-blue-900" strokeWidth={1.2} />
          </div>
          <h3 className="text-xl font-bold text-blue-900 mb-2">
            Jelajahi & Pilih Peluang
          </h3>
          <p className="text-black">
            Cari lowongan atau kandidat sesuai kebutuhan menggunakan filter
            cerdas.
          </p>
        </div>

        {/* Step 3 */}
        <div className="relative p-6 text-center" data-aos="zoom-in" data-aos-delay="300">
          <span className="text-5xl font-bold text-yellow-600 absolute -top-6 left-1/2 -translate-x-1/2">
            03
          </span>
          <div className="w-28 h-28 mx-auto mb-6 flex items-center justify-center outline-blue-900 clip-hex">
            <CheckSquare className="w-12 h-12 text-blue-900" strokeWidth={1.2} />
          </div>
          <h3 className="text-xl font-bold text-blue-900 mb-2">
            Terhubung & Rekrut
          </h3>
          <p className="text-black">
            Kirim lamaran atau undangan, lanjutkan ke proses seleksi hingga
            penawaran kerja.
          </p>
        </div>
      </div>
    </div>
  );
}
