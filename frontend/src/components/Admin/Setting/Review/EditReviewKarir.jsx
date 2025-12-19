import react from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";

export default function EditReviewKarir() {
    const [nama, setNama] = useState("");
    const [pekerjaan, setPekerjaan] = useState("");
    const [komentar, setKomentar] = useState("");
    const [gambar, setGambar] = useState("");
    const [preview, setPreview] = useState("");
    const { id } = useParams();

    const getReviewKarirById = async () => {
        const response = await axios.get(`http://localhost:3000/talenthub/api/v1/review_karir/${id}`);
        setNama(response.data.payload.data.nama);
        setPekerjaan(response.data.payload.data.pekerjaan);
        setKomentar(response.data.payload.data.komentar);
        setGambar(response.data.payload.data.gambar);
        setPreview(response.data.payload.data.url);
    }

    useEffect(() => {
        getReviewKarirById();
    }, []);

    const navigate = useNavigate();

    const loadImage = (e) => {
        const image = e.target.files[0];
        setGambar(image);
        setPreview(URL.createObjectURL(image));
    }

    const updateReviewKarir = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nama", nama);
        formData.append("pekerjaan", pekerjaan);
        formData.append("komentar", komentar);

        // Hanya append file jika user memilih gambar baru
        if (typeof gambar === "object") {
            formData.append("gambar", gambar);
        }

        try {
            await axios.put(`http://localhost:3000/talenthub/api/v1/review_karir/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Data berhasil diubah");
            navigate("/admin/reviewkarir");
        } catch (error) {
            console.log(error);
            toast.error("Gagal menambahkan review karir");
        }
    };

    return (
        <div>
            <div>
                <form onSubmit={updateReviewKarir}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nama :
                    </label>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="nama"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            placeholder="Masukkan nama "
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pekerjaan :
                    </label>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="pekerjaan"
                            value={pekerjaan}
                            onChange={(e) => setPekerjaan(e.target.value)}
                            placeholder="Masukkan pekerjaan"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Komentar :
                    </label>
                    <div className="mb-4">
                        <textarea
                            name="komentar"
                            value={komentar}
                            onChange={(e) => setKomentar(e.target.value)}
                            placeholder="Masukkan komentar"
                            rows={1}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none overflow-hidden"
                            onInput={(e) => {
                                e.target.style.height = "auto";
                                e.target.style.height = e.target.scrollHeight + "px";
                            }}
                        ></textarea>
                    </div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gambar:
                    </label>
                    <div>
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                                type="file"
                                name="gambar"
                                onChange={loadImage}
                                className="hidden"
                            />
                            <span className="text-gray-600 text-sm">
                                Klik untuk memilih file
                            </span>
                        </label>
                    </div>

                    {preview ? (
                        <figure>
                            <img src={preview} alt="Preview Image" />
                        </figure>
                    ) : (
                        ""
                    )}

                    <div className="mt-4">
                        <div>
                            <button
                                type="submit"
                                className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                            >
                                Update
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}