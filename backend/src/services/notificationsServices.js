const Notifications = require("../models/notificationsModels");

module.exports = {
    getAllService(callback) {
        Notifications.getAll(callback);
    },

    getNotifikasiByIdService(id, callback) {
        Notifications.getNotifikasiById(id, callback);
    },

    getNotifikasiByUserIdService(user_id, callback) {
        Notifications.getNotifikasiByUserId(user_id, callback);
    },

    createService(data, callback) {
        Notifications.create(data, callback);
    },

    updateService(id, data, callback) {
        Notifications.update(id, data, callback);
    },

    deleteService(id, callback) {
        Notifications.delete(id, callback);
    }
};
