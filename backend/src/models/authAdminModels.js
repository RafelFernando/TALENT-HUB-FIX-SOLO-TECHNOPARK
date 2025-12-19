const db = require("../config/connections");

module.exports = {

    findAdminByEmail(email, callback) {
        const sql = `
            SELECT * FROM users WHERE email = ?
        `;
        db.query(sql, [email], callback);
    },

    findAdminRole(user_id, callback) {
        const sql = `
            SELECT * FROM user_roles WHERE user_id = ? AND role_type = 'admin'
        `;
        db.query(sql, [user_id], callback);
    }
};
