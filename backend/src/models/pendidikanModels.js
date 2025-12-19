const db = require("../config/connections");

module.exports = {

    // Ambil semua data pendidikan
    getAllPendidikan(callback) {
        const sql = "SELECT * FROM educations";
        db.query(sql, callback);
    },

    // Ambil pendidikan berdasarkan id
    getPendidikanById(id, callback) {
        const sql = "SELECT * FROM educations WHERE id = ?";
        db.query(sql, [id], callback);
    },

    // Tambah pendidikan baru
    insertPendidikan(data, callback) {
        const sql = `
            INSERT INTO educations
            (pendidikan)
            VALUES (?)
        `;

        db.query(
            sql,
            [
                data.pendidikan
            ],
            callback
        );
    },

    // Update pendidikan berdasarkan id
    updatePendidikan(id, data, callback) {
        const sql = `
            UPDATE educations SET
                pendidikan = ?
            WHERE id = ?
        `;

        db.query(
            sql,
            [
                data.pendidikan,
                id
            ],
            callback
        );
    },

    // Hapus pendidikan berdasarkan id
    deletePendidikan(id, callback) {
        const sql = "DELETE FROM educations WHERE id = ?";
        db.query(sql, [id], callback);
    }
};
