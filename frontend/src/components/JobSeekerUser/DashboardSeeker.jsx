import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell
} from "recharts";

export default function DashboardSeeker() {
  const [totalApplications, setTotalApplications] = useState(0);
  const [totalSavedJob, setTotalSavedJob] = useState(0);

  const getTotalApplications = async () => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) return;

      const user = JSON.parse(userData);
      const userId = user.user_id;

      const response = await fetch(
        `http://localhost:3000/talenthub/api/v1/job_applications/candidate/${userId}`
      );

      const result = await response.json();

      if (Array.isArray(result.payload.data)) {
        setTotalApplications(result.payload.data.length);
      }
    } catch (error) {
      console.error("Gagal mengambil total aplikasi:", error);
    }
  };

  const getTotalSavedJob = async () => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) return;

      const user = JSON.parse(userData);
      const userId = user.user_id;

      const response = await fetch(
        `http://localhost:3000/talenthub/api/v1/saved_jobs/user/${userId}`
      );

      const result = await response.json();

      if (Array.isArray(result.payload.data)) {
        setTotalSavedJob(result.payload.data.length);
      }
    } catch (error) {
      console.error("Gagal mengambil total pekerjaan disimpan:", error);
    }
  };

  // Data untuk grafik - DIPERBARUI menjadi 12 bulan
  const chartData = [
    { name: "Jan", value: 7 },
    { name: "Feb", value: 12 },
    { name: "Mar", value: 8 },
    { name: "Apr", value: 15 },
    { name: "Mei", value: 10 },
    { name: "Jun", value: 18 },
    { name: "Jul", value: 14 },
    { name: "Agu", value: 20 },
    { name: "Sep", value: 16 },
    { name: "Okt", value: 22 },
    { name: "Nov", value: 19 },
    { name: "Des", value: 25 }
  ];

  // Warna untuk grafik - DIPERBARUI untuk 12 bulan
  const chartColors = [
    "#193F7A"
  ];

  // State untuk animasi counter
  const [counters, setCounters] = useState({
    jobs: 0,
    companies: 0,
    success: 0
  });

  // Animasi counter
  useEffect(() => {
    getTotalApplications();
    getTotalSavedJob();

    const duration = 1000; // 1 detik
    const steps = 60;
    const interval = duration / steps;

    const targetValues = {
      jobs: 1250,
      companies: 340,
      success: 89
    };

    const timers = Object.keys(targetValues).map(key => {
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3); // Easing function

        setCounters(prev => ({
          ...prev,
          [key]: Math.round(targetValues[key] * easeOut)
        }));

        if (step === steps) {
          clearInterval(timer);
        }
      }, interval);

      return timer;
    });

    return () => timers.forEach(timer => clearInterval(timer));
  }, []);

  return (
    <div className="p-1 sm:p-1 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Hero Banner yang Diperbaiki - Desain Modern */}
      <div className="relative overflow-hidden rounded-2xl mb-10 group">
        {/* Background dengan gradien dan pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 z-0">
          {/* Pattern dots */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
            <div className="absolute top-40 right-20 w-32 h-32 bg-yellow-300 rounded-full"></div>
            <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-300 rounded-full"></div>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between min-h-[300px]">
          {/* Left Content */}
          <div className="lg:w-1/2 text-white mb-8 lg:mb-0">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Temukan <span className="text-yellow-300">Karir Impian</span> Anda
            </h2>

            <p className="text-blue-100 text-lg mb-8 max-w-2xl">
              Bergabunglah dengan ribuan profesional yang telah menemukan pekerjaan
              yang mereka cintai. Akses lowongan eksklusif dari perusahaan terkemuka.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-300 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                Cari Lowongan Sekarang
              </button>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="lg:w-2/5 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
            <h3 className="text-white text-xl font-bold mb-6 text-center">Statistik Platform</h3>

            <div className="space-y-4">
              {/* Stat 1 */}
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/30 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-blue-100 text-sm">Lowongan Tersedia</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold text-white">{counters.jobs}</span>
                      <span className="text-green-300 text-sm">+124 minggu ini</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-500/30 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-blue-100 text-sm">Perusahaan</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold text-white">{counters.companies}</span>
                      <span className="text-blue-300 text-sm">+18 baru</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/30 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-blue-100 text-sm">Tingkat Kesuksesan</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold text-white">{counters.success}%</span>
                      <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-400 rounded-full transition-all duration-1000"
                          style={{ width: `${counters.success}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-6 right-6 bg-yellow-400 text-gray-900 text-xs font-bold px-4 py-2 rounded-full z-20 shadow-lg animate-bounce">
          🔥 HOT OPPORTUNITIES
        </div>
      </div>

      {/* Statistik Cards dengan desain lebih menarik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {/* Card Aplikasi */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-blue-600 transform transition-all hover:-translate-y-1 hover:shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Aplikasi</p>
              <h2 className="text-3xl font-bold text-gray-800"> {totalApplications}</h2>
              <p className="text-xs text-green-600 font-medium mt-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                +2 dari bulan lalu
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl">
              <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Card Pekerjaan Disimpan */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-green-600 transform transition-all hover:-translate-y-1 hover:shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Pekerjaan Disimpan</p>
              <h2 className="text-3xl font-bold text-gray-800">{ totalSavedJob }</h2>
              <p className="text-xs text-green-600 font-medium mt-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                +5 dari bulan lalu
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-xl">
              <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Card Laporan */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-sky-500 transform transition-all hover:-translate-y-1 hover:shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Laporan</p>
              <h2 className="text-3xl font-bold text-gray-800">15</h2>
              <p className="text-xs text-blue-600 font-medium mt-2">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
                +3 dari minggu lalu
              </p>
            </div>
            <div className="p-3 bg-sky-50 rounded-xl">
              <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-sky-500 to-sky-600 rounded-lg text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Card Pengunjung */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-yellow-500 transform transition-all hover:-translate-y-1 hover:shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Pengunjung</p>
              <h2 className="text-3xl font-bold text-gray-800">2,500</h2>
              <p className="text-xs text-yellow-600 font-medium mt-2">
                <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mr-1"></span>
                +500 dari bulan lalu
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-xl">
              <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grafik dengan desain modern - DIUBAH menjadi 12 bulan */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Statistik Aktivitas Tahunan 2024</h3>
            <p className="text-gray-600 text-sm">Ringkasan aplikasi pekerjaan Januari - Desember 2024</p>
          </div>
          <div className="flex space-x-2 mt-3 sm:mt-0">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm text-gray-700">Aplikasi</span>
            </div>
          </div>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '10px',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [`${value} Aplikasi`, "Jumlah"]}
                labelFormatter={(label) => `Bulan: ${label}`}
              />
              <Bar
                dataKey="value"
                radius={[4, 4, 0, 0]}
                barSize={32}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Dekorasi latar belakang */}
      <div className="fixed bottom-0 left-0 w-64 h-64 bg-blue-200 rounded-full -translate-x-1/2 translate-y-1/2 opacity-20 -z-10"></div>
      <div className="fixed top-0 right-0 w-96 h-96 bg-yellow-100 rounded-full translate-x-1/3 -translate-y-1/3 opacity-20 -z-10"></div>
    </div>
  );
}