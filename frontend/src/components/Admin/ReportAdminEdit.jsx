import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ReportAdminEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const admin = JSON.parse(localStorage.getItem("admin"));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("Pending");
  const [adminResponse, setAdminResponse] = useState("");

  /* ================= GET DETAIL REPORT ================= */
  const getReportById = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/talenthub/api/v1/reports/${id}`
      );

      const data = res.data.payload.data;

      setName(data.name);
      setEmail(data.email);
      setMessage(data.message);
      setStatus(data.status);
      setAdminResponse(data.admin_response || "");
    } catch (err) {
      toast.error("Gagal mengambil data laporan");
      navigate("/admin/reportadmin");
    }
  };

  useEffect(() => {
    getReportById();
  }, [id]);

  /* ================= SUBMIT UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      email,
      message,
      status,
      admin_response: adminResponse,
      admin_id: admin?.user_id,
      admin_name: admin?.full_name,
    };

    try {
      await axios.put(
        `http://localhost:3000/talenthub/api/v1/reports/${id}`,
        payload
      );

      toast.success("Laporan berhasil diperbarui");
      setTimeout(() => {
        navigate("/admin/reportadmin");
      }, 1500);
    } catch (err) {
      toast.error("Gagal update laporan");
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded shadow max-w-xl">
        <h2 className="text-xl font-bold mb-4">Edit Laporan</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Nama</label>
            <input
              value={name}
              className="w-full border p-2 rounded"
              disabled
            />
          </div>

          <div>
            <label>Email</label>
            <input
              value={email}
              className="w-full border p-2 rounded"
              disabled
            />
          </div>

          <div>
            <label>Pesan</label>
            <textarea
              value={message}
              className="w-full border p-2 rounded"
              rows={4}
              disabled
            />
          </div>

          <div>
            <label>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Selesai</option>
              <option value="Rejected">Ditolak</option>
            </select>
          </div>

          <div>
            <label>Respon Admin</label>
            <textarea
              value={adminResponse}
              onChange={(e) => setAdminResponse(e.target.value)}
              className="w-full border p-2 rounded"
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Simpan
          </button>
        </form>
      </div>
    </>
  );
}
