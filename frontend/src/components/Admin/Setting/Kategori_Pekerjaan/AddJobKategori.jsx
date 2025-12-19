import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
 
export default function AddJobKategori() {
    const [kategori, setKategori] = useState("");
    const [status, setStatus] = useState('Active');
    const navigate = useNavigate();

    const saveKategori = async (e) => {
        e.preventDefault();

        if (!kategori.trim()) {
            alert("Kategori pekerjaan tidak boleh kosong");
            return;
        }

        try {
            await axios.post("http://localhost:3000/talenthub/api/v1/job_categories", {
                name: kategori,
                status: status
            });

            toast.success("Data berhasil disimpan");
            navigate("/admin/JobKategori");
        } catch (error) {
            console.error("Error tambah Kategori Pekerjaan:", error.response?.data || error);
            toast.error("Gagal menambahkan Kategori Pekerjaan");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={saveKategori}>
                {/* Kategori */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                        Kategori Pekerjaan
                    </label>
                    <input
                        type="text"
                        value={kategori}
                        onChange={(e) => setKategori(e.target.value)}
                        placeholder="Masukkan kategori pekerjaan"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Status */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                        Status:
                    </label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="active">Aktif</option>
                        <option value="inactive">Non Aktif</option>
                    </select>
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg
          hover:bg-blue-700 transition font-semibold"
                >
                    Simpan
                </button>
            </form>
        </div>
    );
}