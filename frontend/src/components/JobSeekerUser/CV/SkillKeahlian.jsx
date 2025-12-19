import React, { useEffect, useState } from "react";
import { Edit3, X, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

export default function SkillKeahlian() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.user_id;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    // =============================
    // GET DATA SKILL
    // =============================
    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/talenthub/api/v1/cvskill/user/${userId}`
                );
                setSkills(res.data.payload.data);
            } catch (err) {
                console.error("Gagal mengambil data skill", err);
            } finally {
                setLoading(false);
            }
        };

        if (userId) fetchSkills();
    }, [userId]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // =============================
    // TAMBAH SKILL BARU (STATE)
    // =============================
    const addSkill = () => {
        setSkills([...skills, { id: null, skill: "", level: "Beginner" }]);
    };

    // =============================
    // DELETE SKILL
    // =============================
    const removeSkill = async (index) => {
        const item = skills[index];

        // jika sudah ada di DB → delete backend
        if (item.id) {
            try {
                await axios.delete(
                    `http://localhost:3000/talenthub/api/v1/cvskill/${item.id}`
                );
            } catch (err) {
                console.error("Gagal menghapus skill", err);
                return;
            }
        }

        // hapus dari state
        setSkills(skills.filter((_, i) => i !== index));
    };

    // =============================
    // HANDLE INPUT
    // =============================
    const handleChange = (index, field, value) => {
        const updated = [...skills];
        updated[index][field] = value;
        setSkills(updated);
    };

    // =============================
    // POST & PUT
    // =============================
    const handleSave = async () => {
        try {
            for (const item of skills) {
                // UPDATE
                if (item.id) {
                    await axios.put(
                        `http://localhost:3000/talenthub/api/v1/cvskill/${item.id}`,
                        {
                            skill: item.skill,
                            level: item.level
                        }
                    );
                }
                // CREATE
                else if (item.skill.trim() !== "") {
                    await axios.post(
                        `http://localhost:3000/talenthub/api/v1/cvskill`,
                        {
                            user_id: userId,
                            skill: item.skill,
                            level: item.level
                        }
                    );
                }
            }

            setIsModalOpen(false);
            toast.success("Data berhasil disimpan");
        } catch (err) {
            console.error("Gagal menyimpan skill", err);
            toast.success("Data gagal disimpan");
        }
    };

    if (loading) return null;

    return (
        <>
            {/* CARD */}
            <div className="bg-white p-8 mt-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-semibold text-gray-800">
                        Skill / Keahlian
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
                    {skills.map((item, i) => (
                        <li
                            key={i}
                            className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg text-sm"
                        >
                            {item.skill} — {item.level}
                        </li>
                    ))}
                </ul>
            </div>

            {/* MODAL */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl"
                            initial={{ scale: 0.8, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 30 }}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b">
                                <h3 className="text-lg font-semibold">
                                    Edit Skill / Keahlian
                                </h3>
                                <button onClick={closeModal}>
                                    <X />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-6 space-y-4">
                                {skills.map((item, index) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
                                    >
                                        <input
                                            value={item.skill}
                                            onChange={(e) =>
                                                handleChange(
                                                    index,
                                                    "skill",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Skill"
                                            className="p-2 border rounded"
                                        />

                                        <select
                                            value={item.level}
                                            onChange={(e) =>
                                                handleChange(
                                                    index,
                                                    "level",
                                                    e.target.value
                                                )
                                            }
                                            className="p-2 border rounded"
                                        >
                                            <option>Beginner</option>
                                            <option>Intermediate</option>
                                            <option>Advanced</option>
                                            <option>Professional</option>
                                        </select>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() =>
                                                    removeSkill(index)
                                                }
                                                className="bg-red-600 text-white p-3 rounded"
                                            >
                                                <Minus size={16} />
                                            </button>

                                            {index === skills.length - 1 && (
                                                <button
                                                    onClick={addSkill}
                                                    className="bg-green-600 text-white p-3 rounded"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer */}
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
