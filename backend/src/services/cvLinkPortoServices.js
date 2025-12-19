const CvLinkPortoModel = require("../models/cvLinkPorto");

module.exports = {
    getByUserIdService(userId, callback) {
        CvLinkPortoModel.getByUserId(userId, callback);
    },

    createService(data, callback) {
        CvLinkPortoModel.create(data, callback);
    },

    updateService(id, data, callback) {
        CvLinkPortoModel.update(id, data, callback);
    },

    deleteService(id, callback) {
        CvLinkPortoModel.delete(id, callback);
    }
};
