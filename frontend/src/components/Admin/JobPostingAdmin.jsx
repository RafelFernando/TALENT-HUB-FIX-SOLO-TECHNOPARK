import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function JobPostingAdmin() {
    const [jobPosting, setJobPosting] = useState([]);

    const getJobPosting = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/talenthub/api/v1/job_posts"
            );
            setJobPosting(response.data.payload.data);
        } catch (error) {
            console.error("Gagal mengambil data Job Posting:", error);
        }
    };

    useEffect(() => {
        getJobPosting();
    }, []);

    return (
        <div>
            <table className="mt-4 min-w-full border border-gray-300 bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 border-b">No</th>
                        <th className="px-4 py-2 border-b text-left">Lowongan</th>
                        <th className="px-4 py-2 border-b text-left">Lokasi</th>
                        <th className="px-4 py-2 border-b text-left">Type</th>
                        <th className="px-4 py-2 border-b text-left">Status</th>
                        <th className="px-4 py-2 border-b text-left">Penyedia Kerja</th>
                        <th className="px-4 py-2 border-b text-left">Status Penyedia</th>
                    </tr>
                </thead>

                <tbody>
                    {jobPosting.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center py-4">
                                Data belum ada
                            </td>
                        </tr>
                    ) : (
                        jobPosting.map((jobPosting, index) => (
                            <tr key={jobPosting.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border-b">{index + 1}</td>
                                <td className="px-4 py-2 border-b">{jobPosting.title}</td>
                                <td className="px-4 py-2 border-b">{jobPosting.location}</td>
                                <td className="px-4 py-2 border-b">{jobPosting.employment_type}</td>
                                <td className="px-4 py-2 border-b">{jobPosting.status}</td>
                                <td className="px-4 py-2 border-b">{jobPosting.company_name}</td>
                                <td className="px-4 py-2 border-b">{jobPosting.employer_status}</td>
                                
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
