const db = require("../config/connections");

module.exports = {
    // GET by user
    getByUserId(userId, callback) {
        const sql = `
            SELECT * FROM cv_linkporto
            WHERE user_id = ?
            ORDER BY id DESC
        `;
        db.query(sql, [userId], callback);
    },

    // CREATE
    create(data, callback) {
        const sql = `
            INSERT INTO cv_linkporto (user_id, nama, link)
            VALUES (?, ?, ?)
        `;
        db.query(sql, [data.user_id, data.nama, data.link], callback);
    },

    // UPDATE
    update(id, data, callback) {
        const sql = `
            UPDATE cv_linkporto
            SET nama = ?, link = ?
            WHERE id = ?
        `;
        db.query(sql, [data.nama, data.link, id], callback);
    },

    // DELETE
    delete(id, callback) {
        const sql = `
            DELETE FROM cv_linkporto
            WHERE id = ?
        `;
        db.query(sql, [id], callback);
    }
};
