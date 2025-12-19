import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Rocket, Users, BookOpen, Target } from "lucide-react";

export default function Header() {
  const [counts, setCounts] = useState({
    participants: 0,
    programs: 0,
    mentors: 0,
    successRate: 0
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
    AOS.refresh();
  }, []);

  useEffect(() => {
    // Simulasi live count animation
    const timer = setTimeout(() => {
      setCounts({
        participants: 12543,
        programs: 89,
        mentors: 246,
        successRate: 94
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-white via-blue-50 to-white font-dancing mt-[70px]">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 right-1/3 w-80 h-80 bg-yellow-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative flex flex-col md:flex-row w-full min-h-screen max-w-10xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Bagian Teks */}
        <div
          className="flex flex-col flex-1 md:w-3/5 py-10 md:py-20 order-1 font-dancing"
          data-aos="fade-right"
        >
          {/* BADGE dengan desain modern */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg px-5 py-2.5 rounded-full w-fit mb-8 border-0 group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 center">
            <span className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold tracking-wide">
              Solo Technopark Innovation Hub
            </span>
            <Rocket className="w-4 h-4 ml-1 group-hover:rotate-12 transition-transform" />
          </div>

          {/* HEADING dengan gradient modern */}
          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-tight text-neutral-900 md:text-left text-center">
            Mulai Langkah Karir Anda
            <br className="hidden md:block" />
            Bersama{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 bg-clip-text text-transparent">
                Talent Hub
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-yellow-300/30 -skew-x-6 rounded-lg"></span>
            </span>
          </h1>

          {/* SUB-HEADING */}
          <p className="text-gray-700 mt-6 max-w-2xl text-lg md:text-xl leading-relaxed md:text-left text-center font-medium">
            Platform lengkap untuk mendapatkan <span className="text-blue-700 font-semibold">pelatihan profesional</span>, 
            <span className="text-blue-700 font-semibold"> peluang kerja</span>, dan 
            <span className="text-blue-700 font-semibold"> mentoring eksklusif</span> guna meningkatkan kompetensi di era digital dan industri kreatif.
          </p>

          {/* Quick Live Count Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12 md:mt-16">
            <div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-5 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-5 h-5 text-blue-700" />
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-blue-900">
                    {counts.participants.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Peserta</div>
                </div>
              </div>
            </div>

            <div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-5 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <BookOpen className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-blue-900">
                    {counts.programs}+
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Program</div>
                </div>
              </div>
            </div>

            <div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-5 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-5 h-5 text-blue-700" />
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-blue-900">
                    {counts.mentors}+
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Mentor</div>
                </div>
              </div>
            </div>

            <div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-5 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Target className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-blue-900">
                    {counts.successRate}%
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Sukses</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bagian Gambar */}
        <div
          className="flex w-full md:w-2/5 relative order-2 items-center justify-center"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <div className="relative w-full max-w-lg">
            {/* Floating decorative elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-yellow-400/10 rounded-full border-2 border-yellow-300/30 animate-float"></div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-400/10 rounded-full border-2 border-blue-300/30 animate-float animation-delay-1000"></div>
            <div className="absolute top-1/2 -right-8 w-16 h-16 bg-yellow-500/10 rounded-lg rotate-45 border border-yellow-400/20 animate-float animation-delay-2000"></div>
            
            {/* Main image container */}
            <div className="relative z-10 bg-gradient-to-br from-blue-50 to-white rounded-3xl p-6 shadow-2xl border border-blue-100/50 backdrop-blur-sm">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-yellow-400 rounded-3xl blur opacity-20"></div>
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-inner">
                <img
                  className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                  src="/header-image.png"
                  alt="Talent Hub Platform"
                />
                {/* Image overlay gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/10 to-transparent"></div>
              </div>
              
              {/* Floating tag on image */}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-full shadow-lg font-semibold text-sm whitespace-nowrap flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                Bergabung Sekarang!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom styles untuk animasi */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}