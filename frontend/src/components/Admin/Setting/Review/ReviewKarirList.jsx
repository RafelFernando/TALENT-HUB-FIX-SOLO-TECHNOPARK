import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ReviewKarirList() {
    const [reviewKarir, setReviewKarir] = useState([]);

    const getReviewKarir = async () => {
        const response = await axios.get("http://localhost:3000/talenthub/api/v1/review_karir");
        setReviewKarir(response.data.payload.data);
    }

    useEffect(() => {
        getReviewKarir();
    }, []);

    const deleteReviewKarir = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/talenthub/api/v1/review_karir/${id}`);
            getReviewKarir();
            toast.success("Data berhasil dihapus");
        } catch (error) {
            console.log(error);
            toast.error("Gagal hapus data");
        }
    }

    const getImageUrl = (filename) => {
        if (!filename) {
            return "https://via.placeholder.com/80?text=No+Image";
        }

        return `http://localhost:3000/uploads/reviews/${filename}`;
    };

    return (
        <div>
            <Link
                to="/admin/reviewkarir/tambah"
                className="ml-3 mt-3 mb-3 px-3 py-1 bg-blue-600 text-white rounded-[5px] hover:bg-blue-700 transition"
            >
                Tambah
            </Link>

            <div className=''>

                <table className="mt-4 min-w-full border border-gray-300 bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-700 font-semibold border-b">No</th>
                            <th className="px-4 py-2 text-left text-gray-700 font-semibold border-b">Nama</th>
                            <th className="px-4 py-2 text-left text-gray-700 font-semibold border-b">Pekerjaan</th>
                            <th className="px-4 py-2 text-left text-gray-700 font-semibold border-b">Komentar</th>
                            <th className="px-4 py-2 text-left text-gray-700 font-semibold border-b">Gambar</th>
                            <th className="px-4 py-2 text-center text-gray-700 font-semibold border-b">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {reviewKarir.map((reviewKarir, index) => (
                            <tr key={reviewKarir.id} className="hover:bg-gray-50 transition">
                                <td className="px-4 py-2 border-b">{index + 1}</td>
                                <td className="px-4 py-2 border-b">{reviewKarir.nama}</td>
                                <td className="px-4 py-2 border-b">{reviewKarir.pekerjaan}</td>
                                <td className="px-4 py-2 border-b">{reviewKarir.komentar}</td>
                                <td className="px-4 py-2 border-b">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200">
                                        <img
                                        src={getImageUrl(reviewKarir.gambar)}
                                        className="w-full h-full"
                                        onError={(e) => {
                                            e.target.src = "https://via.placeholder.com/80?text=No+Image";
                                            e.target.onerror = null;
                                        }}
                                    />
                                    </div>
                                </td>
                                <td className="px-4 py-2 border-b text-center space-x-2 gap-2">
                                    <Link
                                        to={`/admin/reviewkarir/edit/${reviewKarir.id}`}
                                        className="mb-2 px-3 py-1 bg-blue-600 text-white rounded-[5px] hover:bg-blue-700 transition"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => deleteReviewKarir(reviewKarir.id)}
                                        className="px-3 py-1 bg-red-600 text-white rounded-[5px] hover:bg-red-700 transition"
                                    >
                                        Hapus
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}