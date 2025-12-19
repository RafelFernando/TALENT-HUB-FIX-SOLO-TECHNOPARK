import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Biodata() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.user_id;
  const [profileId, setProfileId] = useState(null);

  const [nik, setNik] = useState("");
  const [birth_date, setBirthDate] = useState("");
  const [birth_place, setBirthPlace] = useState("");
  const [gender, setGender] = useState("");
  const [domicile, setDomicile] = useState("");
  const [last_education, setLastEducation] = useState("");
  const [religion, setReligion] = useState("");
  const [profil, setProfil] = useState("");
  const [url, setUrl] = useState("");

  const getProfilByUserId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/talenthub/api/v1/user_profiles/user/${userId}`
      );

      const data = response.data.payload.data;

      if (!data) {
        setProfileId(null);
        return;
      }

      setProfileId(data.id);
      setNik(data.nik);
      setBirthDate(data.birth_date);
      setBirthPlace(data.birth_place);
      setGender(data.gender);
      setDomicile(data.domicile);
      setLastEducation(data.last_education);
      setReligion(data.religion);
      setProfil(data.profil);
      setUrl(data.url);
    } catch (error) {
      // ⬇️ PENTING: jika 404 → berarti belum ada biodata
      if (error.response?.status === 404) {
        setProfileId(null);
      } else {
        console.error("Gagal mengambil biodata:", error);
      }
    }
  };

  useEffect(() => {
    if (userId) {
      getProfilByUserId();
    }
  }, [userId]);

  const formatTanggalIndonesia = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(dateString);

    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getImageUrl = (filename) => {
    if (!filename) {
      return "https://via.placeholder.com/80?text=No+Image";
    }

    return `http://localhost:3000/uploads/profile-images/${filename}`;
  };

  return (
    <div className="p-6 bg-white rounded shadow space-y-4">
      <div className="flex gap-2">
        {profileId ? (
          <Link
            to={`/seeker/biodata/edit/${profileId}`}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Edit
          </Link>
        ) : (
          <Link
            to="/seeker/biodata/tambah"
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Tambah
          </Link>
        )}
      </div>

      <h2 className="text-xl font-bold">Biodata</h2>

      {url && (
        <img
          src={getImageUrl(profil)}
          alt="Foto Profil"
          className="w-32 h-32 rounded object-cover border"
        />
      )}

      <p><strong>NIK:</strong> {nik}</p>
      <p><strong>Tempat Lahir:</strong> {birth_place}</p>
      <p><strong>Tanggal Lahir:</strong> {formatTanggalIndonesia(birth_date)}</p>
      <p><strong>Jenis Kelamin:</strong> {gender}</p>
      <p><strong>Agama:</strong> {religion}</p>
      <p><strong>Pendidikan:</strong> {last_education}</p>
      <p><strong>Domisili:</strong> {domicile}</p>
    </div>
  );
}
