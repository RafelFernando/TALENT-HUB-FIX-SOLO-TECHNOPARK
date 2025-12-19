import React, { useState, useEffect } from "react";
import { Bell, User, Menu, X, LogOut, LogIn, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function ProviderNavbar({ onToggleSidebar }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [totalNotif, setTotalNotif] = useState(0);

  /* =======================
     AMBIL USER LOGIN
  ======================== */
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        setUser(null);
      }
    }
  }, []);

  /* =======================
     AMBIL NOTIFIKASI USER
  ======================== */
  useEffect(() => {
    if (!user?.user_id) return;

    const getNotifications = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/talenthub/api/v1/admin/notifikasi/user/${user.user_id}`
        );

        const data = res.data.payload.data;

        // API mengembalikan object, kita jadikan array
        const notifArray = Array.isArray(data) ? data : [data];

        setNotifications(notifArray);
        setTotalNotif(notifArray.length);
      } catch (error) {
        console.error("Gagal mengambil notifikasi", error);
      }
    };

    getNotifications();
  }, [user]);

  /* =======================
     KLIK NOTIFIKASI (TOAST)
  ======================== */
  const handleBellClick = () => {
    if (notifications.length === 0) {
      toast.info("Tidak ada notifikasi");
      return;
    }

    notifications.forEach((notif) => {
      toast.info(
        <div>
          <p className="font-semibold">{notif.title}</p>
          <p className="text-sm">{notif.message}</p>
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
        }
      );
    });

    // OPTIONAL: reset badge
    setTotalNotif(0);
  };

  useEffect(() => {
    // Cek login dari localStorage
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
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
      localStorage.removeItem("token");
      localStorage.removeItem("user");

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
          Job Provider
        </h1>
      </div>

      {/* RIGHT: Notifikasi & Profil */}
      <div className="flex items-center gap-4 md:gap-6 relative">
        {/* Notifikasi */}
        <button className="relative" onClick={handleBellClick}>
          <Bell className="w-6 h-6 text-gray-600 hover:text-[#193F7A]" />

          {totalNotif > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
              {totalNotif}
            </span>
          )}
        </button>

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
                    Role: {user.role_type || "Job Seeker"}
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