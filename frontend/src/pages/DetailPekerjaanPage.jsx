import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import JobDetailHeader from "../components/Detailpekerjaan/JobDetailHeader";
import JobDetailBody from "../components/Detailpekerjaan/JobDetailBody";
import JobDetailFooter from "../components/Detailpekerjaan/JobDetailFooter";
import TipsMenjagaDiri from "../components/Detailpekerjaan/TipsMenjagaDiri";
import CompanyInfoCard from "../components/Detailpekerjaan/CompanyInfoCard";
import Sidebar from "../components/Detailpekerjaan/Sidebar";
import LamarCard from "../components/Detailpekerjaan/LamarCard";
import Map from "../components/Map";
import Footer from "../components/Footer";

export default function DetailPekerjaanPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [company, setCompany] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBookmarkActive, setBookmarkActive] = useState(false);
  const [isShareActive, setShareActive] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  // ✅ Ambil data lowongan dan perusahaan berdasarkan ID
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        
        // ✅ PERBAIKAN 1: Gunakan endpoint yang sama dengan PekerjaanCard
        const res = await fetch(`http://localhost:3000/talenthub/api/v1/job_posts`);
        const result = await res.json();
        
        console.log("📥 API Response:", result);
        
        // ✅ PERBAIKAN 2: Ambil data dari payload.data
        const allJobs = result?.payload?.data || [];
        
        // ✅ PERBAIKAN 3: Filter job berdasarkan ID dari URL
        const jobData = allJobs.find(j => j.job_id === parseInt(id));
        
        console.log("🔍 Job ID dari URL:", id);
        console.log("✅ Job ditemukan:", jobData);

        if (!jobData) {
          console.error("❌ Job tidak ditemukan dengan ID:", id);
          setLoading(false);
          return;
        }

        setJob(jobData);

        // ✅ PERBAIKAN 4: Company data sudah ada di response job
        // Buat object company dari data yang ada
        const companyData = {
          user_id: jobData.employer_id,
          companyName: jobData.company_name,
          profileImage: jobData.company_profile_image,
          city: jobData.company_city,
          province: jobData.company_province,
          website: jobData.company_website,
          phone: jobData.company_phone,
          email: jobData.company_email,
          about: jobData.company_about,
          address: jobData.company_address,
          field: jobData.company_field,
          employeeCount: jobData.company_employee_count,
          backgroundImage: jobData.company_background_image,
          company_verified: jobData.employer_status === "verified"
        };
        
        setCompany(companyData);
        console.log("🏢 Company data:", companyData);

        // ✅ PERBAIKAN 5: Filter related jobs (exclude current job)
        const filtered = allJobs
          .filter((j) => j.job_id !== jobData.job_id)
          .slice(0, 5); // Ambil max 5 related jobs

        console.log("📋 Related jobs:", filtered);
        setRelatedJobs(filtered);

      } catch (e) {
        console.error("❌ Gagal fetch data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Memuat detail...</p>;
  if (!job)
    return <p className="text-center mt-10 text-gray-500">Lowongan tidak ditemukan.</p>;

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 mt-[70px]">
        {/* Bagian Kiri */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          <JobDetailHeader
            job={job}
            isBookmarkActive={isBookmarkActive}
            isShareActive={isShareActive}
            setBookmarkActive={setBookmarkActive}
            setShareActive={setShareActive}
            onLamar={() => setModalOpen(true)}
            company={company}
          />

          <JobDetailBody job={job} />
          <JobDetailFooter job={job} />
          <TipsMenjagaDiri />

          {/* ✅ Card Informasi Perusahaan */}
          {company && <CompanyInfoCard company={company} />}
        </div>

        {/* Bagian Kanan */}
        <Sidebar job={job} relatedJobs={relatedJobs} navigate={navigate} company={company} />
      </div>

      {/* Modal Lamar */}
      <LamarCard isOpen={isModalOpen} onClose={() => setModalOpen(false)} job={job} />

      <Map />
      <Footer />
    </>
  );
}