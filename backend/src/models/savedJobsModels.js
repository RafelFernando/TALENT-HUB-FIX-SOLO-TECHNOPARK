const db = require("../config/connections");

module.exports = {
    // Ambil semua saved jobs
    getAllSavedJobs(callback) {
        const sql = `
            SELECT s.*, u.full_name AS user_name, j.title AS job_title
            FROM saved_jobs s
            LEFT JOIN users u ON s.user_id = u.user_id
            LEFT JOIN job_posts j ON s.job_id = j.job_id
        `;
        db.query(sql, callback);
    },

    // Ambil saved jobs berdasarkan ID primary
    getSavedJobById(id, callback) {
        const sql = `
            SELECT s.*, u.full_name AS user_name, j.title AS job_title
            FROM saved_jobs s
            LEFT JOIN users u ON s.user_id = u.user_id
            LEFT JOIN job_posts j ON s.job_id = j.job_id
            WHERE s.id = ?
        `;
        db.query(sql, [id], callback);
    },

    // Ambil saved jobs berdasarkan user_id
    getSavedJobsByUserId(user_id, callback) {
        const sql = `
            SELECT s.*, u.full_name AS user_name, j.title AS job_title
            FROM saved_jobs s
            LEFT JOIN users u ON s.user_id = u.user_id
            LEFT JOIN job_posts j ON s.job_id = j.job_id
            WHERE s.user_id = ?
        `;
        db.query(sql, [user_id], callback);
    },

    // Tambah saved job baru
    insertSavedJob(data, callback) {
        const sql = `
            INSERT INTO saved_jobs (user_id, job_id, saved_at)
            VALUES (?, ?, ?)
        `;
        db.query(sql, [
            data.user_id, 
            data.job_id, 
            data.saved_at || new Date()
        ], callback);
    },

    // Hapus saved job berdasarkan ID
    deleteSavedJob(id, callback) {
        const sql = "DELETE FROM saved_jobs WHERE id = ?";
        db.query(sql, [id], callback);
    }
};
