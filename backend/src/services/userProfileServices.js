const JobseekerInfoModel = require("../models/userProfileModels");

module.exports = {
    getAllService(callback) {
        JobseekerInfoModel.getAllService(callback);
    },

    getByIdService(id, callback) {
        JobseekerInfoModel.getByIdService(id, callback);
    },

    getByUserIdService(user_id, callback) {
        JobseekerInfoModel.getByUserIdService(user_id, callback);
    },

    createService(data, callback) {
        JobseekerInfoModel.createService(data, callback);
    },

    updateService(id, data, callback) {
        JobseekerInfoModel.updateService(id, data, callback);
    },

    deleteService(id, callback) {
        JobseekerInfoModel.deleteService(id, callback);
    }
};
