import React, { useEffect, useState } from "react";
import { Edit3, X, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

export default function Bahasa() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.user_id;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true);

    // =============================
    // GET DATA
    // =============================
    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/talenthub/api/v1/cvbahasa/user/${userId}`
                );
                setLanguages(res.data.payload.data);
            } catch (err) {
                console.error("Gagal mengambil data bahasa", err);
            } finally {
                setLoading(false);
            }
        };

        if (userId) fetchLanguages();
    }, [userId]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // =============================
    // TAMBAH INPUT
    // =============================
    const addLanguage = () => {
        setLanguages([...languages, { id: null, bahasa: "" }]);
    };

    // =============================
    // DELETE
    // =============================
    const removeLanguage = async (index) => {
        const item = languages[index];

        // Jika data dari DB → delete backend
        if (item.id) {
            try {
                await axios.delete(
                    `http://localhost:3000/talenthub/api/v1/cvbahasa/${item.id}`
                );
            } catch (error) {
                console.error("Gagal menghapus bahasa", error);
                return;
            }
        }

        // Hapus dari state
        setLanguages(languages.filter((_, i) => i !== index));
    };

    // =============================
    // HANDLE INPUT
    // =============================
    const handleChange = (index, value) => {
        const updated = [...languages];
        updated[index].bahasa = value;
        setLanguages(updated);
    };

    // =============================
    // POST & PUT
    // =============================
    const handleSave = async () => {
        try {
            for (const item of languages) {
                // UPDATE
                if (item.id) {
                    await axios.put(
                        `http://localhost:3000/talenthub/api/v1/cvbahasa/${item.id}`,
                        { bahasa: item.bahasa }
                    );
                }
                // CREATE
                else if (item.bahasa.trim() !== "") {
                    await axios.post(
                        `http://localhost:3000/talenthub/api/v1/cvbahasa`,
                        {
                            user_id: userId,
                            bahasa: item.bahasa
                        }
                    );
                }
            }

            setIsModalOpen(false);
            toast.success("Data berhasil disimpan");
        } catch (error) {
            console.error("Gagal menyimpan bahasa", error);
            toast.error("Data gagal disimpan");
        }
    };

    if (loading) return null;

    return (
        <>
            {/* CARD */}
            <div className="bg-white p-8 mt-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-semibold text-gray-800">
                        Bahasa yang Dikuasai
                    </span>
                    <button
                        onClick={openModal}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <Edit3 size={18} /> Edit
                    </button>
                </div>

                <hr className="h-px bg-gray-300 border-0" />

                <ul className="flex flex-wrap gap-3 mt-4">
                    {languages.map((item, i) => (
                        <li
                            key={i}
                            className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg"
                        >
                            {item.bahasa}
                        </li>
                    ))}
                </ul>
            </div>

            {/* MODAL */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-xl w-full max-w-lg"
                            initial={{ scale: 0.9, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 30 }}
                        >
                            <div className="flex justify-between p-6 border-b">
                                <h3 className="font-semibold text-lg">
                                    Edit Bahasa
                                </h3>
                                <button onClick={closeModal}>
                                    <X />
                                </button>
                            </div>

                            <div className="p-6 space-y-4">
                                {languages.map((item, index) => (
                                    <div key={index} className="flex gap-3">
                                        <input
                                            value={item.bahasa}
                                            onChange={(e) =>
                                                handleChange(index, e.target.value)
                                            }
                                            className="flex-1 p-2 border rounded"
                                        />

                                        <button
                                            onClick={() => removeLanguage(index)}
                                            className="bg-red-600 text-white p-3 rounded"
                                        >
                                            <Minus size={16} />
                                        </button>

                                        {index === languages.length - 1 && (
                                            <button
                                                onClick={addLanguage}
                                                className="bg-green-600 text-white p-3 rounded"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end gap-3 p-6 border-t">
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-red-600 text-white rounded"
                                >
                                    BATAL
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-green-600 text-white rounded"
                                >
                                    UBAH
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
