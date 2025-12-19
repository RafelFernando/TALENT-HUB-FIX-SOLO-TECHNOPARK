import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit3, Upload, X, FileText, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FileCv() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.user_id;

    const [cvData, setCvData] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    /* ================= GET CV ================= */
    const getCv = async () => {
        try {
            const res = await axios.get(
                `http://localhost:3000/talenthub/api/v1/cvpdf/user/${userId}`
            );
            setCvData(res.data.payload.data);
            setPreviewUrl(res.data.payload.data.url);
        } catch (err) {
            setCvData(null); // belum ada CV
        }
    };

    useEffect(() => {
        if (userId) getCv();
    }, [userId]);

    /* ================= FILE HANDLER ================= */
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file)); // PREVIEW PDF
    };

    /* ================= UPLOAD / UPDATE ================= */
    const handleUpload = async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("user_id", userId);
        formData.append("file", selectedFile);

        try {
            if (cvData) {
                // UPDATE
                await axios.put(
                    `http://localhost:3000/talenthub/api/v1/cvpdf/${cvData.id}`,
                    formData
                );
            } else {
                // CREATE
                await axios.post(
                    "http://localhost:3000/talenthub/api/v1/cvpdf",
                    formData
                );
            }

            setIsModalOpen(false);
            setSelectedFile(null);
            getCv();
        } catch (err) {
            alert("Gagal upload CV");
        } finally {
            setIsUploading(false);
        }
    };

    /* ================= DELETE ================= */
    const handleDelete = async () => {
        if (!cvData) return;
        if (!confirm("Hapus CV?")) return;

        try {
            await axios.delete(
                `http://localhost:3000/talenthub/api/v1/cvpdf/${cvData.id}`
            );
            setCvData(null);
            setPreviewUrl("");
        } catch (err) {
            alert("Gagal hapus CV");
        }
    };

    const getImageUrl = (selectedFile) => {
        if (!selectedFile) {
            return "https://via.placeholder.com/80?text=No+Image";
        }

        return `http://localhost:3000/uploads/cv/${selectedFile}`;
    };

    return (
        <>
            {/* CARD */}
            <div className="bg-white p-8 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">File CV</h2>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            <Edit3 size={16} /> {cvData ? "Edit" : "Upload"}
                        </button>

                        {cvData && (
                            <button
                                onClick={handleDelete}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded"
                            >
                                <Trash2 size={16} /> Hapus
                            </button>
                        )}
                    </div>
                </div>

                {previewUrl ? (
    <iframe
        src={previewUrl}
        title="Preview CV"
        className="w-full h-[500px] border rounded"
    />
) : (
    <p className="text-gray-500 text-center">
        Belum ada CV diupload
    </p>
)}

            </div>


            {/* MODAL */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-lg p-6 w-full max-w-lg"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                        >
                            <h3 className="text-lg font-semibold mb-4">
                                Upload CV
                            </h3>

                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                            />

                            {previewUrl && (
                                <iframe
                                    src={previewUrl}
                                    className="w-full h-64 mt-4 border rounded"
                                />
                            )}

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-2 bg-gray-200 rounded"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleUpload}
                                    disabled={isUploading}
                                    className="flex-1 py-2 bg-blue-600 text-white rounded"
                                >
                                    {isUploading ? "Mengupload..." : "Simpan"}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
