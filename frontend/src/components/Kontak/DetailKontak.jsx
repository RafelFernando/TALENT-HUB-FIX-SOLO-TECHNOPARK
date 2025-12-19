import React, { useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Youtube,
  Linkedin,
  Facebook,
} from "react-feather";
import AOS from "aos";
import "aos/dist/aos.css";

export default function DetailKontak() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // durasi animasi (1 detik)
      once: true, // animasi hanya muncul sekali
      offset: 120, // jarak sebelum animasi aktif
    });
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-10 mt-[150px] px-10 mx-auto mb-7">
      {/* MAP */}
      <div
        className="w-full md:w-1/2 h-[400px] rounded-xl overflow-hidden shadow-lg"
        data-aos="fade-right"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.1733991957985!2d110.85129157404577!3d-7.55606387460977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a16e2b5ffa643%3A0xa0bf36ec85b94dfb!2sSolo%20Techno%20Park!5e0!3m2!1sen!2sid!4v1761790895120!5m2!1sen!2sid"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lokasi Solo Technopark"
        ></iframe>
      </div>

      {/* INFORMASI KONTAK */}
      <div
        className="w-full md:w-1/2 space-y-4"
        data-aos="fade-left"
        data-aos-delay="200"
      >
        <h4
          className="text-[#193F7A] text-3xl font-bold mb-5"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          Hubungi Kami
        </h4>

        <p
          className="flex items-start gap-3 text-gray-700 leading-relaxed text-xl mb-6"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <MapPin className="w-7 h-7 flex-shrink-0 mt-1 text-blue-800" />
          Kawasan Sains dan Teknologi - Solo Technopark, <br />
          Jl. Ki Hajar Dewantara No.19, Jebres, Kec. Jebres, <br />
          Kota Surakarta, Jawa Tengah 57126
        </p>

        <p
          className="flex items-center gap-3 text-gray-700 text-xl mb-6"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <Phone className="w-7 h-7 text-blue-800" /> (0271) 666628
        </p>

        <p
          className="flex items-center gap-3 text-gray-700 text-xl mb-6"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <Mail className="w-7 h-7 text-blue-800" /> info@solotechnopark.id
        </p>
      </div>
    </div>
  );
}
