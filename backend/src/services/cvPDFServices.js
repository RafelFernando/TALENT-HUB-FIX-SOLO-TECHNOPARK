const CvPdfModel = require("../models/cvPDFModels");

module.exports = {

    getAllService(callback) {
        CvPdfModel.getAll(callback);
    },

    getByIdService(id, callback) {
        CvPdfModel.getById(id, callback);
    },

    getByUserIdService(user_id, callback) {
        CvPdfModel.getByUserId(user_id, callback);
    },

    createService(data, callback) {
        CvPdfModel.create(data, callback);
    },

    updateService(id, data, callback) {
        CvPdfModel.update(id, data, callback);
    },

    deleteService(id, callback) {
        CvPdfModel.delete(id, callback);
    }
};
