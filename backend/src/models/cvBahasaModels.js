const db = require("../config/connections");

module.exports = {

    // Ambil semua bahasa
    getAll(callback) {
        const sql = `SELECT * FROM cv_bahasa`;
        db.query(sql, callback);
    },

    // Ambil bahasa berdasarkan user_id
    getByUserId(user_id, callback) {
        const sql = `SELECT * FROM cv_bahasa WHERE user_id = ?`;
        db.query(sql, [user_id], callback);
    },

    // Ambil bahasa berdasarkan id
    getById(id, callback) {
        const sql = `SELECT * FROM cv_bahasa WHERE id = ?`;
        db.query(sql, [id], callback);
    },

    // Tambah bahasa
    create(data, callback) {
        const sql = `
            INSERT INTO cv_bahasa (user_id, bahasa)
            VALUES (?, ?)
        `;
        db.query(sql, [data.user_id, data.bahasa], callback);
    },

    // Update bahasa
    update(id, data, callback) {
        const sql = `
            UPDATE cv_bahasa
            SET bahasa = ?
            WHERE id = ?
        `;
        db.query(sql, [data.bahasa, id], callback);
    },

    // Hapus bahasa
    delete(id, callback) {
        const sql = `DELETE FROM cv_bahasa WHERE id = ?`;
        db.query(sql, [id], callback);
    }
};
