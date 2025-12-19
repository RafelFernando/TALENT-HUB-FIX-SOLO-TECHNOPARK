// src/components/admin/AdminNavbar.jsx
import React, { useState, useEffect } from "react";
import { Bell, User, Menu, X, LogOut, LogIn, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar({ onToggleSidebar }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const adminData = localStorage.getItem("admin");

    if (token && adminData) {
      try {
        setUser(JSON.parse(adminData));
      } catch (err) {
        console.error(err);
        localStorage.removeItem("admin");
        localStorage.removeItem("admin_token");
      }
    }
  }, []);


  // Listen for storage changes (for cross-tab sync)
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (token && userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
    if (onToggleSidebar) onToggleSidebar();
  };

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin logout?")) {
      // Clear localStorage
      localStorage.removeItem("admin");
      localStorage.removeItem("admin_token");


      // Clear sessionStorage (jika ada)
      sessionStorage.removeItem("adminName");

      // Reset state
      setUser(null);
      setDropdownOpen(false);

      // Alert dan redirect
      alert("Logout berhasil!");
      navigate("/Auth/Login");
    }
  };

  const handleLogin = () => {
    navigate("/Auth/Login");
  };

  // Get user initial for avatar
  const getUserInitial = () => {
    if (!user) return "U";
    return (user.full_name || user.username || user.email || "U")
      .charAt(0)
      .toUpperCase();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest(".dropdown-container")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  return (
    <nav className="w-full bg-white shadow-md flex justify-between items-center px-4 md:px-6 py-3 sticky top-0 z-50">
      {/* LEFT: Logo + Title */}
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={handleMenuClick}
        >
          {menuOpen ? (
            <X className="w-6 h-6 text-gray-600" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600" />
          )}
        </button>

        <img
          src="/logo-stp.png"
          alt="Logo"
          className="w-16 h-8 object-contain"
        />
        <h1 className="hidden sm:block text-lg md:text-xl font-bold text-[#193F7A]">
          TalentHub Admin
        </h1>
      </div>

      {/* RIGHT: Notifikasi & Profil */}
      <div className="flex items-center gap-4 md:gap-6 relative">
        {/* Notifikasi */}

        {/* Kondisi login */}
        {user ? (
          <div className="relative dropdown-container">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
            >
              {/* Avatar with Initial */}
              <div className="w-8 h-8 rounded-full bg-[#193F7A] text-white flex items-center justify-center font-semibold text-sm">
                {getUserInitial()}
              </div>

              {/* User Name */}
              <span className="hidden sm:block text-gray-700 font-medium max-w-[150px] truncate">
                {user.full_name || user.username || user.email}
              </span>

              {/* Dropdown Arrow */}
              <svg
                className={`w-4 h-4 text-gray-600 transition-transform ${dropdownOpen ? "rotate-180" : ""
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                {/* User Info Header */}
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user.full_name || user.username}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.email}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Role: {user.role || "Job Seeker"}
                  </p>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/provider/dashboard");
                    }}
                    className="flex items-center w-full gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    <User className="w-4 h-4 text-gray-500" />
                    Dashboard
                  </button>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/provider/EditDataDiri");
                    }}
                    className="flex items-center w-full gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    <User className="w-4 h-4 text-gray-500" />
                    Profil Saya
                  </button>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/provider/EditDataDiri");
                    }}
                    className="flex items-center w-full gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    <Settings className="w-4 h-4 text-gray-500" />
                    Pengaturan
                  </button>
                </div>

                {/* Logout */}
                <div className="border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="flex items-center gap-2 bg-[#193F7A] text-white px-4 py-2 rounded-lg hover:bg-[#1a3562] transition shadow-sm"
          >
            <LogIn className="w-4 h-4" />
            <span className="hidden sm:block font-medium">Login</span>
          </button>
        )}
      </div>
    </nav>
  );
}