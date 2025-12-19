import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function ReportAdmin() {
  const [reports, setReports] = useState([]);

  const getReport = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/talenthub/api/v1/reports"
      );
      setReports(response.data.payload.data);
    } catch (error) {
      console.error("Gagal mengambil data report:", error);
    }
  };

  useEffect(() => {
    getReport();
  }, []);

  return (
    <div>
      <table className="mt-4 min-w-full border border-gray-300 bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border-b">No</th>
            <th className="px-4 py-2 border-b text-left">Nama</th>
            <th className="px-4 py-2 border-b text-left">Email</th>
            <th className="px-4 py-2 border-b text-left">Pesan</th>
            <th className="px-4 py-2 border-b text-left">Status</th>
            <th className="px-4 py-2 border-b text-left">Keterangan</th>
            <th className="px-4 py-2 border-b text-left">Admin</th>
            <th className="px-4 py-2 border-b text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {reports.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4">
                Data belum ada
              </td>
            </tr>
          ) : (
            reports.map((report, index) => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">{report.name}</td>
                <td className="px-4 py-2 border-b">{report.email}</td>
                <td className="px-4 py-2 border-b">{report.message}</td>
                <td className="px-4 py-2 border-b">{report.status}</td>
                <td className="px-4 py-2 border-b">{report.admin_response}</td>
                <td className="px-4 py-2 border-b">{report.admin_name}</td>
                <td className="px-4 py-2 border-b">
                  <Link
                    to={`/admin/report/edit/${report.report_id}`}
                    className="px-3 py-1 bg-blue-600 text-white rounded-[5px] hover:bg-blue-700 transition"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
