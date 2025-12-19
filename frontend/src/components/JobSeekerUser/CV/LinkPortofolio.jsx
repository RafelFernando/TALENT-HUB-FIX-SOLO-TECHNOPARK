import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, X, Trash2, Pencil } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const API_URL = "http://localhost:3000/talenthub/api/v1/cvporto";

export default function LinkPortofolio() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.user_id;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [namaPortofolio, setNamaPortofolio] = useState("");
    const [linkPortofolio, setLinkPortofolio] = useState("");
    const [portfolios, setPortfolios] = useState([]);

    // =============================
    // GET DATA
    // =============================
    const fetchPortfolios = async () => {
        try {
            const res = await axios.get(`${API_URL}/user/${userId}`);
            setPortfolios(res.data.payload.data);
        } catch (err) {
            console.error("Gagal mengambil data portofolio", err);
        }
    };

    useEffect(() => {
        fetchPortfolios();
    }, []);

    // =============================
    // SUBMIT (POST / PUT)
    // =============================
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!namaPortofolio || !linkPortofolio) return;

        try {
            if (isEdit) {
                // UPDATE
                await axios.put(`${API_URL}/${selectedId}`, {
                    nama: namaPortofolio,
                    link: linkPortofolio,
                });
            } else {
                // CREATE
                await axios.post(API_URL, {
                    user_id: userId,
                    nama: namaPortofolio,
                    link: linkPortofolio,
                });
            }

            resetForm();
            fetchPortfolios();
            toast.success("Data berhasil disimpan");
        } catch (err) {
            console.error("Gagal menyimpan data", err);
            toast.error("Data gagal disimpan");
        }
    };

    // =============================
    // EDIT
    // =============================
    const handleEdit = (item) => {
        setIsEdit(true);
        setSelectedId(item.id);
        setNamaPortofolio(item.nama);
        setLinkPortofolio(item.link);
        setIsModalOpen(true);
    };

    // =============================
    // DELETE
    // =============================
    const handleDelete = async (id) => {
        if (!window.confirm("Yakin ingin menghapus portofolio ini?")) return;

        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchPortfolios();
            toast.success("Data berhasil dihapus");
        } catch (err) {
            console.error("Gagal menghapus data", err);
            toast.error("Data gagal dihapus");
        }
    };

    const resetForm = () => {
        setNamaPortofolio("");
        setLinkPortofolio("");
        setIsEdit(false);
        setSelectedId(null);
        setIsModalOpen(false);
    };

    return (
        <>
            {/* Main Section */}
            <section className="bg-white p-8 mt-4 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Link Portofolio
                    </h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition"
                    >
                        <Plus size={18} /> Tambahkan Portofolio
                    </button>
                </div>

                <hr className="h-px bg-gray-300 border-0" />

                {/* Daftar Portofolio */}
                <div className="mt-4 flex flex-wrap gap-3">
                    {portfolios.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-2 px-4 py-2 border border-blue-500 rounded-lg"
                        >
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                {item.nama}
                            </a>

                            <button
                                onClick={() => handleEdit(item)}
                                className="text-yellow-500 hover:text-yellow-600"
                            >
                                <Pencil size={16} />
                            </button>

                            <button
                                onClick={() => handleDelete(item.id)}
                                className="text-red-500 hover:text-red-600"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                        >
                            <div className="flex items-center justify-between p-6 border-b">
                                <h3 className="text-lg font-semibold">
                                    {isEdit ? "Edit Portofolio" : "Tambah Portofolio"}
                                </h3>
                                <button onClick={resetForm}>
                                    <X />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <input
                                    type="text"
                                    placeholder="Nama Portofolio"
                                    value={namaPortofolio}
                                    onChange={(e) => setNamaPortofolio(e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                />
                                <input
                                    type="url"
                                    placeholder="Link Portofolio"
                                    value={linkPortofolio}
                                    onChange={(e) => setLinkPortofolio(e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                />

                                <div className="flex justify-end gap-3 pt-4 border-t">
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="px-4 py-2 bg-red-600 text-white rounded-md"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-green-600 text-white rounded-md"
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
