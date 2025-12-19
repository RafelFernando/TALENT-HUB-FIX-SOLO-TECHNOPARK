import React, { useEffect, useState } from "react";
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
import {
    TrendingUp,
    Users,
    FileText,
    Eye,
    Calendar,
    Filter,
    ChevronDown,
    Briefcase,
    Sparkles
} from "lucide-react";
import axios from "axios";

export default function ProviderDashboard() {
    const [totalJobPost, setTotalJobPost] = useState(0);
    const [totalApplications, setTotalApplications] = useState(0);

    const getTotalApplications = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/talenthub/api/v1/job_applications"
            );

            const applications = response.data.payload.data;

            if (Array.isArray(applications)) {
                setTotalApplications(applications.length);
            }
        } catch (error) {
            console.error("Gagal mengambil total applications:", error);
        }
    };

    const getTotalJobPost = async () => {
        try {
            const userData = localStorage.getItem("user");
            if (!userData) return;

            const user = JSON.parse(userData);
            const userId = user.user_id;

            const response = await fetch(
                `http://localhost:3000/talenthub/api/v1/job_posts/employer/${userId}`
            );

            const result = await response.json();

            if (Array.isArray(result.payload.data)) {
                setTotalJobPost(result.payload.data.length);
            }
        } catch (error) {
            console.error("Gagal mengambil total postingan:", error);
        }
    };

    useEffect(() => {
        getTotalJobPost();
        getTotalApplications();
    }, [])

    const [selectedMonth, setSelectedMonth] = useState("Oktober");
    const [selectedYear, setSelectedYear] = useState("2025");

    // Data dummy untuk grafik jumlah pelamar (Januari - Desember)
    const monthlyData = [
        { bulan: "Jan", jumlah: 8, color: "#3B82F6" },
        { bulan: "Feb", jumlah: 12, color: "#3B82F6" },
        { bulan: "Mar", jumlah: 15, color: "#3B82F6" },
        { bulan: "Apr", jumlah: 10, color: "#3B82F6" },
        { bulan: "Mei", jumlah: 18, color: "#F59E0B" },
        { bulan: "Jun", jumlah: 22, color: "#F59E0B" },
        { bulan: "Jul", jumlah: 25, color: "#F59E0B" },
        { bulan: "Agu", jumlah: 20, color: "#F59E0B" },
        { bulan: "Sep", jumlah: 16, color: "#3B82F6" },
        { bulan: "Okt", jumlah: 28, color: "#3B82F6" },
        { bulan: "Nov", jumlah: 24, color: "#3B82F6" },
        { bulan: "Des", jumlah: 30, color: "#F59E0B" },
    ];

    // Statistik cards data
    const statsCards = [
        {
            icon: Briefcase,
            title: "JOB POSTING",
            value: totalJobPost,
            color: "blue",
            gradient: "from-blue-500 to-blue-600"
        },
        {
            icon: Users,
            title: "PELAMAR",
            value: totalApplications,
            color: "green",
            gradient: "from-green-500 to-green-600"
        },
        {
            icon: FileText,
            title: "LAPORAN",
            value: "3",
            color: "yellow",
            gradient: "from-yellow-500 to-yellow-600"
        },
        {
            icon: Eye,
            title: "PENGUNJUNG",
            value: "1.240",
            color: "red",
            gradient: "from-red-500 to-red-600"
        }
    ];

    // Bulan options
    const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    // Tahun options
    const years = ["2023", "2024", "2025", "2026"];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                    <p className="font-semibold text-gray-900">{label}</p>
                    <p className="text-blue-600 font-medium">
                        {payload[0].value} Pelamar
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50/30 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Dashboard Provider
                            </h1>
                            <p className="text-gray-600">
                                Overview performa dan statistik penyedia kerja
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date().toLocaleDateString('id-ID', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</span>
                        </div>
                    </div>

                    {/* Hero Banner - Simplified */}
                    <div className="relative rounded-2xl overflow-hidden mb-8 shadow-lg">
                        {/* Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800">
                            {/* Simple Pattern */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400/20 rounded-full -translate-x-24 translate-y-24"></div>
                        </div>

                        {/* Simple Decorative Element */}
                        <div className="absolute top-4 right-4">
                            <Sparkles className="w-6 h-6 text-yellow-300" />
                        </div>

                        {/* Content - Clean and Simple */}
                        <div className="relative p-8">
                            <div className="max-w-2xl">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    Dashboard Provider
                                </h2>
                                <p className="text-blue-100 text-lg mb-6">
                                    Pantau dan kelola semua aktivitas lowongan kerja Anda dalam satu platform terpadu.
                                </p>

                                {/* Simple Stats Indicator */}
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                                    <TrendingUp className="w-4 h-4 text-yellow-300" />
                                    <span className="text-white font-medium">Performanya meningkat bulan ini</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid - Compact */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {statsCards.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                        {stat.title}
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {stat.value}
                                    </p>
                                </div>
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chart Section */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">
                                Statistik Pelamar Tahunan
                            </h2>
                            <p className="text-gray-600">
                                Jumlah pelamar per bulan tahun {selectedYear}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                            <div className="relative flex-1 sm:flex-none">
                                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <select
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    className="pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all w-full appearance-none bg-white"
                                >
                                    {months.map(month => (
                                        <option key={month} value={month}>{month}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>

                            <div className="relative flex-1 sm:flex-none">
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="pl-4 pr-10 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all w-full appearance-none bg-white"
                                >
                                    {years.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>

                            <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow transform hover:-translate-y-0.5">
                                Tampilkan
                            </button>
                        </div>
                    </div>

                    {/* Chart Container */}
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={monthlyData}
                                margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    stroke="#E5E7EB"
                                />
                                <XAxis
                                    dataKey="bulan"
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
                                    content={<CustomTooltip />}
                                    cursor={{ fill: 'transparent' }}
                                />
                                <Bar
                                    dataKey="jumlah"
                                    radius={[4, 4, 0, 0]}
                                    barSize={32}
                                >
                                    {monthlyData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                            className="hover:opacity-80 transition-opacity"
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Simple Action Button */}
                    <div className="mt-8 flex justify-end">
                        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
                            Lihat Detail Per Job Posting
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}