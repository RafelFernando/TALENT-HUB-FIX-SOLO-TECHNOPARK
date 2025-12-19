import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Youtube,
  Linkedin,
  Facebook,
} from "react-feather";

export default function Footer() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  // Refresh ulang AOS setiap kali pindah halaman
  useEffect(() => {
    AOS.refreshHard(); // lebih kuat dari refresh biasa
  }, [location]);

  return (
    <footer className="bg-white border-t border-gray-200 px-6 md:px-12 py-12 font-sans">
      {/* Konten utama */}
      <div className="flex flex-col md:flex-row justify-between gap-12 mb-8">
        {/* Kiri */}
        <div className="flex-1" data-aos="fade-up">
          <img
            src="/logo-stp.png"
            alt="Solo Technopark"
            className="w-48 mb-4"
          />
          <p className="font-medium text-gray-800">
            Menuju kawasan Solo Technopark yang <br />
            inovatif dan berdaya saing internasional
          </p>
        </div>

        {/* Tengah */}
        <div className="flex-1" data-aos="fade-up" data-aos-delay="100">
          <h4 className="text-[#193F7A] font-semibold mb-3">Platform Kami</h4>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link
                to="/etraining"
                className="hover:text-[#D9A91A] transition-colors duration-300"
              >
                e-Training
              </Link>
            </li>
            <li>
              <Link
                to="/talenthub"
                className="hover:text-[#D9A91A] transition-colors duration-300"
              >
                Talent Hub
              </Link>
            </li>
            <li>
              <Link
                to="/ecommerce"
                className="hover:text-[#D9A91A] transition-colors duration-300"
              >
                e-Commerce
              </Link>
            </li>
            <li>
              <Link
                to="/metaverse"
                className="hover:text-[#D9A91A] transition-colors duration-300"
              >
                Metaverse
              </Link>
            </li>
          </ul>
        </div>

        {/* Kanan */}
        <div className="flex-1" data-aos="fade-up" data-aos-delay="200">
          <h4 className="text-[#193F7A] font-semibold mb-3">Hubungi Kami</h4>
          <p className="flex items-start gap-2 text-gray-700 leading-relaxed">
            <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
            Kawasan Sains dan Teknologi - Solo Technopark, <br />
            Jl. Ki Hajar Dewantara No.19, Jebres, Kec. Jebres, <br />
            Kota Surakarta, Jawa Tengah 57126
          </p>
          <p className="flex items-center gap-2 text-gray-700 mt-3">
            <Phone className="w-5 h-5" /> (+62) 271 666662
          </p>
          <p className="flex items-center gap-2 text-gray-700 mt-3">
            <Mail className="w-5 h-5" /> info.solotechnopark@gmail.com
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div
        className="w-full bg-[#E8ECF2] border-t border-gray-300 py-4 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-[#193F7A] text-sm relative z-10"
      >
        <p
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-anchor-placement="top-bottom"
          className="text-center md:text-left"
        >
          Copyright © 2025 | Solo Technopark • Design & Developed by IT Solo
          Technopark
        </p>

        <div
          className="flex gap-4 mt-4 md:mt-0"
          data-aos="fade-up"
          data-aos-delay="400"
          data-aos-anchor-placement="top-bottom"
        >
          <a
            href="#"
            className="text-[#193F7A] hover:text-[#D9A91A] transition"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="text-[#193F7A] hover:text-[#D9A91A] transition"
          >
            <Youtube className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="text-[#193F7A] hover:text-[#D9A91A] transition"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="text-[#193F7A] hover:text-[#D9A91A] transition"
          >
            <Facebook className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
