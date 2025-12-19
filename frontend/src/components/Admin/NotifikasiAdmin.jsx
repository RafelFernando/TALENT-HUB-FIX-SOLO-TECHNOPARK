import react from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

export default function Notifikasi() {
  const [users, setUsers] = useState([]);
  const [notifikasi, setNotifikasi] = useState([]);

  const getNotifikasi = async () => {
    const response = await axios.get('http://localhost:3000/talenthub/api/v1/admin/notifikasi');
    setNotifikasi(response.data.payload.data);
  }

  const getUsers = async () => {
    const res = await axios.get(
      "http://localhost:3000/talenthub/api/v1/users"
    );
    setUsers(res.data.payload.data);
  };

  useEffect(() => {
    getNotifikasi();
    getUsers();
  }, []);

  const getUserName = (userId) => {
    const user = users.find((u) => u.user_id === userId);
    return user ? user.full_name : "-";
  };

  const deleteNotifikasi = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/talenthub/api/v1/admin/notifikasi/${id}`);
      toast.success("Data berhasil dihapus");
      getNotifikasi();
    } catch (error) {
      toast.error("Gagal hapus data");
    }
  }

  return (
    <div>
      <Link
        to="/admin/notifikasi/tambah"
        className="ml-3 mt-3 mb-3 px-3 py-1 bg-blue-600 text-white rounded-[5px] hover:bg-blue-700 transition"
      >
        Tambah
      </Link>

      <div className=''>

        <table className="mt-4 min-w-full border border-gray-300 bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-700 font-semibold border-b">No</th>
              <th className="px-4 py-2 text-left text-gray-700 font-semibold border-b">User</th>
              <th className="px-4 py-2 text-left text-gray-700 font-semibold border-b">Judul</th>
              <th className="px-4 py-2 text-left text-gray-700 font-semibold border-b">Pesan</th>
              <th className="px-4 py-2 text-left text-gray-700 font-semibold border-b">Tipe</th>
              <th className="px-4 py-2 text-center text-gray-700 font-semibold border-b">Action</th>
            </tr>
          </thead>

          <tbody>
            {notifikasi.map((item, index) => (
              <tr key={item.notification_id}>
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">
                  {getUserName(item.user_id)}
                </td>
                <td className="px-4 py-2 border-b">{item.title}</td>
                <td className="px-4 py-2 border-b">{item.message}</td>
                <td className="px-4 py-2 border-b">{item.type}</td>
                <td className="px-4 py-2 border-b text-center space-x-2">
                  <Link
                    to={`/admin/notifikasi/edit/${item.notification_id}`}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteNotifikasi(item.notification_id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
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