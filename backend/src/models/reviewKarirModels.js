const db = require("../config/connections");

module.exports = {
    // Ambil semua review
    getAll(callback) {
        const sql = `SELECT * FROM review_karirs ORDER BY created_at DESC`;
        db.query(sql, callback);
    },

    // Ambil review berdasarkan ID
    getById(id, callback) {
        const sql = `SELECT * FROM review_karirs WHERE id = ?`;
        db.query(sql, [id], callback);
    },

    // Tambah review baru
    create(data, callback) {
        const sql = `
            INSERT INTO review_karirs (nama, pekerjaan, komentar, gambar, url, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, now(), now())
        `;
        db.query(sql, [
            data.nama,
            data.pekerjaan,
            data.komentar,
            data.gambar,
            data.url
        ], callback);
    },

    // Update review
    update(id, data, callback) {
        const sql = `
            UPDATE review_karirs 
            SET nama = ?, pekerjaan = ?, komentar = ?, gambar = ?, url = ?, updated_at = NOW()
            WHERE id = ?
        `;
        db.query(sql, [
            data.nama,
            data.pekerjaan,
            data.komentar,
            data.gambar,
            data.url,
            id
        ], callback);
    },

    // Hapus review
    delete(id, callback) {
        const sql = `DELETE FROM review_karirs WHERE id = ?`;
        db.query(sql, [id], callback);
    }
};
