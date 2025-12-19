const CvRiwayatKerja = require("../models/cvRiwayatKerjaModel");

module.exports = {
    getByUserIdService(userId, callback) {
        CvRiwayatKerja.getByUserId(userId, callback);
    },

    createService(data, callback) {
        CvRiwayatKerja.create(data, callback);
    },

    updateService(id, data, callback) {
        CvRiwayatKerja.update(id, data, callback);
    },

    deleteService(id, callback) {
        CvRiwayatKerja.delete(id, callback);
    }
};
