import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, Camera, Save, RotateCcw, Loader, Building2, Globe, MapPin, Briefcase } from 'lucide-react';

export default function EditDataDiri() {
  const navigate = useNavigate();
  
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.user_id;

  // State untuk form data
  const [profileId, setProfileId] = useState(null);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');
  const [aboutUs, setAboutUs] = useState('');
  const [address, setAddress] = useState('');
  const [field, setField] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  
  // State untuk preview images
  const [preview, setPreview] = useState({
    profile: "",
    banner: ""
  });

  // State untuk loading dan error
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch profile data saat component mount
  const getProfileById = async () => {
    if (!userId) {
      setError('User ID tidak ditemukan. Silakan login kembali.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:3000/talenthub/api/v1/company_profiles/user/${userId}`
      );

      console.log('Response dari API:', response.data);

      // Cek apakah data ada dan valid
      if (!response.data?.payload?.data) {
        throw new Error('Format response tidak sesuai');
      }

      // Data bisa berupa object atau array, handle keduanya
      const data = Array.isArray(response.data.payload.data) 
        ? response.data.payload.data[0] 
        : response.data.payload.data;
      
      // Cek apakah data ada
      if (!data || Object.keys(data).length === 0) {
        // Profil belum ada - set ke CREATE mode
        setIsCreateMode(true);
        setError('');
        setSuccessMessage('');
        return;
      }

      // Profil sudah ada - set ke EDIT mode
      setIsCreateMode(false);
      setProfileId(data.profileid);

      // Set semua state dengan data dari API
      setCompanyName(data.companyName || '');
      setProvince(data.province || '');
      setCity(data.city || '');
      setPhone(data.phone || '');
      setEmail(data.email || '');
      setWebsite(data.website || '');
      setEmployeeCount(data.employeeCount || '');
      setAboutUs(data.aboutUs || '');
      setAddress(data.address || '');
      setField(data.field || '');
      
      // Set preview untuk gambar yang sudah ada
      setPreview({
        profile: data.url_profile || '',
        banner: data.url_banner || ''
      });

      setError('');
    } catch (error) {
      console.error("Gagal mengambil data profile:", error);
      console.error("Error details:", error.response?.data);
      
      if (error.response?.status === 404) {
        // Profil belum ada - set ke CREATE mode
        setIsCreateMode(true);
        setError('');
        console.log('Profil belum ada, mode CREATE diaktifkan');
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Gagal mengambil data profil. Silakan coba lagi.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProfileById();
  }, []);

  // Handle image upload dan preview
  const loadImage = (e, type) => {
    const image = e.target.files[0];
    
    if (!image) return;

    // Validasi tipe file
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!validTypes.includes(image.type)) {
      setError('Format file tidak valid. Gunakan JPG, PNG, atau GIF.');
      return;
    }

    // Validasi ukuran file (max 5MB)
    if (image.size > 5 * 1024 * 1024) {
      setError('Ukuran file terlalu besar. Maksimal 5MB.');
      return;
    }

    if (type === "profile") {
      setProfileImage(image);
      setPreview(prev => ({
        ...prev,
        profile: URL.createObjectURL(image)
      }));
    } else if (type === "banner") {
      setBackgroundImage(image);
      setPreview(prev => ({
        ...prev,
        banner: URL.createObjectURL(image)
      }));
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userId) {
      setError('User ID tidak ditemukan. Silakan login kembali.');
      return;
    }

    // Validasi form
    if (!companyName.trim()) {
      setError('Nama perusahaan harus diisi');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    const formData = new FormData();
    
    // Append semua data ke FormData
    formData.append("user_id", userId);
    formData.append("companyName", companyName.trim());
    formData.append("province", province.trim());
    formData.append("city", city.trim());
    formData.append("phone", phone.trim());
    formData.append("email", email.trim());
    formData.append("website", website.trim());
    formData.append("employeeCount", employeeCount || 0);
    formData.append("aboutUs", aboutUs.trim());
    formData.append("address", address.trim());
    formData.append("field", field.trim());

    // Append image jika ada file yang diupload
    if (profileImage instanceof File) {
      formData.append("profileImage", profileImage);
    }

    if (backgroundImage instanceof File) {
      formData.append("backgroundImage", backgroundImage); // Sesuaikan dengan backend (typo di backend)
    }

    try {
      let response;

      if (isCreateMode) {
        // CREATE - POST request
        console.log('📝 Creating new profile...');
        response = await axios.post(
          `http://localhost:3000/talenthub/api/v1/company_profiles`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log('✅ Create berhasil:', response.data);
        setSuccessMessage('Profil perusahaan berhasil dibuat!');
      } else {
        // UPDATE - PUT request
        if (!profileId) {
          setError('Profile ID tidak ditemukan. Silakan muat ulang halaman.');
          setIsLoading(false);
          return;
        }

        console.log('🔄 Updating profile:', profileId);
        response = await axios.put(
          `http://localhost:3000/talenthub/api/v1/company_profiles/${profileId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log('✅ Update berhasil:', response.data);
        setSuccessMessage('Profil perusahaan berhasil diperbarui!');
      }

      // Redirect ke halaman profile setelah 1.5 detik
      setTimeout(() => {
        navigate("/provider/profilperusahaan");
      }, 1500);
      
    } catch (error) {
      console.error("❌ Gagal menyimpan profile:", error);
      console.error("Error details:", error.response?.data);
      
      // Tampilkan pesan error yang lebih spesifik
      if (error.response) {
        const errorMsg = error.response.data?.payload?.message || 
                        error.response.data?.message || 
                        `Gagal ${isCreateMode ? 'membuat' : 'mengupdate'} profil`;
        setError(`Error ${error.response.status}: ${errorMsg}`);
      } else if (error.request) {
        setError('Tidak dapat terhubung ke server. Pastikan server berjalan di http://localhost:3000');
      } else {
        setError(`Terjadi kesalahan saat ${isCreateMode ? 'membuat' : 'mengupdate'} profil`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle reset form
  const handleReset = () => {
    if (isCreateMode) {
      // Reset ke form kosong untuk create mode
      setCompanyName('');
      setProvince('');
      setCity('');
      setPhone('');
      setEmail('');
      setWebsite('');
      setEmployeeCount('');
      setAboutUs('');
      setAddress('');
      setField('');
      setProfileImage(null);
      setBackgroundImage(null);
      setPreview({ profile: '', banner: '' });
    } else {
      // Reload data dari API untuk edit mode
      getProfileById();
      setProfileImage(null);
      setBackgroundImage(null);
    }
    setError('');
    setSuccessMessage('');
  };

  if (isLoading && !companyName && !isCreateMode) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
        <div className="flex items-center justify-center py-12">
          <Loader className="animate-spin mr-2" />
          <span>Memuat data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">
            {isCreateMode ? 'Buat Profil Perusahaan' : 'Edit Data Diri Perusahaan'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {isCreateMode 
              ? 'Lengkapi informasi perusahaan Anda untuk memulai' 
              : 'Perbarui informasi perusahaan Anda'}
          </p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition"
        >
          <RotateCcw size={18} />
          Reset
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Info Badge - Mode Indicator */}
      {isCreateMode && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Anda belum memiliki profil perusahaan. Silakan buat profil baru.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Nama Perusahaan */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Building2 className="inline mr-2" size={16} />
            Nama Perusahaan <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Contoh: PT Teknologi Indonesia"
            required
          />
        </div>

        {/* Provinsi & Kota */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline mr-2" size={16} />
              Provinsi
            </label>
            <input
              type="text"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Contoh: DKI Jakarta"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline mr-2" size={16} />
              Kota
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Contoh: Jakarta Selatan"
            />
          </div>
        </div>

        {/* Phone & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="inline mr-2" size={16} />
              No. Telepon
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Contoh: 021-12345678"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="inline mr-2" size={16} />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Contoh: info@perusahaan.com"
            />
          </div>
        </div>

        {/* Website & Jumlah Karyawan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Globe className="inline mr-2" size={16} />
              Website
            </label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="inline mr-2" size={16} />
              Jumlah Karyawan
            </label>
            <input
              type="number"
              value={employeeCount}
              onChange={(e) => setEmployeeCount(e.target.value)}
              min="0"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Contoh: 50"
            />
          </div>
        </div>

        {/* Bidang */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Briefcase className="inline mr-2" size={16} />
            Bidang Perusahaan
          </label>
          <input
            type="text"
            value={field}
            onChange={(e) => setField(e.target.value)}
            placeholder="Contoh: Teknologi, Manufaktur, Retail"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Alamat */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alamat
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows="3"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Alamat lengkap perusahaan"
          />
        </div>

        {/* About Us */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tentang Perusahaan
          </label>
          <textarea
            value={aboutUs}
            onChange={(e) => setAboutUs(e.target.value)}
            rows="4"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Deskripsi singkat tentang perusahaan Anda"
          />
        </div>

        {/* Upload Logo */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Camera className="inline mr-2" size={16} />
            Logo Perusahaan
          </label>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => loadImage(e, "profile")}
            />
            {preview.profile ? (
              <img src={preview.profile} alt="Preview Logo" className="h-full object-contain" />
            ) : (
              <div className="text-center">
                <Camera className="mx-auto mb-2 text-gray-400" size={32} />
                <span className="text-sm text-gray-600">Klik untuk upload logo</span>
                <span className="text-xs text-gray-400 block mt-1">JPG, PNG, GIF (Max 5MB)</span>
              </div>
            )}
          </label>
        </div>

        {/* Upload Banner */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Camera className="inline mr-2" size={16} />
            Banner Perusahaan
          </label>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => loadImage(e, "banner")}
            />
            {preview.banner ? (
              <img src={preview.banner} alt="Preview Banner" className="h-full w-full object-cover rounded" />
            ) : (
              <div className="text-center">
                <Camera className="mx-auto mb-2 text-gray-400" size={32} />
                <span className="text-sm text-gray-600">Klik untuk upload banner</span>
                <span className="text-xs text-gray-400 block mt-1">JPG, PNG, GIF (Max 5MB)</span>
              </div>
            )}
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin" size={18} />
                Menyimpan...
              </>
            ) : (
              <>
                <Save size={18} />
                {isCreateMode ? 'Buat Profil' : 'Update Profil'}
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate("/provider/profilperusahaan")}
            disabled={isLoading}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}