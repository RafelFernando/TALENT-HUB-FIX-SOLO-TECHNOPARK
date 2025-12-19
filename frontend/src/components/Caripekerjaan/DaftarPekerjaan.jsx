import React, { useEffect, useState } from "react";
import PekerjaanCardFilter from "./PekerjaanCardFilter";

export default function DaftarPekerjaan() {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // ✅ Fetch jobs dengan struktur API yang benar
        const jobsRes = await fetch("http://localhost:3000/talenthub/api/v1/job_posts");
        const jobsData = await jobsRes.json();
        
        console.log("📥 Jobs Response:", jobsData);
        
        // ✅ Ambil dari payload.data sesuai struktur API
        const jobsList = jobsData?.payload?.data || [];
        setJobs(jobsList);
        
        // ✅ Extract companies dari jobs (karena data company sudah ada di response)
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

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full md:w-3/4 px-5 text-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
        <p className="text-gray-600">Memuat lowongan pekerjaan...</p>
      </div>
    );
  }

  return (
    <div className="w-full md:w-3/4 px-5">
      <div className="flex justify-between items-center mb-5">
        <div>
          <label className="mr-2 text-gray-700 font-medium">Tampilkan</label>
          <select className="border rounded-md px-3 py-2">
            <option>10</option>
            <option>20</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Cari Lowongan"
          className="border rounded-md px-3 py-2 w-64"
        />
      </div>

      {/* ✅ Pass jobs array dan companies ke PekerjaanCardFilter */}
      <PekerjaanCardFilter jobs={jobs} companies={companies} filters={{}} />
    </div>
  );
}