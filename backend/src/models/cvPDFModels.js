const db = require("../config/connections");

module.exports = {

    getAll(callback) {
        const sql = "SELECT * FROM cv_pdf ORDER BY createdAt DESC";
        db.query(sql, callback);
    },

    getById(id, callback) {
        const sql = "SELECT * FROM cv_pdf WHERE id = ?";
        db.query(sql, [id], callback);
    },

    getByUserId(user_id, callback) {
        const sql = "SELECT * FROM cv_pdf WHERE user_id = ?";
        db.query(sql, [user_id], callback);
    },

    create(data, callback) {
        const sql = "INSERT INTO cv_pdf SET ?";
        db.query(sql, data, callback);
    },

    update(id, data, callback) {
        const sql = "UPDATE cv_pdf SET ? WHERE id = ?";
        db.query(sql, [data, id], callback);
    },

    delete(id, callback) {
        const sql = "DELETE FROM cv_pdf WHERE id = ?";
        db.query(sql, [id], callback);
    }
};
