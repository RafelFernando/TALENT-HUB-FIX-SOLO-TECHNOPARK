const User = require("../models/userModels");

module.exports = {
    getAllUsersService(callback) {
        User.getAllUsers(callback);
    },

    insertUserService(data, callback) {
        User.insertUser(data, callback);
    },

    updateUserService(id, data, callback) {
        User.updateUser(id, data, callback);
    },

    deleteUserService(id, callback) {
        User.deleteUser(id, callback);
    }
}
