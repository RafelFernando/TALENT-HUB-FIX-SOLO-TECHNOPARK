import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function BiodataEdit() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [genderList, setGenderList] = useState([]);
    const [agamaList, setAgamaList] = useState([]);
    const [pendidikanList, setPendidikanList] = useState([]);
    const [oldProfil, setOldProfil] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.user_id;

    const [form, setForm] = useState({
        nik: "",
        birth_date: "",
        birth_place: "",
        gender: "",
        domicile: "",
        last_education: "",
        religion: "",
    });

    const [profil, setProfil] = useState(null);
    const [preview, setPreview] = useState("");

    const getDetail = async () => {
        try {
            const res = await axios.get(
                `http://localhost:3000/talenthub/api/v1/user_profiles/${id}`
            );

            const data = res.data.payload.data;

            setForm({
                nik: data.nik,
                birth_date: data.birth_date
                    ? data.birth_date.split("T")[0]
                    : "",
                birth_place: data.birth_place,
                gender: data.gender,
                domicile: data.domicile,
                last_education: data.last_education,
                religion: data.religion,
            });

            setPreview(data.url);
            setOldProfil(data.profil);
            setPreview(data.url);

        } catch (err) {
            console.error("Gagal ambil data:", err);
        }
    };

    const getMasterData = async () => {
        try {
            const [genderRes, agamaRes, pendidikanRes] = await Promise.all([
                axios.get("http://localhost:3000/talenthub/api/v1/gender"),
                axios.get("http://localhost:3000/talenthub/api/v1/agama"),
                axios.get("http://localhost:3000/talenthub/api/v1/pendidikan"),
            ]);

            setGenderList(genderRes.data.payload.data);
            setAgamaList(agamaRes.data.payload.data);
            setPendidikanList(pendidikanRes.data.payload.data);
        } catch (err) {
            console.error("Gagal ambil master data:", err);
        }
    };

    useEffect(() => {
        getDetail();
        getMasterData();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        setProfil(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("user_id", userId); // WAJIB
        Object.keys(form).forEach((key) => {
            formData.append(key, form[key]);
        });

        if (profil) {
            formData.append("profil", profil);
        } else {
            formData.append("old_profil", oldProfil);
        }
 

        try {
            await axios.put(
                `http://localhost:3000/talenthub/api/v1/user_profiles/${id}`,
                formData
            );

            toast.success("Data berhasil disimpan");
            navigate("/seeker/cv");
        } catch (err) {
            console.error("Gagal update:", err);
            toast.error("Gagal update biodata");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Edit Biodata</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded border"
                    />
                )}

                <input type="file" onChange={handleImage} />

                <input
                    type="text"
                    name="nik"
                    value={form.nik}
                    onChange={handleChange}
                    placeholder="NIK"
                    className="w-full border p-2 rounded"
                />

                <input
                    type="date"
                    name="birth_date"
                    value={form.birth_date}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="text"
                    name="birth_place"
                    value={form.birth_place}
                    onChange={handleChange}
                    placeholder="Tempat Lahir"
                    className="w-full border p-2 rounded"
                />

                <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                >
                    <option value="">-- Pilih Gender --</option>
                    {genderList.map((g) => (
                        <option key={g.id} value={g.jenis_kelamin}>
                            {g.jenis_kelamin}
                        </option>
                    ))}
                </select>

                <select
                    name="religion"
                    value={form.religion}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                >
                    <option value="">-- Pilih Agama --</option>
                    {agamaList.map((a) => (
                        <option key={a.id} value={a.agama}>
                            {a.agama}
                        </option>
                    ))}
                </select>

                <select
                    name="last_education"
                    value={form.last_education}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                >
                    <option value="">-- Pilih Pendidikan --</option>
                    {pendidikanList.map((p) => (
                        <option key={p.id} value={p.pendidikan}>
                            {p.pendidikan}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    name="domicile"
                    value={form.domicile}
                    onChange={handleChange}
                    placeholder="Domisili"
                    className="w-full border p-2 rounded"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Simpan Perubahan
                </button>
            </form>
        </div>
    );
}
