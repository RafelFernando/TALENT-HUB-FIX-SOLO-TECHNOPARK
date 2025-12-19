import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, AlertCircle, X, CheckCircle, XCircle } from "lucide-react";
import Terms from "../../components/Terms";

// Modal Component
function Modal({ isOpen, onClose, type, title, message, email }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          {type === "success" ? (
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          ) : (
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">
          {title}
        </h3>

        {/* Message */}
        <div className="text-gray-600 text-center space-y-3">
          {type === "success" ? (
            <>
              <p className="text-sm">Akun Anda telah berhasil dibuat.</p>
              <p className="text-sm">📧 Email verifikasi telah dikirim ke:</p>
              <p className="font-bold text-[#193F7A] text-base">{email}</p>
              <p className="text-xs text-gray-500">
                Silakan cek inbox atau folder spam Anda dan klik link verifikasi untuk mengaktifkan akun.
              </p>
            </>
          ) : (
            <p className="text-sm">{message}</p>
          )}
        </div>

        {/* Button */}
        <button
          onClick={onClose}
          className="w-full mt-6 bg-[#193F7A] text-white py-3 rounded-lg font-semibold hover:bg-[#152f5a] transition-all"
        >
          {type === "success" ? "Mengerti" : "Coba Lagi"}
        </button>
      </div>
    </div>
  );
}

export default function Registrasi() {
  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [role, setRole] = useState("job_seeker");
  const [showTerms, setShowTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, type: "", title: "", message: "", email: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
    setModal({ isOpen: false, type: "", title: "", message: "", email: "" });
    if (modal.type === "success") {
      navigate("/Auth/Login");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validasi Password
    if (formData.password !== formData.confirmPassword) {
      setError("Password tidak cocok!");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password minimal 8 karakter!");
      return;
    }

    // Validasi Terms
    if (!formData.agree) {
      setError("Anda harus menyetujui kebijakan privasi.");
      return;
    }

    // Validasi Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Format email tidak valid!");
      return;
    }

    // Validasi Phone
    if (formData.phone.length < 10) {
      setError("Nomor telepon minimal 10 digit!");
      return;
    }

    setLoading(true);

    const usersEndpoint = "http://localhost:3000/talenthub/api/v1/users";
    const userRolesEndpoint = "http://localhost:3000/talenthub/api/v1/user_roles";

    const payload = {
      username: formData.username,
      full_name: formData.full_name,
      phone: formData.phone,
      email: formData.email,
      password_hash: formData.password,
      role_type: role,
    };

    console.log("🚀 Sending registration request to:", usersEndpoint);
    console.log("📦 Payload:", payload);

    try {
      // STEP 1: Registrasi User
      const response = await fetch(usersEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("📡 Response status:", response.status);

      const data = await parseJsonSafe(response);
      console.log("📥 Response data:", data);

      if (!response.ok) {
        let errorMessage = "Registrasi gagal.";
        
        // Handle specific error messages from API
        if (data?.message) {
          errorMessage = data.message;
        } else if (response.status === 400) {
          errorMessage = "Data yang Anda masukkan tidak valid.";
        } else if (response.status === 409) {
          errorMessage = "Username atau email sudah terdaftar.";
        } else if (response.status === 500) {
          errorMessage = "Terjadi kesalahan pada server.";
        }
        
        throw new Error(errorMessage);
      }

      // Ambil user_id dari response - sesuai struktur API Anda
      const userId = 
        data?.payload?.data?.id || 
        data?.data?.id || 
        data?.user_id || 
        data?.id;
      
      if (!userId) {
        console.warn("⚠️ User ID tidak ditemukan dalam response");
        console.warn("Response structure:", JSON.stringify(data, null, 2));
      }

      console.log("✅ User registered successfully. User ID:", userId);

      // STEP 2: Buat User Role
      if (userId) {
        const rolePayload = {
          user_id: userId,
          role_type: role,
          module_type: "talenthub",
          is_confirmed: 1,
          confirmed_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
        };

        console.log("🚀 Sending user role request to:", userRolesEndpoint);
        console.log("📦 Role Payload:", rolePayload);

        try {
          const roleResponse = await fetch(userRolesEndpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(rolePayload),
          });

          const roleData = await parseJsonSafe(roleResponse);
          console.log("📥 Role Response:", roleData);

          if (!roleResponse.ok) {
            console.error("⚠️ User role creation failed, but user was created:", roleData);
          } else {
            console.log("✅ User role created successfully");
          }
        } catch (roleError) {
          console.error("⚠️ Error creating user role:", roleError);
        }
      }

      // Tampilkan Modal Sukses
      setModal({
        isOpen: true,
        type: "success",
        title: "Registrasi Berhasil!",
        message: "",
        email: formData.email,
      });

    } catch (error) {
      console.error("❌ Registration Error:", error);
      
      // Tampilkan Modal Error
      setModal({
        isOpen: true,
        type: "error",
        title: "Registrasi Gagal",
        message: error.message || "Terjadi kesalahan saat mendaftar.",
        email: "",
      });
      
      setError(error.message || "Terjadi kesalahan saat mendaftar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen bg-white font-[Segoe_UI]">
        {/* Left Image Section */}
        <div className="flex-1 hidden md:block">
          <img
            src="/stp.png"
            alt="Solo Technopark"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Form Section */}
        <div className="flex flex-1 justify-center items-center p-8">
          <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Daftar Sekarang
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                Untuk mengakses e-Training, Talent Hub, e-Commerce, dan Metaverse
                dalam satu ekosistem digital.
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Role Selection */}
            <div className="flex gap-3">
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
                Penyedia Pekerjaan
              </button>
            </div>

            {/* Username */}
            <div>
              <label className="block text-[#193F7A] font-semibold mb-2">
                Username *
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
                className="w-full border border-[#B8C3D6] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#193F7A] transition-all"
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-[#193F7A] font-semibold mb-2">
                Nama Lengkap *
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Nama Lengkap"
                required
                className="w-full border border-[#B8C3D6] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#193F7A] transition-all"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[#193F7A] font-semibold mb-2">
                Nomor Telepon *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="08123456789"
                required
                pattern="[0-9]{10,15}"
                title="Nomor telepon harus 10-15 digit"
                className="w-full border border-[#B8C3D6] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#193F7A] transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[#193F7A] font-semibold mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                required
                className="w-full border border-[#B8C3D6] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#193F7A] transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[#193F7A] font-semibold mb-2">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimal 8 karakter"
                  required
                  minLength={8}
                  className="w-full border border-[#B8C3D6] rounded-lg px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#193F7A] transition-all"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-[#193F7A] font-semibold mb-2">
                Konfirmasi Password *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Ulangi password"
                  required
                  className="w-full border border-[#B8C3D6] rounded-lg px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#193F7A] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={showConfirmPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="mt-1 w-4 h-4 accent-[#193F7A] cursor-pointer"
              />
              <span className="text-gray-700 text-sm leading-snug">
                Saya menyetujui{" "}
                <button
                  type="button"
                  onClick={() => setShowTerms(true)}
                  className="text-[#193F7A] font-semibold hover:underline"
                >
                  Syarat & Kebijakan Privasi
                </button>
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#193F7A] text-white py-3 rounded-lg font-semibold text-base hover:bg-[#152f5a] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {loading ? "Memproses..." : "Daftar"}
            </button>

            {/* Login Link */}
            <p className="text-center text-gray-700 text-sm pt-2">
              Sudah memiliki akun?{" "}
              <a
                href="/Auth/Login"
                className="text-[#193F7A] font-bold hover:underline"
              >
                Masuk disini
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
        email={modal.email}
      />

      <Terms isOpen={showTerms} onClose={() => setShowTerms(false)} />

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