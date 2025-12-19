import react from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

export default function AgamaList() {
    const [agama, setAgama] = useState([]);

    const getAgama = async () => {
        const response = await axios.get('http://localhost:3000/talenthub/api/v1/agama');
        setAgama(response.data.payload.data);
    }

    useEffect(() => {
        getAgama();
    }, []);

    const deleteAgama = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/talenthub/api/v1/agama/${id}`);
            toast.success("Data berhasil dihapus");
            getAgama();
        } catch (error) {
            toast.error("Gagal hapus data");
        }
    }


    return (
        <div>
            <Link
                to="/admin/agama/tambah"
                className="ml-3 mt-3 mb-3 px-3 py-1 bg-blue-600 text-white rounded-[5px] hover:bg-blue-700 transition"
            >
                Tambah
            </Link>

            <div className=''>

                <table className="mt-4 min-w-full border border-gray-300 bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-700 font-semibold border-b">No</th>
                            <th className="px-4 py-2 text-left text-gray-700 font-semibold border-b">Agama</th>
                            <th className="px-4 py-2 text-center text-gray-700 font-semibold border-b">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {agama.map((agama, index) => (
                            <tr key={agama.id} className="hover:bg-gray-50 transition">
                                <td className="px-4 py-2 border-b">{index + 1}</td>
                                <td className="px-4 py-2 border-b">{agama.agama}</td>
                                <td className="px-4 py-2 border-b text-center space-x-2">
                                    <Link
                                        to={`/admin/agama/edit/${agama.id}`}
                                        className="px-3 py-1 bg-blue-600 text-white rounded-[5px] hover:bg-blue-700 transition"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => deleteAgama(agama.id)}
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