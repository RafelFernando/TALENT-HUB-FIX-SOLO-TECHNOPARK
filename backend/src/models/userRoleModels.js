const db = require("../config/connections");

module.exports = {
    getRolesByUserId(user_id, callback) {
        const sql = "SELECT * FROM user_roles WHERE user_id = ?";
        db.query(sql, [user_id], callback);
    },

    insertRole(data, callback) {
        const sql = `
            INSERT INTO user_roles 
            (user_id, role_type, module_type, is_confirmed)
            VALUES (?, ?, ?, ?)
        `;
        db.query(
            sql,
            [
                data.user_id,
                data.role_type,
                data.module_type,
                data.is_confirmed
            ],
            callback
        );
    },

    updateRole(role_id, data, callback) {
        const sql = `
            UPDATE user_roles SET 
                role_type = ?,
                module_type = ?,
                is_confirmed = ?
            WHERE role_id = ?
        `;

        db.query(
            sql,
            [
                data.role_type,
                data.module_type,
                data.is_confirmed,
                role_id
            ],
            callback
        );
    },

    deleteRole(role_id, callback) {
        const sql = "DELETE FROM user_roles WHERE role_id = ?";
        db.query(sql, [role_id], callback);
    }
}
