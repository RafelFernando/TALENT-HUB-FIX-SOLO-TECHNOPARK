const db = require("../config/connections");

module.exports = {

    findUserByEmail(email, callback) {
        const sql = `
            SELECT * FROM users WHERE email = ?
        `;
        db.query(sql, [email], callback);
    },

    findUserRole(user_id, callback) {
        const sql = `
            SELECT * FROM user_roles WHERE user_id = ?
        `;
        db.query(sql, [user_id], callback);
    }
};
