import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddAgama() {
  const [agama, setAgama] = useState("");
  const navigate = useNavigate();

  const saveAgama = async (e) => {
    e.preventDefault();

    if (!agama.trim()) {
      toast.warning("Data agama tidak boleh kosong");
      return;
    }

    try {
      await axios.post("http://localhost:3000/talenthub/api/v1/agama", {
        agama: agama
      });

      toast.success("Data berhasil disimpan");
      navigate("/admin/agama");
    } catch (error) {
      console.error("Error tambah agama:", error.response?.data || error);
      toast.error("Gagal menambahkan agama");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={saveAgama}>
        {/* Agama */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Agama
          </label>
          <input
            type="text"
            value={agama}
            onChange={(e) => setAgama(e.target.value)}
            placeholder="Masukkan Agama"
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
