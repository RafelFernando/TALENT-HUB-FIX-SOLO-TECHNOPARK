import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Map from "../components/Map";
import FilterPekerjaan from "../components/Caripekerjaan/FilterPekerjaan";
import PekerjaanCardFilter from "../components/Caripekerjaan/PekerjaanCardFilter";

export default function CariPekerjaanPage() {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]); // ✅ Tambah state categories
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});

  const handleFilter = (selectedFilters) => {
    setFilters(selectedFilters);
  };

  // ✅ Fetch jobs dengan struktur API yang benar
  const fetchJobs = async (filters = {}) => {
    setLoading(true);
    try {
      let url = "http://localhost:3000/talenthub/api/v1/job_posts";
      const params = new URLSearchParams();

      if (filters.keyword) params.append("keyword", filters.keyword);
      if (filters.kategori) params.append("kategori", filters.kategori);
      if (filters.provinsi) params.append("provinsi", filters.provinsi);
      if (filters.gaji) params.append("gaji_min", filters.gaji);

      if ([...params].length > 0) url += `?${params.toString()}`;

      const res = await fetch(url);
      const data = await res.json();
      
      console.log("📥 Jobs Response:", data);
      
      // ✅ Ambil dari payload.data
      const jobsList = data?.payload?.data || [];
      setJobs(jobsList);
      
      // ✅ Extract companies dari jobs
      const companiesData = jobsList.map(job => ({
        user_id: job.employer_id,
        companyName: job.company_name,
        profileImage: job.company_profile_image,
        company_verified: job.employer_status === "verified"
      }));
      
      setCompanies(companiesData);
      
    } catch (err) {
      console.error("❌ Error fetching jobs:", err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch categories untuk filter
  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:3000/talenthub/api/v1/job_categories");
      const data = await res.json();
      
      console.log("📥 Categories Response:", data);
      
      // ✅ Ambil dari payload.data
      const categoriesList = data?.payload?.data || [];
      setCategories(categoriesList);
      
    } catch (err) {
      console.error("❌ Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchCategories(); // ✅ Fetch categories saat component mount
  }, []);

  // fetch ulang saat filter berubah
  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      fetchJobs(filters);
    }
  }, [filters]);

  return (
    <>
      <Navbar />
      <div className="w-[85%] mx-auto flex flex-col md:flex-row gap-10 mt-[100px] mb-20">
        {/* ✅ Pass categories ke FilterPekerjaan */}
        <FilterPekerjaan onFilter={handleFilter} categories={categories} />
        
        {loading ? (
          <div className="flex-1 text-center mt-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
            <p className="text-gray-500">Memuat data lowongan...</p>
          </div>
        ) : (
          <PekerjaanCardFilter
            jobs={jobs}
            filters={filters}
            companies={companies}
          />
        )}
      </div>
      <Map />
      <Footer />
    </>
  );
}