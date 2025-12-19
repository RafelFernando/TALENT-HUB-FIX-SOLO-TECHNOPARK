import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Check user login status
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogout = () => {
    // Konfirmasi logout
    if (window.confirm("Apakah Anda yakin ingin logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setShowDropdown(false);
      alert("Logout berhasil!");
      navigate("/");
    }
  };

  const linkClass = (path) =>
    `block px-4 py-2 rounded-full transition-all duration-300 font-medium ${
      location.pathname === path
        ? "bg-white text-[#193F7A] shadow-md font-semibold"
        : "text-[#193F7A] hover:text-yellow-500"
    }`;

  const toggleMenu = () => setIsOpen(!isOpen);

  // Get user initial for avatar
  const getUserInitial = () => {
    if (!user) return "U";
    return (user.full_name || user.username || user.email || "U").charAt(0).toUpperCase();
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex justify-between items-center px-6 py-4">
        {/* LOGO */}
        <div className="flex items-center">
          <img src="/logo-stp.png" alt="Logo" className="w-20" />
        </div>

        {/* NAV LINKS (Desktop) */}
        <div className="hidden md:flex gap-4 items-center bg-gray-100 px-3 py-1 rounded-full">
          <Link to="/" className={linkClass("/")}>
            Beranda
          </Link>
          <Link to="/Caripekerjaan" className={linkClass("/Caripekerjaan")}>
            Cari Pekerjaan
          </Link>
          <Link to="/Tentang" className={linkClass("/Tentang")}>
            Tentang
          </Link>
          <Link to="/Kontak" className={linkClass("/Kontak")}>
            Kontak
          </Link>
        </div>

        {/* USER SECTION (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            // User sudah login
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 px-4 py-2 rounded-full border border-[#193F7A] hover:bg-gray-50 transition-all duration-300"
              >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-[#193F7A] text-white flex items-center justify-center font-semibold">
                  {getUserInitial()}
                </div>
                {/* User Name */}
                <span className="text-[#193F7A] font-medium">
                  {user.full_name || user.username || "User"}
                </span>
                {/* Dropdown Icon */}
                <svg
                  className={`w-4 h-4 text-[#193F7A] transition-transform ${
                    showDropdown ? "rotate-180" : ""
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
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">
                      {user.full_name || user.username}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                  
                  <Link
                    to="/seeker/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Dashboard
                  </Link>
                  
                  
                  <div className="border-t border-gray-200 my-1"></div>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // User belum login
            <>
              <Link
                to="/Auth/Login"
                className="px-5 py-2 rounded-full border border-[#193F7A] text-[#193F7A] hover:bg-[#193F7A] hover:text-white transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/Auth/Registrasi"
                className="px-5 py-2 rounded-full bg-[#193F7A] text-white hover:bg-yellow-500 transition-all duration-300"
              >
                Registrasi
              </Link>
            </>
          )}
        </div>

        {/* HAMBURGER (Mobile) */}
        <button
          className={`md:hidden flex flex-col justify-between w-7 h-6 relative z-50 transition 
            ${isOpen ? "scale-110 text-yellow-500" : "text-[#193F7A]"}`}
          onClick={toggleMenu}
        >
          <span className="block h-[2px] w-7 bg-current rounded transition-all"></span>
          <span className="block h-[2px] w-7 bg-current rounded transition-all"></span>
          <span className="block h-[2px] w-7 bg-current rounded transition-all"></span>
        </button>
      </div>

      {/* SIDEBAR (Mobile) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-30"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ y: -300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -300, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="md:hidden fixed top-0 left-0 w-full bg-white shadow-lg rounded-b-2xl z-40"
            >
              <div className="flex flex-col items-center py-8 space-y-6 text-lg font-medium">
                {/* User Info (Mobile) */}
                {user && (
                  <div className="flex flex-col items-center pb-4 border-b border-gray-200 w-full">
                    <div className="w-16 h-16 rounded-full bg-[#193F7A] text-white flex items-center justify-center font-bold text-2xl mb-2">
                      {getUserInitial()}
                    </div>
                    <p className="font-semibold text-gray-900">
                      {user.full_name || user.username}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                )}

                <Link to="/" className={linkClass("/")} onClick={toggleMenu}>
                  Beranda
                </Link>
                <Link
                  to="/Caripekerjaan"
                  className={linkClass("/Caripekerjaan")}
                  onClick={toggleMenu}
                >
                  Cari Pekerjaan
                </Link>
                <Link
                  to="/Tentang"
                  className={linkClass("/Tentang")}
                  onClick={toggleMenu}
                >
                  Tentang
                </Link>
                <Link
                  to="/Kontak"
                  className={linkClass("/Kontak")}
                  onClick={toggleMenu}
                >
                  Kontak
                </Link>

                {user ? (
                  // User sudah login
                  <>
                    
                    <button
                      onClick={() => {
                        toggleMenu();
                        handleLogout();
                      }}
                      className="px-6 py-2 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  // User belum login
                  <>
                    <Link
                      to="/Auth/Login"
                      className="px-6 py-2 rounded-full border border-[#193F7A] text-[#193F7A] hover:bg-[#193F7A] hover:text-white transition-all duration-300"
                      onClick={toggleMenu}
                    >
                      Login
                    </Link>

                    <Link
                      to="/Auth/Registrasi"
                      className="px-6 py-2 rounded-full bg-[#193F7A] text-white hover:bg-yellow-500 transition-all duration-300"
                      onClick={toggleMenu}
                    >
                      Registrasi
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}