import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";

export default function NotifikasiAdminEdit() {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [userId, setUserId] = useState("");   // 🔥 penting
    const [users, setUsers] = useState([]);     // 🔥 list user

    const navigate = useNavigate();
    const { id } = useParams();

    // 🔹 Ambil semua user
    const getUsers = async () => {
        const res = await axios.get(
            "http://localhost:3000/talenthub/api/v1/users"
        );
        setUsers(res.data.payload.data);
    };

    // 🔹 Ambil data notifikasi by id
    const getNotifikasiById = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/talenthub/api/v1/admin/notifikasi/${id}`
            );

            const data = response.data.payload.data; // ✅ OBJECT

            setTitle(data.title);
            setMessage(data.message);
            setType(data.type);
            setUserId(String(data.user_id)); // 🔥 penting untuk <select>
        } catch (error) {
            console.log(error);
            toast.error("Gagal mengambil data notifikasi");
        }
    };


    // 🔹 Update notifikasi
    const updateNotifikasi = async (e) => {
        e.preventDefault();

        try {
            await axios.put(
                `http://localhost:3000/talenthub/api/v1/admin/notifikasi/${id}`,
                {
                    title,
                    message,
                    type,
                    user_id: userId
                }
            );

            toast.success("Data berhasil diubah");
            navigate('/admin/notifikasi');
        } catch (error) {
            console.log(error);
            toast.error("Gagal mengubah notifikasi");
        }
    };

    useEffect(() => {
        getUsers();
        getNotifikasiById();
    }, []);

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={updateNotifikasi}>
                <div className="mb-4">

                    {/* USER */}
                    <label className="block text-gray-700 font-medium mb-1">
                        User
                    </label>
                    <select
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">-- Pilih User --</option>
                        {users.map((user) => (
                            <option key={user.user_id} value={user.user_id}>
                                {user.full_name}
                            </option>
                        ))}
                    </select>

                    {/* JUDUL */}
                    <label className="block text-gray-700 font-medium mt-3 mb-1">
                        Judul
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                    />

                    {/* PESAN */}
                    <label className="block text-gray-700 font-medium mt-3 mb-1">
                        Pesan
                    </label>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                    />

                    {/* TIPE */}
                    <label className="block text-gray-700 font-medium mt-3 mb-1">
                        Tipe
                    </label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                    >
                        <option value="">-- Pilih Tipe Notifikasi --</option>
                        <option value="Pembaharuan">Pembaharuan</option>
                        <option value="Transaksi">Transaksi</option>
                        <option value="Pengguna">Pengguna</option>
                    </select>

                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                    Simpan
                </button>
            </form>
        </div>
    );
}
