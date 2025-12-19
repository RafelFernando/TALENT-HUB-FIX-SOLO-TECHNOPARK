import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, X, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

// Modal Component
function Modal({ isOpen, onClose, type, title, message }) {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        );
      case "error":
        return (
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
        );
      case "warning":
        return (
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-yellow-600" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex justify-center mb-4">
          {getIcon()}
        </div>

        <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">
          {title}
        </h3>

        <div className="text-gray-600 text-center">
          <p className="text-sm whitespace-pre-line">{message}</p>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 bg-[#193F7A] text-white py-3 rounded-lg font-semibold hover:bg-[#152f5a] transition-all"
        >
          Mengerti
        </button>
      </div>
    </div>
  );
}

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [role, setRole] = useState("job_seeker");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, type: "", title: "", message: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  async function parseJsonSafe(response) {
    const text = await response.text();
    try {
      return text ? JSON.parse(text) : null;
    } catch {
      return { message: text || "Terjadi kesalahan pada server" };
    }
  }

  const handleModalClose = () => {
    setModal({ isOpen: false, type: "", title: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Email dan password harus diisi!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Format email tidak valid!");
      return;
    }

    setLoading(true);

    const loginEndpoint = "http://localhost:3000/talenthub/api/v1/auth/login";

    const payload = {
      email: formData.email,
      password: formData.password,
      role: role,
    };

    console.log("🚀 Sending login request to:", loginEndpoint);
    console.log("📦 Payload:", payload);

    try {
      const response = await fetch(loginEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("📡 Response status:", response.status);

      const data = await parseJsonSafe(response);
      console.log("📥 Response data:", data);

      // Ambil data dari struktur payload
      const payloadData = data?.payload;
      const statusCode = payloadData?.status_code;
      const userData = payloadData?.data?.user;
      const message = payloadData?.message || payloadData?.data?.message;

      // Cek apakah response berhasil
      if (!response.ok || statusCode !== 200) {
        // Tampilkan pesan error dari backend
        let errorMessage = message || "Login gagal.";
        
        // Cek jika ada error spesifik
        if (statusCode === 401) {
          errorMessage = message || "Email atau password salah.";
        } else if (statusCode === 403) {
          // Email belum diverifikasi
          if (message && message.toLowerCase().includes("verifikasi")) {
            setModal({
              isOpen: true,
              type: "warning",
              title: "Email Belum Diverifikasi",
              message: message || "Silakan verifikasi email Anda terlebih dahulu.\n\nCek inbox atau folder spam untuk link verifikasi.",
            });
            setLoading(false);
            return;
          }
          // Role tidak sesuai
          if (message && message.toLowerCase().includes("role")) {
            setModal({
              isOpen: true,
              type: "error",
              title: "Role Tidak Sesuai",
              message: message,
            });
            setLoading(false);
            return;
          }
        } else if (statusCode === 404) {
          errorMessage = message || "Email tidak terdaftar dalam sistem.";
        }
        
        throw new Error(errorMessage);
      }

      // Validasi data user
      if (!userData) {
        throw new Error("Data user tidak ditemukan dalam response");
      }

      // Login berhasil - simpan data
      console.log("✅ Login successful");

      // Generate simple token (gunakan token dari backend jika ada)
      const token = btoa(`${userData.user_id}-${Date.now()}`);
      localStorage.setItem("token", token);

      const userToSave = {
        user_id: userData.user_id,
        username: userData.username || userData.email.split('@')[0],
        full_name: userData.full_name,
        email: userData.email,
        phone: userData.phone || "",
        role_type: userData.role,
        profile_picture: userData.profile_picture || null,
        status: userData.status,
        email_verified: userData.email_verified,
      };

      console.log("💾 Saving user:", userToSave);
      localStorage.setItem("user", JSON.stringify(userToSave));

      window.dispatchEvent(new Event("storage"));

      // Tampilkan modal sukses
      setModal({
        isOpen: true,
        type: "success",
        title: "Login Berhasil!",
        message: message || `Selamat datang, ${userToSave.full_name || userToSave.username}!`,
      });

      // Redirect sesuai role setelah 1.5 detik
      setTimeout(() => {
        if (userToSave.role_type === "employer") {
          navigate("/provider/dashboard");
        } else {
          navigate("/seeker/dashboard");
        }
      }, 1500);

    } catch (error) {
      console.error("❌ Login Error:", error);

      setModal({
        isOpen: true,
        type: "error",
        title: "Login Gagal",
        message: error.message || "Terjadi kesalahan saat login.",
      });

      setError(error.message || "Terjadi kesalahan saat login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen bg-white font-[Segoe_UI]">
        {/* LEFT PANEL */}
        <div className="flex-1 hidden md:block">
          <img
            src="/stp.png"
            alt="Solo Technopark"
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT PANEL */}
        <div className="flex flex-1 justify-center items-center px-6 md:px-16">
          <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-5">
            <h2 className="text-4xl font-semibold text-gray-900">Masuk Sekarang</h2>
            <p className="text-gray-600">
              Untuk mengakses e-Training, Talent Hub, e-Commerce, dan Metaverse.
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                ❌ {error}
              </div>
            )}

            {/* ROLE SWITCH */}
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setRole("job_seeker")}
                className={`flex-1 py-3 rounded-lg font-medium border transition-all ${
                  role === "job_seeker"
                    ? "bg-[#193F7A] text-white border-[#193F7A]"
                    : "bg-white text-[#193F7A] border-[#193F7A] hover:bg-[#193F7A]/10"
                }`}
              >
                Pencari Kerja
              </button>

              <button
                type="button"
                onClick={() => setRole("employer")}
                className={`flex-1 py-3 rounded-lg font-medium border transition-all ${
                  role === "employer"
                    ? "bg-[#193F7A] text-white border-[#193F7A]"
                    : "bg-white text-[#193F7A] border-[#193F7A] hover:bg-[#193F7A]/10"
                }`}
              >
                Penyedia Kerja
              </button>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-[#193F7A] font-semibold mt-5 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                required
                className="w-full px-4 py-3 border border-[#B8C3D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#193F7A] transition-all"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-[#193F7A] font-semibold mt-5 mb-2">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className="w-full px-4 py-3 pr-12 border border-[#B8C3D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#193F7A] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-right">
              <a href="/Auth/ForgotPassword" className="text-[#193F7A] font-semibold hover:underline">
                Lupa Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#193F7A] text-white py-3 rounded-lg mt-6 font-semibold hover:bg-[#152f5a] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {loading ? "Memproses..." : "Login"}
            </button>

            <p className="text-center mt-6 text-gray-700">
              Belum punya akun?{" "}
              <a href="/Auth/Registrasi" className="text-[#193F7A] font-bold hover:underline">
                Daftar disini
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Custom Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={handleModalClose}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
}