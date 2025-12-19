import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function NotifikasiAdminAdd() {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [userId, setUserId] = useState(""); // 🔥 user_id
    const [users, setUsers] = useState([]);   // 🔥 list user

    const navigate = useNavigate();

    // ambil data users
    const getUsers = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/talenthub/api/v1/users"
            );
            setUsers(response.data.payload.data);
        } catch (error) {
            toast.error("Gagal mengambil data user");
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const saveNotifikasi = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.warning("Data judul tidak boleh kosong");
            return;
        }

        if (!message.trim()) {
            toast.warning("Data pesan tidak boleh kosong");
            return;
        }

        if (!type.trim()) {
            toast.warning("Data tipe tidak boleh kosong");
            return;
        }

        if (!userId) {
            toast.warning("Silakan pilih user");
            return;
        }

        try {
            await axios.post(
                "http://localhost:3000/talenthub/api/v1/admin/notifikasi",
                {
                    title,
                    message,
                    type,
                    user_id: userId // 🔥 dikirim user_id
                }
            );

            toast.success("Data berhasil disimpan");
            navigate("/admin/notifikasi");
        } catch (error) {
            console.error("Error tambah notifikasi:", error.response?.data || error);
            toast.error("Gagal menambahkan notifikasi");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={saveNotifikasi}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                        Judul
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Masukkan Judul"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label className="block text-gray-700 font-medium mb-1 mt-3">
                        Pesan
                    </label>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Masukkan Pesan"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label className="block text-gray-700 font-medium mb-1 mt-3">
                        Tipe
                    </label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">-- Pilih Tipe Notifikasi --</option>
                        <option value="Pembaharuan">Pembaharuan</option>
                        <option value="Transaksi">Transaksi</option>
                        <option value="Pengguna">Pengguna</option>
                    </select>

                    {/* 🔥 SELECT USER */}
                    <label className="block text-gray-700 font-medium mb-1 mt-3">
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
                </div>

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
