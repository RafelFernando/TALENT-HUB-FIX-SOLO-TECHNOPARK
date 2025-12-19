// src/components/admin/AdminSidebar.jsx
import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Bell,
  Flag,
  LogOut,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Settings,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/Admin/Dashboard", icon: <LayoutDashboard /> },
    { name: "Data Pengguna", path: "/admin/JobSeeker", icon: <Users /> },
    { name: "Job Posting", path: "/admin/JobPosting", icon: <FileText /> },
    // { name: "Fitur Premium", path: "/admin/FiturPremium", icon: <Flag /> },
    { name: "Notifikasi", path: "/admin/Notifikasi", icon: <Bell /> },
    { name: "Report", path: "/admin/ReportAdmin", icon: <FileText /> },
    // { name: "Laporan User", path: "/admin/LaporanUser", icon: <Users /> },
  ];

  const settingSubmenu = [
    { name: "Agama", path: "/Admin/Agama"},
    { name: "Pendidikan", path: "/Admin/Pendidikan"},
    { name: "Kategori Pekerjaan", path: "/Admin/JobKategori"},
    { name: "Review Karir", path: "/Admin/ReviewKarir"},
    { name: "Syarat dan Ketentuan", path: "/Seeker/SyaratKetentuan" },
    { name: "Kebijakan Privasi", path: "/Seeker/KebijakanPrivasi" },
  ];

  return (
    <div
      className={`${isOpen ? "w-64" : "w-20"} bg-[#193F7A] text-white min-h-screen flex flex-col transition-all duration-300 shadow-lg`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-blue-600">
        {isOpen && <h2 className="font-bold text-lg">Admin Panel</h2>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-[#1f4b91] transition"
        >
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>

      {/* Menu Utama */}
      <div className="flex flex-col mt-4 space-y-1">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center gap-3 px-5 py-3 rounded-md mx-2 transition-all duration-200 ${
              location.pathname === item.path
                ? "bg-white text-[#193F7A] font-semibold shadow-md"
                : "text-gray-200 hover:bg-[#1f4b91]"
            }`}
          >
            <div className="text-lg">{item.icon}</div>
            <span className={`${!isOpen && "hidden"} text-sm`}>
              {item.name}
            </span>
          </Link>
        ))}

        {/* ===== Setting Dropdown (SAMA SEPERTI PROVIDER) ===== */}
        <div className="mx-2">
          <button
            onClick={() => setIsSettingOpen(!isSettingOpen)}
            className={`flex items-center justify-between w-full px-5 py-3 rounded-md transition-all duration-200 ${
              isSettingOpen
                ? "bg-[#E84118] text-white"
                : "text-gray-200 hover:bg-[#1f4b91]"
            }`}
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5" />
              {isOpen && <span className="text-sm">Pengaturan</span>}
            </div>

            {isOpen &&
              (isSettingOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              ))}
          </button>

          {/* Submenu */}
          {isSettingOpen && isOpen && (
            <div className="bg-white text-gray-700 rounded-md mt-1 py-2 shadow-inner animate-fadeIn">
              {settingSubmenu.map((sub, i) => (
                <Link
                  key={i}
                  to={sub.path}
                  className={`block px-6 py-2 text-sm hover:bg-gray-100 ${
                    location.pathname === sub.path
                      ? "font-semibold text-[#E84118]"
                      : ""
                  }`}
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
