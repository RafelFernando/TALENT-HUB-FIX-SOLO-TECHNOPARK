import React, { useEffect, useState } from "react";
import { Edit3, X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

export default function TentangSaya() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.user_id;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deskripsi, setDeskripsi] = useState("");
    const [tempDeskripsi, setTempDeskripsi] = useState("");
    const [aboutMeId, setAboutMeId] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔹 Ambil data dari backend
    useEffect(() => {
        const fetchAboutMe = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/talenthub/api/v1/aboutme/user/${userId}`
                );

                if (res.data.payload.data.length > 0) {
                    const data = res.data.payload.data[0];
                    setDeskripsi(data.deskripsi);
                    setTempDeskripsi(data.deskripsi);
                    setAboutMeId(data.id); // penting untuk PUT
                }
            } catch (error) {
                console.error("Gagal mengambil data Tentang Saya", error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) fetchAboutMe();
    }, [userId]);

    // 🔹 Simpan (POST / PUT)
    const handleSave = async () => {
        try {
            if (aboutMeId) {
                // UPDATE
                await axios.put(
                    `http://localhost:3000/talenthub/api/v1/aboutme/${aboutMeId}`,
                    { deskripsi: tempDeskripsi }
                );
            } else {
                // CREATE
                const res = await axios.post(
                    `http://localhost:3000/talenthub/api/v1/aboutme`,
                    {
                        user_id: userId,
                        deskripsi: tempDeskripsi
                    }
                );
                setAboutMeId(res.data.payload.data.insertId);
            }

            setDeskripsi(tempDeskripsi);
            setIsModalOpen(false);
            toast.success("Data berhasil disimpan");
            
        } catch (error) {
            console.error("Gagal menyimpan Tentang Saya", error);
            toast.error("Data gagal disimpan");
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTempDeskripsi(deskripsi);
    };

    if (loading) return null;

    return (
        <>
            <div className="bg-white p-8 mt-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-semibold text-gray-800">
                        Tentang Saya
                    </span>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition"
                    >
                        {aboutMeId ? <Edit3 size={18} /> : <Plus size={18} />}
                        {aboutMeId ? "Edit" : "Tambah"}
                    </button>
                </div>

                <hr className="h-px bg-gray-300 border-0" />

                <div className="mt-4 text-gray-700 leading-relaxed">
                    {deskripsi || "Belum ada deskripsi tentang Anda."}
                </div>
            </div>

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
                            initial={{ scale: 0.8, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 30 }}
                        >
                            <div className="flex items-center justify-between p-6 border-b">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {aboutMeId ? "Edit Tentang Saya" : "Tambah Tentang Saya"}
                                </h3>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-6">
                                <label className="block text-xl font-medium text-gray-700 mb-2">
                                    Deskripsi
                                </label>
                                <textarea
                                    rows="5"
                                    value={tempDeskripsi}
                                    onChange={(e) => setTempDeskripsi(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="Tulis deskripsi tentang diri Anda..."
                                />

                                <div className="flex gap-3 mt-6">
                                    <button
                                        onClick={closeModal}
                                        className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="flex-1 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
