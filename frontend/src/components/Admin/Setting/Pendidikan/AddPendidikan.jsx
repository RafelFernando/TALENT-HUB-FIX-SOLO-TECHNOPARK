import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddPendidikan() {
    const [pendidikan, setPendidikan] = useState("");
    const navigate = useNavigate();

    const savePendidikan = async (e) => {
        e.preventDefault();

        if (!pendidikan.trim()) {
            toast.warning("Pendidikan tidak boleh kosong");
            return;
        }

        try {
            await axios.post("http://localhost:3000/talenthub/api/v1/pendidikan", {
                pendidikan: pendidikan
            });

            toast.success("Data berhasil disimpan");
            navigate("/admin/pendidikan");
        } catch (error) {
            console.error("Error tambah pendidikan:", error.response?.data || error);
            toast.error("Gagal menambahkan pendidikan");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={savePendidikan}>
                {/* Agama */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                        Pendidikan
                    </label>
                    <input
                        type="text"
                        value={pendidikan}
                        onChange={(e) => setPendidikan(e.target.value)}
                        placeholder="Masukkan Pendidikan"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
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