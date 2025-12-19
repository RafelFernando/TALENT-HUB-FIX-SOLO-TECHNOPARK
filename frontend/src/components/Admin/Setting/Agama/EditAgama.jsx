import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";

export default function EditAgama() {
    const [agama, setAgama] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    const updateAgama = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/talenthub/api/v1/agama/${id}`, {
                agama: agama
            });
            toast.success("Data berhasil diubah");
            navigate('/admin/agama');
        } catch (error) {
            console.log(error);
            toast.error("Gagal menambahkan agama");
        }
    }

    const getAgamaById = async () => {
        const response = await axios.get(`http://localhost:3000/talenthub/api/v1/agama/${id}`);
        setAgama(response.data.payload.data.agama);
    }

    useEffect(() => {
        getAgamaById();
    }, []);

    return (
        <div>
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={updateAgama}>

                    {/* Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">
                            Name:
                        </label>
                        <input
                            value={agama}
                            onChange={(e) => setAgama(e.target.value)}
                            type="text"
                            placeholder="Masukkan agama"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg 
                           hover:bg-blue-700 transition font-semibold"
                        >
                            Update
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}