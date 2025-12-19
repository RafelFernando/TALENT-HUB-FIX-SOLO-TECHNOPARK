const db = require("../config/connections");

module.exports = {
    getAll(callback) {
        const sql = `SELECT * FROM notifications ORDER BY created_at DESC`;
        db.query(sql, callback);
    },

    getNotifikasiById(id, callback) {
        const sql = "SELECT * FROM notifications WHERE notification_id = ?";
        db.query(sql, [id], callback);
    },

    getNotifikasiByUserId(user_id, callback) {
        const sql = `SELECT * FROM notifications WHERE user_id = ?`;
        db.query(sql, [user_id], callback);
    },

    create(data, callback) {
        const sql = `
            INSERT INTO notifications (user_id, title, message, type, created_at)
            VALUES (?, ?, ?, ?, now())
        `;
        db.query(sql, [
            data.user_id,
            data.title,
            data.message,
            data.type,
        ], callback);
    },

    update(id, data, callback) {
        const sql = `
        UPDATE notifications
        SET user_id = ?, title = ?, message = ?, type = ?
        WHERE notification_id = ?
    `;

        db.query(
            sql,
            [
                data.user_id,
                data.title,
                data.message,
                data.type,
                id],
            callback
        );
    },

    // Hapus review
    delete(id, callback) {
        const sql = `DELETE FROM notifications WHERE notification_id = ?`;
        db.query(sql, [id], callback);
    }
};
