const db = require("../config/connections");

module.exports = {

    // Ambil semua user + role
    getAllUsers(callback) {
        const sql = `
            SELECT 
                u.user_id, u.username, u.email, u.full_name, u.phone, 
                u.profile_picture, u.email_verified, u.status,
                ur.role_type, ur.module_type, ur.is_confirmed
            FROM users u 
            LEFT JOIN user_roles ur ON u.user_id = ur.user_id
            ORDER BY u.user_id DESC
        `;
        db.query(sql, callback);
    },

    // Ambil berdasarkan role
    getUsersByRole(role, callback) {
        const sql = `
            SELECT 
                u.user_id, u.username, u.email, u.full_name, u.phone, 
                u.profile_picture, u.email_verified, u.status,
                ur.role_type, ur.module_type, ur.is_confirmed
            FROM users u 
            LEFT JOIN user_roles ur ON u.user_id = ur.user_id
            WHERE ur.role_type = ?
            ORDER BY u.user_id DESC
        `;
        db.query(sql, [role], callback);
    }
};
