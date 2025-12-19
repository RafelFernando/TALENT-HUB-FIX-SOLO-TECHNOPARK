const db = require("../config/connections");

module.exports = {

    // Ambil semua data
    getAll(callback) {
        const sql = `SELECT * FROM cv_tentang_saya`;
        db.query(sql, callback);
    },

    // Ambil berdasarkan ID
    getById(id, callback) {
        const sql = `SELECT * FROM cv_tentang_saya WHERE id = ?`;
        db.query(sql, [id], callback);
    },

    // Ambil berdasarkan user_id
    getByUserId(user_id, callback) {
        const sql = `SELECT * FROM cv_tentang_saya WHERE user_id = ?`;
        db.query(sql, [user_id], callback);
    },

    // Tambah data
    create(data, callback) {
        const sql = `
            INSERT INTO cv_tentang_saya (user_id, deskripsi)
            VALUES (?, ?)
        `;
        db.query(sql, [
            data.user_id,
            data.deskripsi
        ], callback);
    },

    // Update data
    update(id, data, callback) {
        const sql = `
            UPDATE cv_tentang_saya
            SET deskripsi = ?, updatedAt = NOW()
            WHERE id = ?
        `;
        db.query(sql, [
            data.deskripsi,
            id
        ], callback);
    },

    // Hapus data
    delete(id, callback) {
        const sql = `DELETE FROM cv_tentang_saya WHERE id = ?`;
        db.query(sql, [id], callback);
    }

};
