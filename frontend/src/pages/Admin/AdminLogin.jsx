import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const API_URL = "http://localhost:3000/talenthub/api/v1/authAdmin/admin/login";

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Harap isi semua kolom!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Admin Login Response:", result);

      if (result.payload.status_code !== 200) {
        alert(result.payload.data.message || "Login gagal");
        setLoading(false);
        return;
      }

      alert("Login berhasil!");

      // Simpan session admin (opsional)
      localStorage.setItem("admin", JSON.stringify(result.payload.data.admin));
      localStorage.setItem(
        "admin_token",
        result.payload.data.token // jika ada
      );

      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Terjadi kesalahan koneksi ke server");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-white font-[Segoe_UI]">
      {/* LEFT PANEL */}
      <div className="flex-1 hidden md:block bg-[#193F7A]">
        <img
          src="/gambar.png"
          alt="Solo Technopark"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-1 justify-center items-center px-6 md:px-16">
        <form className="w-full max-w-lg space-y-5" onSubmit={handleSubmit}>
          {/* Judul */}
          <h2 className="text-4xl font-bold text-gray-900 flex justify-center">
            Admin
          </h2>
          <p className="text-gray-600 font-bold text-2xl flex justify-center leading-relaxed">
            Solo Techno Park - Talent Hub
          </p>

          {/* Email */}
          <div>
            <label className="block text-[#193F7A] font-semibold mt-5 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email@gmail.com"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
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
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Tombol Login */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#193F7A] text-white py-3 rounded-lg mt-6 hover:bg-blue-900 transition duration-300 font-medium"
          >
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
