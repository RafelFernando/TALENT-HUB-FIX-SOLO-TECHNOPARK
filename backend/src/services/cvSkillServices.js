const CvSkillModel = require("../models/cvSkillModels");

module.exports = {
    getByUserIdService(user_id, callback) {
        CvSkillModel.getByUserId(user_id, callback);
    },

    createService(data, callback) {
        CvSkillModel.create(data, callback);
    },

    updateService(id, data, callback) {
        CvSkillModel.update(id, data, callback);
    },

    deleteService(id, callback) {
        CvSkillModel.delete(id, callback);
    }
};
