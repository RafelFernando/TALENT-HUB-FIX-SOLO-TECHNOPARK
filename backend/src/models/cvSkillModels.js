const db = require("../config/connections");

module.exports = {
    // Ambil skill berdasarkan user
    getByUserId(user_id, callback) {
        const sql = `
            SELECT * FROM cv_skill
            WHERE user_id = ?
            ORDER BY id DESC
        `;
        db.query(sql, [user_id], callback);
    },

    // Tambah skill
    create(data, callback) {
        const sql = `
            INSERT INTO cv_skill (user_id, skill, level)
            VALUES (?, ?, ?)
        `;
        db.query(
            sql,
            [data.user_id, data.skill, data.level],
            callback
        );
    },

    // Update skill
    update(id, data, callback) {
        const sql = `
            UPDATE cv_skill
            SET skill = ?, level = ?
            WHERE id = ?
        `;
        db.query(
            sql,
            [data.skill, data.level, id],
            callback
        );
    },

    // Delete skill
    delete(id, callback) {
        const sql = `
            DELETE FROM cv_skill
            WHERE id = ?
        `;
        db.query(sql, [id], callback);
    }
};
