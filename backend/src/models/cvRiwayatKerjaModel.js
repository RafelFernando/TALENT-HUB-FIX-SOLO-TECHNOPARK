const db = require("../config/connections");

module.exports = {
    // =============================
    // GET by USER ID
    // =============================
    getByUserId(userId, callback) {
        const sql = `
            SELECT *
            FROM cv_riwayatkerja
            WHERE user_id = ?
            ORDER BY tanggal_mulai DESC
        `;
        db.query(sql, [userId], callback);
    },

    // =============================
    // CREATE
    // =============================
    create(data, callback) {
        const sql = `
            INSERT INTO cv_riwayatkerja
            (user_id, posisi, level, perusahaan, deskripsi, tanggal_mulai, tanggal_selesai)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            data.user_id,
            data.posisi,
            data.level,
            data.perusahaan,
            data.deskripsi,
            data.tanggal_mulai,
            data.tanggal_selesai
        ];
        db.query(sql, values, callback);
    },

    // =============================
    // UPDATE
    // =============================
    update(id, data, callback) {
        const sql = `
            UPDATE cv_riwayatkerja
            SET posisi = ?,
                level = ?,
                perusahaan = ?,
                deskripsi = ?,
                tanggal_mulai = ?,
                tanggal_selesai = ?
            WHERE id = ?
        `;
        const values = [
            data.posisi,
            data.level,
            data.perusahaan,
            data.deskripsi,
            data.tanggal_mulai,
            data.tanggal_selesai,
            id
        ];
        db.query(sql, values, callback);
    },

    // =============================
    // DELETE
    // =============================
    delete(id, callback) {
        const sql = `DELETE FROM cv_riwayatkerja WHERE id = ?`;
        db.query(sql, [id], callback);
    }
};
