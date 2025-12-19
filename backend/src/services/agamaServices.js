const Agama = require('../models/AgamaModels');

module.exports = {

    // Ambil semua data agama
    getAllAgamaService(callback) {
        Agama.getAllAgama(callback);
    },

    // Ambil agama berdasarkan ID
    getAgamaByIdService(id, callback) {
        Agama.getAgamaById(id, callback);
    },

    // Tambah agama baru
    insertAgamaService(data, callback) {
        Agama.insertAgama(data, callback);
    },

    // Update agama berdasarkan ID
    updateAgamaService(id, data, callback) {
        Agama.updateAgama(id, data, callback);
    },

    // Hapus agama berdasarkan ID
    deleteAgamaService(id, callback) {
        Agama.deleteAgama(id, callback);
    }

};
