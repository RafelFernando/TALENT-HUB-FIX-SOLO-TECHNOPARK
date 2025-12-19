import { useState, useEffect } from "react";
import axios from "axios";

export default function ProfilPerusahaan() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.user_id;
  const [profileId, setProfileId] = useState(null);

  const [companyName, setcompanyName] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [aboutUs, setAboutUs] = useState("");
  const [address, setAddress] = useState("");
  const [field, setField] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [url_profile, setUrlProfile] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [url_banner, setUrlBanner] = useState("");

  const getProfilByUserId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/talenthub/api/v1/company_profiles/user/${userId}`
      );

      const data = response.data.payload.data;

      if (!data) {
        setProfileId(null);
        return;
      }

      setProfileId(data.id);
      setcompanyName(data.companyName);
      setProvince(data.province);
      setCity(data.city);
      setPhone(data.phone);
      setEmail(data.email);
      setWebsite(data.website);
      setEmployeeCount(data.employeeCount);
      setAboutUs(data.aboutUs);
      setField(data.field);
      setProfileImage(data.profileImage);
      setUrlProfile(data.url_profile);
      setBackgroundImage(data.backgroundImage);
      setUrlBanner(data.url_banner);
    } catch (error) {
      if (error.response?.status === 404) {
        setProfileId(null);
      } else {
        console.error("Gagal mengambil biodata:", error);
      }
    }
  };

  useEffect(() => {
    if (userId) {
      getProfilByUserId();
    }
  }, [userId]);

  const getProfilImage = (filename) => {
    if (!filename) {
      return "https://via.placeholder.com/80?text=No+Image";
    }

    return `http://localhost:3000/uploads/profile-images/${filename}`;
  };

  const getBagroundImage = (filename) => {
    if (!filename) {
      return "https://via.placeholder.com/80?text=No+Image";
    }

    return `http://localhost:3000/uploads/baground-images/${filename}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profil Perusahaan</h1>
          <p className="text-gray-600 mt-2">Kelola informasi dan tampilan perusahaan Anda</p>
        </div>

        {/* Banner Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {url_banner ? (
            <div className="relative h-64 md:h-80">
              <img
                src={getBagroundImage(backgroundImage)}
                alt="Background Perusahaan"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          ) : (
            <div className="h-64 md:h-80 bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center">
              <span className="text-white text-lg font-medium">Belum ada banner perusahaan</span>
            </div>
          )}

          {/* Profile Info Overlay */}
          <div className="relative px-6 md:px-8 pb-8 -mt-16 md:-mt-20">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-white">
                  {url_profile ? (
                    <img
                      src={getProfilImage(profileImage)}
                      alt="Logo Perusahaan"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400 text-sm">No Image</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Company Basic Info */}
              <div className="flex-1 text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
                  {companyName || "Nama Perusahaan Belum Diisi"}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-gray-700">
                  {field && (
                    <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {field}
                    </span>
                  )}
                  {employeeCount && (
                    <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                      {employeeCount} Karyawan
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Company Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Us Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Tentang Perusahaan</h3>
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {aboutUs || "Deskripsi tentang perusahaan belum ditambahkan."}
                </p>
              </div>
            </div>

            {/* Contact Information Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Informasi Kontak</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Alamat</label>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <p className="text-gray-900">{address || "Belum diisi"}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Lokasi</label>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                      </svg>
                      <p className="text-gray-900">
                        {city && province ? `${city}, ${province}` : "Belum diisi"}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Telepon</label>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <p className="text-gray-900">{phone || "Belum diisi"}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <p className="text-gray-900">{email || "Belum diisi"}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Website</label>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                      </svg>
                      {website ? (
                        <a 
                          href={website.startsWith('http') ? website : `https://${website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {website}
                        </a>
                      ) : (
                        <p className="text-gray-900">Belum diisi</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Stats & Actions */}
          <div className="space-y-8">
            {/* Quick Stats Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Ringkasan</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Jumlah Karyawan</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">{employeeCount || "0"}</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Bidang Usaha</span>
                  </div>
                  <span className="text-lg font-semibold text-gray-900 truncate max-w-[120px]">
                    {field || "Belum diisi"}
                  </span>
                </div>
              </div>
            </div>

            {/* Status Card */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Status Profil</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-blue-100">Kelengkapan Data</span>
                  <span className="font-bold">{
                    [companyName, province, city, phone, email, aboutUs, field].filter(Boolean).length * 14.3
                  }%</span>
                </div>
                <div className="w-full bg-blue-400 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${[companyName, province, city, phone, email, aboutUs, field].filter(Boolean).length * 14.3}%` 
                    }}
                  ></div>
                </div>
                <p className="text-sm text-blue-100 pt-2">
                  Lengkapi semua informasi untuk meningkatkan kepercayaan calon kandidat.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>
      </div>
    </div>
  );
}