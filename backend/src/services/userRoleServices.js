const UserRole = require("../models/userRoleModels");

module.exports = {
    getUserRoleService(user_id, callback) {
        UserRole.getRolesByUserId(user_id, callback);
    },

    insertUserRoleService(data, callback) {
        UserRole.insertRole(data, callback);
    },

    updateUserRoleService(role_id, data, callback) {
        UserRole.updateRole(role_id, data, callback);
    },

    deleteUserRoleService(role_id, callback) {
        UserRole.deleteRole(role_id, callback);
    }
}
