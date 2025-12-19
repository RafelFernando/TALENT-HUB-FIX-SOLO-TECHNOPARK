const db = require("../config/connections");

module.exports = {

    // Ambil semua data gender
    getAllGender(callback) {
        const sql = "SELECT * FROM gender";
        db.query(sql, callback);
    },

    // Ambil gender berdasarkan id
    getGenderById(id, callback) {
        const sql = "SELECT * FROM gender WHERE id = ?";
        db.query(sql, [id], callback);
    },

    // Tambah gender baru
    insertGender(data, callback) {
        const sql = `
            INSERT INTO gender
            (jenis_kelamin)
            VALUES (?)
        `;

        db.query(
            sql,
            [
                data.jenis_kelamin
            ],
            callback
        );
    },

    // Update gender berdasarkan id
    updateGender(id, data, callback) {
        const sql = `
            UPDATE gender SET
                jenis_kelamin = ?
            WHERE id = ?
        `;

        db.query(
            sql,
            [
                data.jenis_kelamin,
                id
            ],
            callback
        );
    },

    // Hapus gender berdasarkan id
    deleteGender(id, callback) {
        const sql = "DELETE FROM gender WHERE id = ?";
        db.query(sql, [id], callback);
    }
};
