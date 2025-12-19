import { useState, useEffect } from 'react';
import { Edit2 } from 'lucide-react';

export default function JobSeekerAdmin() {
  const [users, setUsers] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [userProfiles, setUserProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [activeTab, setActiveTab] = useState('job_seeker');

  // Fetch semua data
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        // Fetch users
        const usersRes = await fetch('http://localhost:3000/talenthub/api/v1/users');
        const usersData = await usersRes.json();
        setUsers(usersData.payload.data || []);

        // Fetch user profiles
        const profilesRes = await fetch('http://localhost:3000/talenthub/api/v1/user_profiles');
        const profilesData = await profilesRes.json();
        setUserProfiles(profilesData.payload.data || []);

        // Fetch user roles untuk semua user
        const allRoles = [];
        for (const user of usersData.payload.data || []) {
          try {
            const rolesRes = await fetch(
              `http://localhost:3000/talenthub/api/v1/user_roles/${user.user_id}`
            );
            const rolesData = await rolesRes.json();
            if (rolesData.payload.data) {
              allRoles.push(...rolesData.payload.data);
            }
          } catch (err) {
            console.error(`Error fetching roles for user ${user.user_id}:`, err);
          }
        }
        setUserRoles(allRoles);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Gabungkan data
  const combinedData = users.map(user => {
    const userRole = userRoles.find(role => role.user_id === user.user_id);
    return {
      id: user.user_id,
      user_id: user.user_id,
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      profile_picture: user.profile_picture,
      role_type: userRole?.role_type || 'unknown',
      status: user.status,
      created_at: user.created_at
    };
  });

  // Filter berdasarkan role dan search
  const filteredData = combinedData.filter(user => {
    const matchesRole = user.role_type === activeTab;
    const matchesSearch =
      user.full_name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleToggleActive = (userId) => {
    // Implementasi toggle status aktif/nonaktif
    console.log('Toggle active for user:', userId);
  };

  const handleEdit = (userId) => {
    // Implementasi edit user
    console.log('Edit user:', userId);
  };

  // Fungsi untuk format role display
  const formatRole = (role) => {
    return role.replace('_', ' ').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Data Pengguna</h2>

        {/* Tabs untuk memilih role */}
        <div className="flex border-b border-blue-300 mb-6">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'job_seeker' ? 'text-blue-900 border-b-2 border-blue-900' : 'text-blue-700'}`}
            onClick={() => {
              setActiveTab('job_seeker');
              setCurrentPage(1);
            }}
          >
            Job Seeker
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'employer' ? 'text-blue-900 border-b-2 border-blue-900' : 'text-blue-700'}`}
            onClick={() => {
              setActiveTab('employer');
              setCurrentPage(1);
            }}
          >
            Employer
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'admin' ? 'text-blue-900 border-b-2 border-blue-900' : 'text-blue-700'}`}
            onClick={() => {
              setActiveTab('admin');
              setCurrentPage(1);
            }}
          >
            Admin
          </button>
        </div>

        {/* Kontrol pencarian dan pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-2 text-blue-900">
            <span>Tampilkan</span>
            <select
              value={perPage}
              onChange={handlePerPageChange}
              className="border border-blue-300 text-blue-900 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-400"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
            <span>entri</span>
            <span className="ml-4">
              Total: {filteredData.length} {activeTab.replace('_', ' ')}
            </span>
          </div>

          <input
            type="text"
            placeholder="Cari nama, email atau telepon..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-blue-300 text-blue-900 rounded-lg px-3 py-2 w-64 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Tabel data */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          {loading ? (
            <p className="text-center py-10 text-blue-700 font-medium">Memuat data...</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-blue-900">
                  <thead>
                    <tr className="bg-blue-700 text-white">
                      <th className="px-4 py-3">No</th>
                      <th className="px-4 py-3">Nama Lengkap</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Telepon</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-4 py-6 text-center text-blue-700">
                          Tidak ada data untuk role {activeTab.replace('_', ' ')}
                        </td>
                      </tr>
                    ) : (
                      paginatedData.map((user, i) => (
                        <tr
                          key={user.id}
                          className={
                            i % 2 === 0
                              ? "bg-blue-50 border-b border-blue-200"
                              : "bg-white border-b border-blue-200"
                          }
                        >
                          <td className="px-4 py-3">{startIndex + i + 1}</td>
                          <td className="px-4 py-3 font-medium">{user.full_name}</td>
                          <td className="px-4 py-3">{user.email}</td>
                          <td className="px-4 py-3">{user.phone}</td>

                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role_type === 'job_seeker'
                                ? 'bg-green-100 text-green-800'
                                : user.role_type === 'employer'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-purple-100 text-purple-800'
                              }`}>
                              {formatRole(user.role_type)}
                            </span>
                          </td>

                          <td className="px-4 py-3 text-center">

                            <span className="ml-2 text-sm text-blue-900 font-medium">
                              {user.status === 'active' ? "Aktif" : "Nonaktif"}
                            </span>

                          </td>

                          
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination controls */}
              {filteredData.length > 0 && (
                <div className="flex justify-between items-center px-4 py-3 border-t border-blue-200">
                  <div className="text-blue-700 text-sm">
                    Menampilkan {startIndex + 1} sampai {Math.min(endIndex, filteredData.length)} dari {filteredData.length} entri
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 border border-blue-300 rounded-lg text-blue-700 disabled:opacity-50"
                    >
                      Sebelumnya
                    </button>
                    <span className="px-3 py-1 text-blue-900">
                      Halaman {currentPage} dari {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 border border-blue-300 rounded-lg text-blue-700 disabled:opacity-50"
                    >
                      Selanjutnya
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}