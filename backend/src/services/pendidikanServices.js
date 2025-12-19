const Pendidikan = require('../models/pendidikanModels');

module.exports = {

    // Ambil semua data pendidikan
    getAllPendidikanService(callback) {
        Pendidikan.getAllPendidikan(callback);
    },

    // Ambil pendidikan berdasarkan ID
    getPendidikanByIdService(id, callback) {
        Pendidikan.getPendidikanById(id, callback);
    },

    // Tambah pendidikan baru
    insertPendidikanService(data, callback) {
        Pendidikan.insertPendidikan(data, callback);
    },

    // Update pendidikan berdasarkan ID
    updatePendidikanService(id, data, callback) {
        Pendidikan.updatePendidikan(id, data, callback);
    },

    // Hapus pendidikan berdasarkan ID
    deletePendidikanService(id, callback) {
        Pendidikan.deletePendidikan(id, callback);
    }

};
