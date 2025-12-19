import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";

export default function KarirList() {
  const scrollRef = useRef(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data awal
  const getReviews = () => {
    setLoading(true);
    fetch("http://localhost:3000/talenthub/api/v1/review_karir")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.payload.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Gagal fetch review:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getReviews();
  }, []);

  // Fungsi untuk mengubah URL gambar
  const getImageUrl = (gambar) => {
    return `http://localhost:3000/uploads/reviews/${gambar}`;
  };


  const nextSlide = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  const prevSlide = () => {
    scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  return (
    <div className="m-4 md:m-10">
      {/* Header */}
      <div className="header flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-3xl font-bold text-black leading-snug mb-4">
            5.000+ Karir Tercapai Melalui TalentHub
          </h1>
          <p className="text-[16px] mt-3 font-normal">
            Kalau ribuan talenta bisa temukan kerja lewat Talent Hub, kamu juga bisa!
          </p>
        </div>

        <div className="button-geser flex gap-3">
          <button
            onClick={prevSlide}
            className="border-[1px] text-[#193F7A] p-2 rounded-full hover:bg-yellow-500 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="border-[1px] text-[#193F7A] p-2 rounded-full hover:bg-yellow-500 transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {loading && <p className="mt-6 text-gray-600">Memuat data...</p>}

      {/* List Review */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth mt-6 gap-4 pb-4 no-scrollbar"
      >
        {!loading &&
          reviews.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-[300px] p-2 rounded-2xl">
              <div className="h-full w-full bg-gradient-to-b from-white/80 via-gray-100/70 to-blue-900/80 flex flex-col rounded-2xl border border-gray-400 shadow-lg">

                {/* Gambar */}
                <div className="w-full h-[240px] flex items-center justify-center relative">
                  <img
                    src={getImageUrl(item.gambar)}
                    alt={item.nama}
                    className="h-full w-auto object-cover rounded-lg"
                  />

                </div>

                {/* Teks */}
                <div className="bg-gradient-to-b from-[#193F7A99] to-[#0E234399] rounded-b-2xl p-3 min-h-[145px] flex flex-col space-y-1">
                  <p className="text-white text-[1.2rem] font-semibold">
                    {item.nama} | {item.pekerjaan}
                  </p>
                  <p className="text-white text-[1rem] leading-tight">
                    {item.komentar}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
