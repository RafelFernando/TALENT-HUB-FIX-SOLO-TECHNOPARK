import React, { useEffect, useState } from "react";
import { Plus, X, Trash2, Pencil } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";


export default function PengalamanKerja() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.user_id;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pengalaman, setPengalaman] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    posisi: "",
    level: "",
    perusahaan: "",
    mulai: "",
    selesai: "",
    masihBekerja: false,
    deskripsi: "",
  });

  // =============================
  // GET DATA
  // =============================
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/talenthub/api/v1/cvriwayatkerja/user/${userId}`
      );

      setPengalaman(res.data.payload.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchData();
  }, [userId]);

  // =============================
  // HANDLE INPUT
  // =============================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =============================
  // OPEN EDIT
  // =============================
  const handleEdit = (item) => {
    setEditId(item.id);
    setFormData({
      posisi: item.posisi,
      level: item.level,
      perusahaan: item.perusahaan,
      mulai: item.tanggal_mulai?.slice(0, 10),
      selesai: item.tanggal_selesai?.slice(0, 10),
      masihBekerja: !item.tanggal_selesai,
      deskripsi: item.deskripsi || "",
    });
    setIsModalOpen(true);
  };

  // =============================
  // SAVE (POST / PUT)
  // =============================
  const handleSave = async () => {
    const payload = {
      user_id: userId,
      posisi: formData.posisi,
      level: formData.level,
      perusahaan: formData.perusahaan,
      tanggal_mulai: formData.mulai,
      tanggal_selesai: formData.masihBekerja ? null : formData.selesai,
      deskripsi: formData.deskripsi,
    };

    try {
      if (editId) {
        await axios.put(
          `http://localhost:3000/talenthub/api/v1/cvriwayatkerja/${editId}`,
          payload
        );
      } else {
        await axios.post(
          `http://localhost:3000/talenthub/api/v1/cvriwayatkerja`,
          payload
        );
      }

      setIsModalOpen(false);
      setEditId(null);
      fetchData();
      toast.success("Data berhasil disimpan");
    } catch (err) {
      console.error(err);
      toast.error("Data gagal disimpan");
    }
  };

  // =============================
  // DELETE
  // =============================
  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus data ini?")) return;
    try {
      await axios.delete(
        `http://localhost:3000/talenthub/api/v1/cvriwayatkerja/${id}`
      );
      fetchData();
      toast.success("Data berhasil dihapus");
    } catch (err) {
      console.error(err);
      toast.error("Data gagal dihapus");
    }
  };

  if (loading) return null;

  return (
    <>
      {/* MAIN SECTION */}
      <section className="w-full mt-4 bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 tracking-wide">
            Pengalaman Kerja
          </h2>
          <button
            onClick={() => {
              setEditId(null);
              setFormData({
                posisi: "",
                level: "",
                perusahaan: "",
                mulai: "",
                selesai: "",
                masihBekerja: false,
                deskripsi: "",
              });
              setIsModalOpen(true);
            }}
            className="flex items-center text-[15px] bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
          >
            <Plus size={18} /> Tambah Pengalaman
          </button>
        </div>

        <div className="grid gap-6">
          {pengalaman.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-5 bg-white"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.posisi} ({item.level})
                  </h3>
                  <p className="text-sm text-gray-600 font-medium">
                    {item.perusahaan}
                  </p>
                </div>
                <span className="text-sm text-gray-500 italic">
                  {item.tanggal_mulai?.slice(0, 10)} -{" "}
                  {item.tanggal_selesai
                    ? item.tanggal_selesai.slice(0, 10)
                    : "Sekarang"}
                </span>
              </div>

              <p className="text-gray-700 text-sm mt-3">
                {item.deskripsi || "-"}
              </p>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-lg font-semibold">
                  {editId ? "Edit Pengalaman Kerja" : "Tambah Pengalaman Kerja"}
                </h3>
                <button onClick={() => setIsModalOpen(false)}>
                  <X />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex w-full gap-1">
                  <div className="w-full flex-1">
                    <label className="block text-sm font-medium">Posisi</label>
                    <input name="posisi" value={formData.posisi} onChange={handleChange} className="w-full p-2 border rounded" />
                  </div>

                  <div className="w-full flex-1">
                    <label className="block text-sm font-medium">Level</label>
                    <select name="level" value={formData.level} onChange={handleChange} className="w-full p-2 border rounded">
                      <option value="">Pilih Level</option>
                      <option value="Junior">Junior</option>
                      <option value="Middle">Middle</option>
                      <option value="Senior">Senior</option>
                      <option value="Manager">Manager</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium">Perusahaan</label>
                  <input name="perusahaan" value={formData.perusahaan} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>


                <div className="flex w-full gap-1">
                  <div className="w-full flex-1">
                    <label className="block text-sm font-medium">Tanggal Mulai</label>
                    <input type="date" name="mulai" value={formData.mulai} onChange={handleChange} className="w-full p-2 border rounded" />
                  </div>

                  <div className="w-full flex-1">
                    <label className="block text-sm font-medium">Tanggal Selesai</label>
                    <input type="date" name="selesai" value={formData.selesai} onChange={handleChange} className="w-full p-2 border rounded" disabled={formData.masihBekerja} />
                  </div>
                </div>


                <div>
                  <label className="block text-sm font-medium">Deskripsi</label>
                  <textarea name="deskripsi" value={formData.deskripsi} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>
              </div>

              <div className="flex justify-end gap-3 p-6 border-t">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-red-600 text-white rounded">
                  BATAL
                </button>
                <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded">
                  SIMPAN
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
