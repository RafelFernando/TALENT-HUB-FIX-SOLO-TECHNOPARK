import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";

export default function EditJobKategori() {
    const [kategori, setKategori] = useState("");
    const [status, setStatus] = useState("active");
    const navigate = useNavigate();
    const { id } = useParams();

    const updateKategori = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:3000/talenthub/api/v1/job_categories/${id}`,
                {
                    name: kategori,
                    status: status
                }
            );
            toast.success("Data berhasil diubah");
            navigate('/admin/JobKategori');
        } catch (error) {
            console.log(error);
            toast.error("Gagal menambahkan kategori pekerjaan");
        }
    };

    const getKategoriById = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/talenthub/api/v1/job_categories/${id}`
            );

            const data = response.data.payload.data;

            setKategori(data.name);
            setStatus(data.status.toLowerCase());
        } catch (error) {
            console.log("Gagal ambil data kategori:", error);
        }
    };

    useEffect(() => {
        if (id) getKategoriById();
    }, [id]);

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={updateKategori}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                        Kategori Pekerjaan
                    </label>
                    <input
                        value={kategori}
                        onChange={(e) => setKategori(e.target.value)}
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                        Status
                    </label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                    >
                        <option value="active">Aktif</option>
                        <option value="inactive">Tidak Aktif</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                    Update
                </button>
            </form>
        </div>
    );
}
