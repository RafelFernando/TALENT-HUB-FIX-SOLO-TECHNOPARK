const UserRole = require("../models/adminUserRoleModels");

module.exports = {

    getAllUsersService(callback) {
        UserRole.getAllUsers(callback);
    },

    getUsersByRoleService(role, callback) {
        UserRole.getUsersByRole(role, callback);
    }
};
