import { useState, useEffect } from 'react';
import { User, Phone, Mail, Camera, Save, RotateCcw, Loader, Building2, Globe, MapPin } from 'lucide-react';

export default function EditDataDiri() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    companyName: '',
    phone: '',
    website: '',
    province: '',
    city: '',
    address: '',
    field: '',
    employeeCount: '',
    aboutUs: ''
  });
  
  const [originalData, setOriginalData] = useState({});
  const [avatar, setAvatar] = useState('https://ui-avatars.com/api/?name=User&background=4F46E5&color=fff&size=200');
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [provider, setProvider] = useState(null);
  const [profileData, setProfileData] = useState(null);

  // 🔹 Ambil user login dari localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    console.log("📦 Raw localStorage user:", userData);

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log("👤 Parsed User:", parsedUser);

        const userId = parsedUser.user_id || parsedUser.id;
        console.log("🆔 User ID:", userId, "Type:", typeof userId);

        const providerData = { ...parsedUser, id: userId };
        setProvider(providerData);

        // Set initial form data dari localStorage (hanya user data)
        setFormData(prev => ({
          ...prev,
          full_name: parsedUser.full_name || '',
          email: parsedUser.email || ''
        }));

      } catch (err) {
        console.error("❌ Error parsing user data:", err);
        setError("Gagal memuat data user");
      }
    } else {
      setError("User tidak login");
    }
  }, []);

  // 🔹 Ambil profil dari API
  useEffect(() => {
    if (!provider || !provider.id) {
      setLoading(false);
      return;
    }

    console.log("🏢 Fetching profile for user ID:", provider.id);

    fetch(`http://localhost:5000/api/talenthub/profiles`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const userProfile = data.find(
            (profile) => Number(profile.user_id) === Number(provider.id)
          );
          console.log("✅ User Profile Found:", userProfile);
          
          if (userProfile) {
            setProfileData(userProfile);
            
            // Set form data dengan data dari profile
            const profileFormData = {
              full_name: provider.full_name || '',
              email: provider.email || '',
              companyName: userProfile.companyName || '',
              phone: userProfile.phone || '',
              website: userProfile.website || '',
              province: userProfile.province || '',
              city: userProfile.city || '',
              address: userProfile.address || '',
              field: userProfile.field || '',
              employeeCount: userProfile.employeeCount || '',
              aboutUs: userProfile.aboutUs || ''
            };
            
            setFormData(profileFormData);
            setOriginalData(profileFormData);
            
            // Set avatar jika ada
            if (userProfile.profileImage) {
              setAvatar(`http://localhost:3000/${userProfile.profileImage}`);
            }
          } else {
            // Jika belum ada profile, gunakan data dari user saja
            const defaultFormData = {
              full_name: provider.full_name || '',
              email: provider.email || '',
              companyName: '',
              phone: '',
              website: '',
              province: '',
              city: '',
              address: '',
              field: '',
              employeeCount: '',
              aboutUs: ''
            };
            setFormData(defaultFormData);
            setOriginalData(defaultFormData);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error loading profile:", err);
        setLoading(false);
      });
  }, [provider]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran file maksimal 2MB!');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('File harus berupa gambar!');
        return;
      }

      setImageFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setFormData(originalData);
    setPreviewImage(null);
    setImageFile(null);
  };

  const handleSubmit = async () => {
    if (!provider || !provider.id) {
      alert('User tidak ditemukan!');
      return;
    }

    // Validasi input
    if (!formData.full_name.trim()) {
      alert('Nama tidak boleh kosong!');
      return;
    }

    if (!formData.email.trim()) {
      alert('Email tidak boleh kosong!');
      return;
    }

    // Validasi email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Format email tidak valid!');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      
      // 1. Update atau create profile data
      console.log('📤 Updating profile data:', formData);
      
      const profilePayload = {
        user_id: provider.id,
        companyName: formData.companyName,
        phone: formData.phone,
        email: formData.email,
        website: formData.website,
        province: formData.province,
        city: formData.city,
        address: formData.address,
        field: formData.field,
        employeeCount: formData.employeeCount ? parseInt(formData.employeeCount) : 0,
        aboutUs: formData.aboutUs
      };

      let profileResponse;
      
      if (profileData && profileData.profileid) {
        // Update existing profile
        console.log('🔄 Updating existing profile:', profileData.profileid);
        profileResponse = await fetch(
          `http://localhost:5000/api/talenthub/profiles/${profileData.profileid}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(profilePayload),
          }
        );
      } else {
        // Create new profile
        console.log('➕ Creating new profile');
        profileResponse = await fetch(
          `http://localhost:5000/api/talenthub/profiles`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(profilePayload),
          }
        );
      }

      if (!profileResponse.ok) {
        const errorText = await profileResponse.text();
        console.error('❌ Profile response error:', errorText);
        throw new Error('Gagal memperbarui profil');
      }

      const updatedProfile = await profileResponse.json();
      console.log('✅ Profile updated:', updatedProfile);

      // 2. Upload image jika ada
      if (imageFile) {
        console.log('📤 Uploading profile image...');
        
        const formDataImg = new FormData();
        formDataImg.append('profileImage', imageFile);

        const profileId = profileData?.profileid || updatedProfile.profileid;
        
        const imageResponse = await fetch(
          `http://localhost:5000/api/talenthub/profiles/${profileId}/image`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: formDataImg,
          }
        );

        if (!imageResponse.ok) {
          console.warn('⚠️ Failed to upload image');
        } else {
          console.log('✅ Image uploaded successfully');
        }
      }

      // 3. Update localStorage dengan data baru
      const updatedUserData = {
        ...provider,
        full_name: formData.full_name,
        email: formData.email
      };
      localStorage.setItem('user', JSON.stringify(updatedUserData));

      // Update original data
      setOriginalData(formData);
      setProvider(updatedUserData);

      alert('✅ Data berhasil disimpan!');
      
      // Reload halaman untuk update data di seluruh aplikasi
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (err) {
      console.error('❌ Error saving data:', err);
      setError('Gagal menyimpan data: ' + err.message);
      alert('❌ Gagal menyimpan data: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader className="w-6 h-6 animate-spin text-blue-600" />
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-gray-700">Edit Profile Perusahaan</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-3"></div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            ❌ {error}
          </div>
        )}

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Avatar Section */}
              <div className="lg:col-span-1">
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-lg ring-4 ring-blue-100 transition-all duration-300 group-hover:ring-blue-300">
                      <img
                        src={previewImage || avatar}
                        alt="Company Logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <label className="absolute bottom-2 right-2 cursor-pointer">
                      <div className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-110">
                        <Camera className="w-5 h-5" />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        disabled={saving}
                      />
                    </label>
                  </div>
                  <p className="mt-4 text-sm text-gray-500 text-center">
                    Upload logo perusahaan
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    JPG, PNG or GIF (max. 2MB)
                  </p>
                </div>
              </div>

              {/* Form Section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Informasi Dasar */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Informasi Dasar</h3>
                  
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      Nama Perusahaan
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      disabled={saving}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 hover:border-blue-300 disabled:bg-gray-100"
                      placeholder="Masukkan nama perusahaan"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Phone className="w-4 h-4 text-green-600" />
                        No Telepon
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={saving}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 hover:border-blue-300 disabled:bg-gray-100"
                        placeholder="+62..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Mail className="w-4 h-4 text-red-600" />
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={saving}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 hover:border-blue-300 disabled:bg-gray-100"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Globe className="w-4 h-4 text-purple-600" />
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      disabled={saving}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 hover:border-blue-300 disabled:bg-gray-100"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                {/* Lokasi */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Lokasi</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <MapPin className="w-4 h-4 text-orange-600" />
                        Provinsi
                      </label>
                      <input
                        type="text"
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        disabled={saving}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 hover:border-blue-300 disabled:bg-gray-100"
                        placeholder="Contoh: Jawa Tengah"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <MapPin className="w-4 h-4 text-orange-600" />
                        Kota
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        disabled={saving}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 hover:border-blue-300 disabled:bg-gray-100"
                        placeholder="Contoh: Surakarta"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <MapPin className="w-4 h-4 text-orange-600" />
                      Alamat Lengkap
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      disabled={saving}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 hover:border-blue-300 disabled:bg-gray-100"
                      placeholder="Alamat lengkap perusahaan..."
                    />
                  </div>
                </div>

                {/* Detail Perusahaan */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Detail Perusahaan</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Building2 className="w-4 h-4 text-indigo-600" />
                        Bidang Usaha
                      </label>
                      <input
                        type="text"
                        name="field"
                        value={formData.field}
                        onChange={handleInputChange}
                        disabled={saving}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 hover:border-blue-300 disabled:bg-gray-100"
                        placeholder="Contoh: IT & Software"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <User className="w-4 h-4 text-teal-600" />
                        Jumlah Karyawan
                      </label>
                      <input
                        type="number"
                        name="employeeCount"
                        value={formData.employeeCount}
                        onChange={handleInputChange}
                        disabled={saving}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 hover:border-blue-300 disabled:bg-gray-100"
                        placeholder="Contoh: 100"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      Tentang Perusahaan
                    </label>
                    <textarea
                      name="aboutUs"
                      value={formData.aboutUs}
                      onChange={handleInputChange}
                      disabled={saving}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 hover:border-blue-300 disabled:bg-gray-100"
                      placeholder="Deskripsi singkat tentang perusahaan..."
                    />
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Tips:</span> Pastikan informasi yang Anda masukkan akurat dan terkini untuk menarik kandidat terbaik.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3 justify-end">
            <button
              type="button"
              onClick={handleReset}
              disabled={saving}
              className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 text-white text-sm px-6 py-3 rounded-lg shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-3 rounded-lg shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Simpan
                </>
              )}
            </button>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">User ID</p>
                <p className="text-lg font-bold text-gray-800">{provider?.id || '-'}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone Status</p>
                <p className="text-lg font-bold text-gray-800">
                  {formData.phone ? 'Filled' : 'Empty'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Profile Status</p>
                <p className="text-lg font-bold text-gray-800">
                  {profileData ? 'Complete' : 'Incomplete'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}