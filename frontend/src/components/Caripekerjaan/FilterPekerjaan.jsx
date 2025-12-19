import React, { useState, useEffect } from "react";
import { Filter, Search, Sparkles, ChevronDown } from "lucide-react";

export default function FilterPekerjaan({ onFilter, categories = [] }) {
  const [filters, setFilters] = useState({
    sort: "",
    kategori: "",
    provinsi: "",
    provinsiCode: "", // Menyimpan code untuk fetch kota
    kota: "",
    kotaCode: "", // Menyimpan code kota
    gaji: "",
  });

  const [provinsiList, setProvinsiList] = useState([]);
  const [kotaList, setKotaList] = useState([]);
  const [loadingProv, setLoadingProv] = useState(false);
  const [loadingKota, setLoadingKota] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // 🔹 Ambil daftar provinsi dari proxy Vite
  useEffect(() => {
    const fetchProvinsi = async () => {
      setLoadingProv(true);
      try {
        const res = await fetch("/wilayah-api/api/provinces.json");
        const result = await res.json();

        if (result?.data && Array.isArray(result.data)) {
          setProvinsiList(result.data);
        } else {
          console.error("Format data provinsi tidak sesuai:", result);
        }
      } catch (err) {
        console.error("Gagal mengambil data provinsi:", err);
      } finally {
        setLoadingProv(false);
      }
    };
    fetchProvinsi();
  }, []);

  // 🔹 Ambil daftar kota berdasarkan provinsi yang dipilih
  useEffect(() => {
    const fetchKota = async () => {
      if (!filters.provinsiCode) {
        setKotaList([]);
        return;
      }
      setLoadingKota(true);
      try {
        const res = await fetch(`/wilayah-api/api/regencies/${filters.provinsiCode}.json`);
        const result = await res.json();

        if (result?.data && Array.isArray(result.data)) {
          setKotaList(result.data);
        } else {
          console.error("Format data kota tidak sesuai:", result);
        }
      } catch (err) {
        console.error("Gagal mengambil data kota:", err);
      } finally {
        setLoadingKota(false);
      }
    };

    fetchKota();
  }, [filters.provinsiCode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Jika provinsi dipilih, simpan code dan name terpisah
    if (name === "provinsi") {
      const selectedProv = provinsiList.find(p => p.code === value);
      setFilters((prev) => ({
        ...prev,
        provinsi: selectedProv ? selectedProv.name : "",
        provinsiCode: value,
        kota: "", // Reset kota saat provinsi berubah
        kotaCode: "",
      }));
    } 
    // Jika kota dipilih, ambil nama kota dari kotaList
    else if (name === "kota") {
      const selectedKota = kotaList.find(k => k.code === value);
      let kotaName = selectedKota ? selectedKota.name : "";
      
      // Bersihkan prefix "Kota" atau "Kabupaten" untuk matching yang lebih baik
      // Contoh: "Kota Jakarta Pusat" → "Jakarta Pusat"
      kotaName = kotaName
        .replace(/^Kota\s+/i, '')
        .replace(/^Kabupaten\s+/i, '')
        .replace(/^Kab\.\s+/i, '');
      
      setFilters((prev) => ({
        ...prev,
        kota: kotaName,
        kotaCode: value,
      }));
    } 
    else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSearch = () => {
    if (onFilter) onFilter(filters);
  };

  return (
    <div className="relative w-full md:w-2/5">
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="md:hidden w-full flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-xl shadow-lg mb-4"
      >
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5" />
          <span className="font-semibold">Filter Pekerjaan</span>
        </div>
        <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </button>

      {/* Filter Container */}
      <div className={`
        ${isExpanded ? 'block' : 'hidden md:block'}
        relative bg-gradient-to-b from-white to-blue-50/30 backdrop-blur-sm rounded-2xl p-6 shadow-xl shadow-blue-100/50 border border-white/80
        transition-all duration-300 hover:shadow-2xl hover:shadow-blue-200/50
      `}>
        {/* Decorative elements */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400/20 rounded-full blur-sm"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-400/20 rounded-full blur-sm"></div>
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent flex items-center gap-3">
            <div className="relative">
              <Filter className="w-6 h-6 text-blue-600" />
              <div className="absolute -inset-1 bg-yellow-400/20 rounded-full blur-sm"></div>
            </div>
            Filter Pekerjaan
          </h3>
          <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
        </div>

        {/* Filter Content */}
        <div className="space-y-6">
          {/* Sortir */}
          <div className="flex flex-col gap-2">
            <label className="text-blue-900 font-semibold flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              Sortir
            </label>
            <div className="relative">
              <select
                name="sort"
                onChange={handleChange}
                className="appearance-none w-full bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-xl px-4 py-3 text-blue-900 font-medium
                  focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 outline-none transition-all duration-200
                  shadow-sm hover:shadow-md hover:border-blue-300"
                value={filters.sort}
              >
                <option value="" className="text-gray-500">Tidak ada</option>
                <option value="terlama" className="text-blue-900">Terlama</option>
                <option value="terbaru" className="text-blue-900">Terbaru</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none" />
            </div>
          </div>

          {/* Kategori */}
          <div className="flex flex-col gap-2">
            <label className="text-blue-900 font-semibold flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
              Kategori
            </label>
            <div className="relative">
              <select
                name="kategori"
                onChange={handleChange}
                value={filters.kategori}
                className="appearance-none w-full bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-xl px-4 py-3 text-blue-900 font-medium
                  focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 outline-none transition-all duration-200
                  shadow-sm hover:shadow-md hover:border-blue-300"
              >
                <option value="" className="text-gray-500">Semua Kategori</option>
                {categories.map((kat) => (
                  <option key={kat.category_id} value={kat.category_id} className="text-blue-900">
                    {kat.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none" />
            </div>
          </div>

          {/* Provinsi & Kota */}
          <div className="space-y-4 p-4 bg-gradient-to-br from-blue-50/50 to-white rounded-xl border border-blue-100/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full"></div>
              <span className="text-blue-900 font-semibold text-sm">Lokasi</span>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label className="text-blue-800 font-medium text-sm">Provinsi</label>
                <div className="relative">
                  <select
                    name="provinsi"
                    onChange={handleChange}
                    value={filters.provinsiCode}
                    className="appearance-none w-full bg-white/90 backdrop-blur-sm border border-blue-200 rounded-lg px-4 py-2.5 text-blue-900 font-medium
                      focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 outline-none transition-all duration-200
                      shadow-sm hover:shadow-md hover:border-blue-300"
                  >
                    <option value="" className="text-gray-500">Semua Provinsi</option>
                    {loadingProv ? (
                      <option disabled className="text-blue-600">Memuat data...</option>
                    ) : (
                      provinsiList.map((prov) => (
                        <option key={prov.code} value={prov.code} className="text-blue-900">
                          {prov.name}
                        </option>
                      ))
                    )}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-blue-800 font-medium text-sm">Kota / Kabupaten</label>
                <div className="relative">
                  <select
                    name="kota"
                    onChange={handleChange}
                    value={filters.kotaCode}
                    disabled={!filters.provinsiCode}
                    className={`appearance-none w-full bg-white/90 backdrop-blur-sm border rounded-lg px-4 py-2.5 font-medium
                      focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 outline-none transition-all duration-200
                      shadow-sm hover:shadow-md ${!filters.provinsiCode ? 'border-blue-100 text-gray-400' : 'border-blue-200 text-blue-900 hover:border-blue-300'}`}
                  >
                    <option value="" className="text-gray-500">Semua Kota</option>
                    {loadingKota ? (
                      <option disabled className="text-blue-600">Memuat data...</option>
                    ) : (
                      kotaList.map((kota) => (
                        <option key={kota.code} value={kota.code} className="text-blue-900">
                          {kota.name}
                        </option>
                      ))
                    )}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none" />
                </div>
              </div>
            </div>
            
            <p className="text-xs text-blue-600/70 font-medium pt-2 border-t border-blue-100">
              *Pilih "Semua Provinsi" untuk memilih dan mereset kota
            </p>
          </div>

          {/* Gaji */}
          <div className="flex flex-col gap-2">
            <label className="text-blue-900 font-semibold flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
              Gaji
            </label>
            <div className="relative">
              <select
                name="gaji"
                onChange={handleChange}
                value={filters.gaji}
                className="appearance-none w-full bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-xl px-4 py-3 text-blue-900 font-medium
                  focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 outline-none transition-all duration-200
                  shadow-sm hover:shadow-md hover:border-blue-300"
              >
                <option value="" className="text-gray-500">Tampilkan Semua</option>
                <option value="2000000" className="text-blue-900">Rp 2.000.000+</option>
                <option value="3000000" className="text-blue-900">Rp 3.000.000+</option>
                <option value="5000000" className="text-blue-900">Rp 5.000.000+</option>
                <option value="10000000" className="text-blue-900">Rp 10.000.000+</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none" />
            </div>
          </div>

          {/* Tombol Cari */}
          <button
            onClick={handleSearch}
            className="w-full group relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3.5 rounded-xl font-semibold 
              shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all duration-300 
              transform hover:-translate-y-0.5 flex items-center justify-center gap-2 overflow-hidden"
          >
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="relative">Cari Pekerjaan</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>

        {/* Floating element */}
        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-yellow-400/10 to-blue-400/10 rounded-full blur-md"></div>
      </div>
    </div>
  );
}