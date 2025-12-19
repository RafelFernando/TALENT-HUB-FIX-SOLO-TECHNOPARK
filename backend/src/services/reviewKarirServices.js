const Review = require("../models/reviewKarirModels");

module.exports = {
    getAllService(callback) {
        Review.getAll(callback);
    },

    getByIdService(id, callback) {
        Review.getById(id, callback);
    },

    createService(data, callback) {
        Review.create(data, callback);
    },

    updateService(id, data, callback) {
        Review.update(id, data, callback);
    },

    deleteService(id, callback) {
        Review.delete(id, callback);
    }
};
