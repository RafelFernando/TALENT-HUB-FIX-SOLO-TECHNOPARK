import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import {
  Briefcase,
  Users,
  FileText,
  Eye,
} from "lucide-react";
import axios from "axios";

export default function DashboardAdmin() {
  const [totalJobPost, setTotalJobPost] = useState(0);

  const getTotalJobPost = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/talenthub/api/v1/job_posts"
      );

      const jobpost = response.data.payload.data;

      if (Array.isArray(jobpost)) {
        setTotalJobPost(jobpost.length);
      }
    } catch (error) {
      console.error("Gagal mengambil total job posting:", error);
    }
  };

  const [totalJobs, setTotalJobs] = useState(0);

  useEffect(() => {
    getTotalJobPost();
    fetch("http://localhost:5000/api/talenthub/jobs")
      .then((res) => res.json())
      .then((data) => {
        if (data.jobs) setTotalJobs(data.jobs.length);
      })
      .catch((err) => console.log("Error fetch jobs:", err));
  }, []);

  // Modern 12-month chart dataset
  const data = [
    { bulan: "Jan", jumlah: 10 },
    { bulan: "Feb", jumlah: 8 },
    { bulan: "Mar", jumlah: 15 },
    { bulan: "Apr", jumlah: 20 },
    { bulan: "Mei", jumlah: 18 },
    { bulan: "Jun", jumlah: 25 },
    { bulan: "Jul", jumlah: 22 },
    { bulan: "Agu", jumlah: 30 },
    { bulan: "Sep", jumlah: 27 },
    { bulan: "Okt", jumlah: 14 },
    { bulan: "Nov", jumlah: 16 },
    { bulan: "Des", jumlah: 12 },
  ];

  const MONTHS = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const stats = [
    {
      title: "JOB PROVIDER",
      value: 7,
      color: "from-blue-500 to-blue-700",
      icon: <Briefcase size={28} />,
    },
    {
      title: "JOB SEEKER",
      value: 25,
      color: "from-green-400 to-green-600",
      icon: <Users size={28} />,
    },
    {
      title: "JOB POSTING",
      value: totalJobPost,
      color: "from-sky-400 to-sky-600",
      icon: <FileText size={28} />,
    },
    {
      title: "VISITOR",
      value: 2500,
      color: "from-yellow-300 to-yellow-500",
      icon: <Eye size={28} />,
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-200">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <h1 className="text-4xl font-extrabold text-blue-900 drop-shadow-sm">
          Dashboard Admin
        </h1>
        <p className="mt-2 text-gray-700 text-lg">
          Statistik real-time & monitoring aktivitas sistem
        </p>
      </motion.div>

      {/* STATISTIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">

        {stats.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.25 }}
            className="p-4 rounded-2xl bg-white/60 backdrop-blur-md 
                      border border-gray-200 shadow-sm 
                      hover:shadow-xl hover:bg-white/80 
                      transition-all duration-300 cursor-pointer group 
                      flex items-center justify-between gap-4"
          >

            {/* LEFT SIDE — TITLE + VALUE */}
            <div className="flex flex-col">
              <p className="text-xs font-semibold text-gray-500 tracking-wide">
                {item.title}
              </p>
              <h2 className="text-3xl font-bold text-gray-800 mt-1 group-hover:text-blue-900 transition">
                {item.value}
              </h2>
            </div>

            {/* RIGHT SIDE — ICON */}
            <div
              className={`min-w-12 min-h-12 flex items-center justify-center 
                          rounded-xl bg-gradient-to-br ${item.color} 
                          text-white shadow-md group-hover:brightness-110 transition`}
            >
              {React.cloneElement(item.icon, { size: 24 })}
            </div>

          </motion.div>
        ))}

      </div>


      {/* CHART PANEL */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 
                   border border-white"
      >
        {/* Chart Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-blue-900">
            Grafik Pengunjung per Bulan (12 Bulan)
          </h2>

          <div className="flex gap-3">
            <select className="px-4 py-2 rounded-xl border bg-white shadow-sm text-sm focus:ring-2 focus:ring-blue-500">
              {MONTHS.map((b, i) => <option key={i}>{b}</option>)}
            </select>

            <select className="px-4 py-2 rounded-xl border bg-white shadow-sm text-sm focus:ring-2 focus:ring-blue-500">
              <option>2025</option>
            </select>

            <button className="px-6 py-2 bg-blue-900 text-white rounded-xl shadow hover:bg-blue-700 transition">
              Tampilkan
            </button>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[750px]">
            <ResponsiveContainer width="100%" height={340}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="4 4" opacity={0.3} />
                <XAxis dataKey="bulan" tick={{ fontSize: 13 }} />
                <YAxis tick={{ fontSize: 13 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "15px",
                    border: "1px solid #e2e8f0",
                    padding: "10px",
                  }}
                />
                <Legend />

                {/* Gradient Fill */}
                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1E3A8A" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.3} />
                  </linearGradient>
                </defs>

                <Bar
                  dataKey="jumlah"
                  fill="url(#blueGradient)"
                  radius={[12, 12, 0, 0]}
                  style={{
                    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <button className="mt-6 px-8 py-3 bg-yellow-400 hover:bg-yellow-500 
                           text-blue-900 font-semibold rounded-xl shadow-md transition">
          Lihat Detail Per Postingan
        </button>
      </motion.div>
    </div>
  );
}