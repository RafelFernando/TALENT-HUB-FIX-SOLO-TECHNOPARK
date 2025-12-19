import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Beranda/Header";
import CaraKerja from "../components/Beranda/CaraKerja";
import RekomendasiPekerjaan from "../components/Beranda/RekomendasiPekerjaan";
import Mitra from "../components/Beranda/Mitra";
import KarirList from "../components/Beranda/KarirList";
import Map from "../components/Map";
import Footer from "../components/Footer";
import PekerjaanCard from "../components/Caripekerjaan/PekerjaanCard";

export default function BerandaPage() {
    const [jobs, setJobs] = useState([]);
    const [companies, setCompanies] = useState([]); // ✅ tambahkan state companies
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({});

    const handleFilter = (selectedFilters) => {
        setFilters(selectedFilters);
    };

    // fetch jobs
    const fetchJobs = async (filters = {}) => {
        setLoading(true);
        try {
            let url = "http://localhost:5000/api/talenthub/jobs";
            const params = new URLSearchParams();

            if (filters.keyword) params.append("keyword", filters.keyword);
            if (filters.kategori) params.append("kategori", filters.kategori);
            if (filters.provinsi) params.append("provinsi", filters.provinsi);
            if (filters.gaji) params.append("gaji_min", filters.gaji);

            if ([...params].length > 0) url += `?${params.toString()}`;

            const res = await fetch(url);
            const data = await res.json();
            setJobs(data.jobs || []);
        } catch (err) {
            console.error("Error fetching jobs:", err);
        } finally {
            setLoading(false);
        }
    };

    // fetch companies/profiles
    const fetchCompanies = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/talenthub/profiles");
            const data = await res.json();
            setCompanies(data || []);
        } catch (err) {
            console.error("Error fetching companies:", err);
        }
    };

    useEffect(() => {
        fetchJobs();
        fetchCompanies(); // ✅ fetch semua company
    }, []);

    return (
        <>
            <Navbar />
            <Header />
            <CaraKerja />
            <PekerjaanCard
                jobs={jobs}
                filters={filters}
                companies={companies} />
            <KarirList />
            <Mitra />
            <Map />
            <Footer />
        </>
    );
}