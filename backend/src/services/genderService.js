const Gender = require('../models/genderModels');

module.exports = {

    // Ambil semua data gender
    getAllGenderService(callback) {
        Gender.getAllGender(callback);
    },

    // Ambil gender berdasarkan ID
    getGenderByIdService(id, callback) {
        Gender.getGenderById(id, callback);
    },

    // Tambah gender baru
    insertGenderService(data, callback) {
        Gender.insertGender(data, callback);
    },

    // Update gender berdasarkan ID
    updateGenderService(id, data, callback) {
        Gender.updateGender(id, data, callback);
    },

    // Hapus gender berdasarkan ID
    deleteGenderService(id, callback) {
        Gender.deleteGender(id, callback);
    }

};
