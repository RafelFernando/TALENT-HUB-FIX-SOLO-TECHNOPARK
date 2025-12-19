const CvBahasaModel = require("../models/cvBahasaModels");

module.exports = {

    getAllService(callback) {
        CvBahasaModel.getAll(callback);
    },

    getByUserIdService(user_id, callback) {
        CvBahasaModel.getByUserId(user_id, callback);
    },

    getByIdService(id, callback) {
        CvBahasaModel.getById(id, callback);
    },

    createService(data, callback) {
        CvBahasaModel.create(data, callback);
    },

    updateService(id, data, callback) {
        CvBahasaModel.update(id, data, callback);
    },

    deleteService(id, callback) {
        CvBahasaModel.delete(id, callback);
    }
};
