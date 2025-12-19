import React, { useState } from "react";
import { Edit2, PlusCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TambahRole from "./RolesAdmin/TambahRole";
import EditRole from "./RolesAdmin/EditRole";

export default function RolesAdmin() {
  const [roles, setRoles] = useState([
    { id: 1, nama: "Superadmin", email: "superadmin@mail.com", level: "admin", telepon: "+6281234567890", status: true },
    { id: 2, nama: "Romi", email: "romi@mail.com", level: "admin", telepon: "+6289988776655", status: true },
    { id: 3, nama: "Dewi", email: "dewi@mail.com", level: "moderator", telepon: "+6287772223344", status: false },
  ]);

  const [showTambah, setShowTambah] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [notif, setNotif] = useState({ show: false, msg: "", type: "success" });

  const handleToggleStatus = (id) => {
    setRoles((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: !r.status } : r))
    );
  };

  const handleTambah = (newRole) => {
    setRoles((prev) => [...prev, { id: prev.length + 1, ...newRole }]);
    showNotif("Role berhasil ditambahkan!");
  };

  const handleEdit = (updated) => {
    setRoles((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    showNotif("Role berhasil diperbarui!");
  };

  const showNotif = (msg, type = "success") => {
    setNotif({ show: true, msg, type });
    setTimeout(() => setNotif({ show: false, msg: "", type }), 2000);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen relative">

      {/* Notifikasi */}
      {notif.show && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded-xl shadow-xl text-white flex items-center gap-2 z-50 transition-all 
          ${notif.type === "success" ? "bg-blue-900" : "bg-red-500"}`}
        >
          <span>✨</span>
          <span>{notif.msg}</span>
        </div>
      )}

      {/* Header Card */}
      <div className="bg-white/80 backdrop-blur-lg border border-white/50 rounded-2xl shadow-lg p-6">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-blue-900 tracking-wide">
            Admin Role Management
          </h2>

          <button
            onClick={() => setShowTambah(true)}
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 transition text-blue-900 px-5 py-2.5 rounded-xl font-medium shadow cursor-pointer"
          >
            <PlusCircle size={18} /> Tambah Role
          </button>
        </div>

        {/* Table Modern */}
        <div className="overflow-x-auto rounded-xl shadow">
          <table className="w-full text-sm bg-white rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-blue-600 text-white text-left">
                <th className="px-4 py-3">No</th>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Level</th>
                <th className="px-4 py-3">Telepon</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {roles.map((r, i) => (
                <tr
                  key={r.id}
                  className={`${
                    i % 2 === 0 ? "bg-blue-50" : "bg-white"
                  } border-b border-blue-100`}
                >
                  <td className="px-4 py-3">{i + 1}</td>
                  <td className="px-4 py-3 font-medium">{r.nama}</td>
                  <td className="px-4 py-3">{r.email}</td>
                  <td className="px-4 py-3 capitalize">{r.level}</td>
                  <td className="px-4 py-3">{r.telepon}</td>

                  {/* Toggle */}
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleToggleStatus(r.id)}
                      className="relative w-14 h-7 flex items-center rounded-full transition-colors duration-300 shadow-inner cursor-pointer"
                      style={{
                        backgroundColor: r.status ? "#0f1e63" : "#d1d5db" // blue-900 : gray-300
                      }}
                    >
                      <motion.div
                        layout
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="w-6 h-6 bg-white rounded-full shadow absolute"
                        style={{
                          left: r.status ? "32px" : "3px"
                        }}
                      />
                    </button>
                  </td>

                  {/* Edit Button */}
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => {
                        setEditData(r);
                        setShowEdit(true);
                      }}
                      className="p-2 bg-yellow-400 hover:bg-yellow-500 text-blue-900 rounded-full transition shadow cursor-pointer"
                    >
                      <Edit2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* Modal Tambah */}
      <AnimatePresence>
        {showTambah && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-lg bg-white rounded-2xl shadow-2xl"
            >
              <TambahRole
                onClose={() => setShowTambah(false)}
                onSave={handleTambah}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Edit */}
      <AnimatePresence>
        {showEdit && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-lg bg-white rounded-2xl shadow-2xl"
            >
              <EditRole
                data={editData}
                onClose={() => setShowEdit(false)}
                onSave={handleEdit}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}