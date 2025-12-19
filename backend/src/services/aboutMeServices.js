const CvTentangSayaModel = require("../models/aboutMeModels");

module.exports = {

    getAllService(callback) {
        CvTentangSayaModel.getAll(callback);
    },

    getByIdService(id, callback) {
        CvTentangSayaModel.getById(id, callback);
    },

    getByUserIdService(user_id, callback) {
        CvTentangSayaModel.getByUserId(user_id, callback);
    },

    createService(data, callback) {
        CvTentangSayaModel.create(data, callback);
    },

    updateService(id, data, callback) {
        CvTentangSayaModel.update(id, data, callback);
    },

    deleteService(id, callback) {
        CvTentangSayaModel.delete(id, callback);
    }

};
