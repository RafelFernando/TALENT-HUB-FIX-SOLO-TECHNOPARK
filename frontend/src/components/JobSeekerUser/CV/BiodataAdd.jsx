import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function BiodataAdd() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.user_id;

    const [nik, setNik] = useState("");
    const [birth_date, setBirthDate] = useState("");
    const [birth_place, setBirthPlace] = useState("");
    const [gender, setGender] = useState("");
    const [domicile, setDomicile] = useState("");
    const [last_education, setLastEducation] = useState("");
    const [religion, setReligion] = useState("");
    const [profil, setProfil] = useState("");
    const [preview, setPreview] = useState("");

    const [genderList, setGenderList] = useState([]);
    const [agamaList, setAgamaList] = useState([]);
    const [pendidikanList, setPendidikanList] = useState([]);

    // preview image
    const loadImage = (e) => {
        const image = e.target.files[0];
        setProfil(image);
        setPreview(URL.createObjectURL(image));
    };

    // submit
    const saveProfile = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("user_id", userId); // ✅ KIRIM USER ID
        formData.append("nik", nik);
        formData.append("birth_date", birth_date);
        formData.append("birth_place", birth_place);
        formData.append("gender", gender);
        formData.append("domicile", domicile);
        formData.append("last_education", last_education);
        formData.append("religion", religion);
        formData.append("profil", profil);

        try {
            await axios.post(
                "http://localhost:3000/talenthub/api/v1/user_profiles",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            toast.success("Berhasil tambah biodata")
            navigate("/seeker/cv");
        } catch (error) {
            toast.error("gagal tambah biodata")
            console.error("Gagal simpan profile:", error);
        }
    };

    // master data
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
        getMasterData();
    }, []);

    return (
        <form onSubmit={saveProfile}>
            <input value={nik} onChange={(e) => setNik(e.target.value)} placeholder="NIK" />

            <input type="date" value={birth_date} onChange={(e) => setBirthDate(e.target.value)} />

            <input value={birth_place} onChange={(e) => setBirthPlace(e.target.value)} placeholder="Tempat Lahir" />

            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">-- Pilih Gender --</option>
                {genderList.map((g) => (
                    <option key={g.id} value={g.jenis_kelamin}>
                        {g.jenis_kelamin}
                    </option>
                ))}
            </select>

            <select value={religion} onChange={(e) => setReligion(e.target.value)}>
                <option value="">-- Pilih Agama --</option>
                {agamaList.map((a) => (
                    <option key={a.id} value={a.agama}>
                        {a.agama}
                    </option>
                ))}
            </select>

            <select value={last_education} onChange={(e) => setLastEducation(e.target.value)}>
                <option value="">-- Pilih Pendidikan --</option>
                {pendidikanList.map((p) => (
                    <option key={p.id} value={p.pendidikan}>
                        {p.pendidikan}
                    </option>
                ))}
            </select>

            <input value={domicile} onChange={(e) => setDomicile(e.target.value)} placeholder="Domisili" />

            <input type="file" onChange={loadImage} />

            {preview && <img src={preview} alt="Preview" width={120} />}

            <button type="submit">Simpan</button>
        </form>
    );
}
