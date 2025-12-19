const db = require("../config/connections");

module.exports = {

    // Ambil semua kategori
    getAllCategories(callback) {
        const sql = "SELECT * FROM job_categories";
        db.query(sql, callback);
    },

    // Ambil kategori berdasarkan primary key (category_id)
    getCategoryById(category_id, callback) {
        const sql = "SELECT * FROM job_categories WHERE category_id = ?";
        db.query(sql, [category_id], callback);
    },

    // Tambah kategori baru
    insertCategory(data, callback) {
        const sql = `
            INSERT INTO job_categories 
            (name, status)
            VALUES (?, ?)
        `;

        db.query(
            sql,
            [
                data.name,
                data.status
            ],
            callback
        );
    },

    // Update kategori berdasarkan ID
    updateCategory(category_id, data, callback) {
        const sql = `
            UPDATE job_categories SET
                name = ?,
                status = ?
            WHERE category_id = ?
        `;

        db.query(
            sql,
            [
                data.name,
                data.status,
                category_id
            ],
            callback
        );
    },

    // Hapus kategori
    deleteCategory(category_id, callback) {
        const sql = "DELETE FROM job_categories WHERE category_id = ?";
        db.query(sql, [category_id], callback);
    }
};
