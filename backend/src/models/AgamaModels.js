const db = require("../config/connections");

module.exports = {

    // Ambil semua data agama
    getAllAgama(callback) {
        const sql = "SELECT * FROM agama";
        db.query(sql, callback);
    },

    // Ambil agama berdasarkan primary key (id)
    getAgamaById(id, callback) {
        const sql = "SELECT * FROM agama WHERE id = ?";
        db.query(sql, [id], callback);
    },

    // Tambah agama baru
    insertAgama(data, callback) {
        const sql = `
            INSERT INTO agama 
            (agama)
            VALUES (?)
        `;

        db.query(
            sql,
            [
                data.agama
            ],
            callback
        );
    },

    // Update agama
    updateAgama(id, data, callback) {
        const sql = `
            UPDATE agama SET
                agama = ?
            WHERE id = ?
        `;

        db.query(
            sql,
            [
                data.agama,
                id
            ],
            callback
        );
    },

    // Hapus agama
    deleteAgama(id, callback) {
        const sql = "DELETE FROM agama WHERE id = ?";
        db.query(sql, [id], callback);
    }
};
