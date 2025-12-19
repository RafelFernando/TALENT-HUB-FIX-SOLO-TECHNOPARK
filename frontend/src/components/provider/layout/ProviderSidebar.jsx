import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Building2,
  Flag,
  LogOut,
  MessageCircleMore,
  ChevronLeft,
  ChevronRight,
  Settings,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function ProviderSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/Provider/Dashboard", icon: <LayoutDashboard /> },
    { name: "Profile Perusahaan", path: "/Provider/ProfilPerusahaan", icon: <Building2 /> },
    { name: "Lowongan Pekerjaan", path: "/Provider/LowonganPekerjaan", icon: <Briefcase /> },
    { name: "Pelamar Pekerjaan", path: "/Provider/PelamarPekerjaan", icon: <Users /> },
  ];

  const settingSubmenu = [
    { name: "Edit Data Diri", path: "/Provider/EditDataDiri" },
    { name: "Syarat dan Ketentuan", path: "/Provider/SyaratKetentuan" },
    { name: "Kebijakan Privasi", path: "/Provider/KebijakanPrivasi" },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-[#193F7A] text-white min-h-screen flex flex-col transition-all duration-300 shadow-lg `}
    >
      {/* Header Sidebar */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-blue-600">
        {isOpen && <h2 className="font-bold text-lg">Job Provider</h2>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-[#1f4b91] transition"
        >
          {isOpen ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
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

        {/* Pengaturan dengan Dropdown */}
        <div className="mx-2">
          <button
            onClick={() => setIsSettingOpen(!isSettingOpen)}
            className={`flex items-center justify-between w-full px-5 py-3 rounded-md transition-all duration-200 ${
              isSettingOpen ? "bg-[#E84118] text-white" : "text-gray-200 hover:bg-[#1f4b91]"
            }`}
          >
            <div className="flex items-center gap-3">
              <Settings className="text-lg" />
              {isOpen && <span className="text-sm">Pengaturan</span>}
            </div>
            {isOpen && (
              isSettingOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )
            )}
          </button>

          {/* Submenu */}
          {isSettingOpen && isOpen && (
            <div className="bg-white text-gray-700 rounded-md mt-1 py-2 shadow-inner animate-fadeIn">
              {settingSubmenu.map((sub, i) => (
                <Link
                  key={i}
                  to={sub.path}
                  className={`block px-6 py-2 text-sm hover:bg-gray-100 ${
                    location.pathname === sub.path ? "font-semibold text-[#E84118]" : ""
                  }`}
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tombol Logout */}
      <div className="mt-auto mb-6 px-5">
        <button className="flex items-center gap-3 w-full py-3 px-4 rounded-md bg-[#1f4b91] hover:bg-[#163665] transition">
          <LogOut className="w-5 h-5 text-gray-100" />
          <span className={`${!isOpen && "hidden"} text-sm`}>Logout</span>
        </button>
      </div>
    </div>
  );
}
