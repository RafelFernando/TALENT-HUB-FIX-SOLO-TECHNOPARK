import react from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

export default function PendidikanList() {
    const [pendidikan, setPendidikan] = useState([]);

    const getPendidikan = async () => {
        const response = await axios.get('http://localhost:3000/talenthub/api/v1/pendidikan');
        setPendidikan(response.data.payload.data);
    }

    useEffect(() => {
        getPendidikan();
    }, []);

    const deletePendidikan = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/talenthub/api/v1/pendidikan/${id}`);
            getPendidikan();
            toast.success("Data berhasil dihapus");
        } catch (error) {
            console.error('Error deleting pendidikan:', error);
            toast.error("Gagal hapus data");
        }
    }

    return (
        <div>
            <Link
                to="/admin/pendidikan/tambah"
                className="ml-3 mt-3 mb-3 px-3 py-1 bg-blue-600 text-white rounded-[5px] hover:bg-blue-700 transition"
            >
                Tambah
            </Link>

            <div className=''>

                <table className="mt-4 min-w-full border border-gray-300 bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-700 font-semibold border-b">No</th>
                            <th className="px-4 py-2 text-left text-gray-700 font-semibold border-b">Pendidikan</th>
                            <th className="px-4 py-2 text-center text-gray-700 font-semibold border-b">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {pendidikan.map((pendidikan, index) => (
                            <tr key={pendidikan.id} className="hover:bg-gray-50 transition">
                                <td className="px-4 py-2 border-b">{index + 1}</td>
                                <td className="px-4 py-2 border-b">{pendidikan.pendidikan}</td>
                                <td className="px-4 py-2 border-b text-center space-x-2">
                                    <Link
                                        to={`/admin/pendidikan/edit/${pendidikan.id}`}
                                        className="px-3 py-1 bg-blue-600 text-white rounded-[5px] hover:bg-blue-700 transition"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => deletePendidikan(pendidikan.id)}
                                        className="px-3 py-1 bg-red-600 text-white rounded-[5px] hover:bg-red-700 transition"
                                    >
                                        Hapus
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}