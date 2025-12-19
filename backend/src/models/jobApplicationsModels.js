const db = require("../config/connections");

module.exports = {
    // Ambil semua aplikasi + info job + kandidat
    getAllApplications(callback) {
        const sql = `
            SELECT 
                a.application_id,
                a.job_id,
                a.candidate_id,
                a.status,
                a.applied_at,
                j.title AS job_title,
                u.full_name AS candidate_name
            FROM job_applications a
            LEFT JOIN job_posts j ON a.job_id = j.job_id
            LEFT JOIN users u ON a.candidate_id = u.user_id
            ORDER BY a.applied_at DESC
        `;
        db.query(sql, callback);
    },

    // Ambil aplikasi berdasarkan application_id
    getApplicationById(application_id, callback) {
        const sql = `
            SELECT 
                a.application_id,
                a.job_id,
                a.candidate_id,
                a.status,
                a.applied_at,
                j.title AS job_title,
                u.full_name AS candidate_name
            FROM job_applications a
            LEFT JOIN job_posts j ON a.job_id = j.job_id
            LEFT JOIN users u ON a.candidate_id = u.user_id
            WHERE a.application_id = ?
        `;
        db.query(sql, [application_id], callback);
    },

    // Ambil semua aplikasi berdasarkan job_id
    getApplicationsByJobId(job_id, callback) {
        const sql = `
            SELECT 
                a.application_id,
                a.job_id,
                a.candidate_id,
                a.status,
                a.applied_at,
                u.full_name AS candidate_name
            FROM job_applications a
            LEFT JOIN users u ON a.candidate_id = u.user_id
            WHERE a.job_id = ?
            ORDER BY a.applied_at DESC
        `;
        db.query(sql, [job_id], callback);
    },

    // Ambil semua aplikasi berdasarkan candidate_id (user_id)
    getApplicationsByCandidateId(candidate_id, callback) {
        const sql = `
            SELECT 
                a.application_id,
                a.job_id,
                a.status,
                a.applied_at,
                j.title AS job_title
            FROM job_applications a
            LEFT JOIN job_posts j ON a.job_id = j.job_id
            WHERE a.candidate_id = ?
            ORDER BY a.applied_at DESC
        `;
        db.query(sql, [candidate_id], callback);
    },

    // Tambah aplikasi job baru
    insertApplication(data, callback) {
        const sql = `
            INSERT INTO job_applications
            (job_id, candidate_id, status, applied_at)
            VALUES (?, ?, ?, ?)
        `;
        db.query(
            sql,
            [
                data.job_id,          // dari job_posts.job_id
                data.candidate_id,    // dari users.user_id
                data.status || "Submitted",
                data.applied_at || new Date()
            ],
            callback
        );
    },

    // Update status aplikasi (biasanya HR)
    updateApplicationStatus(application_id, status, callback) {
        const sql = `
            UPDATE job_applications
            SET status = ?
            WHERE application_id = ?
        `;
        db.query(sql, [status, application_id], callback);
    },

    // Hapus aplikasi
    deleteApplication(application_id, callback) {
        const sql = `
            DELETE FROM job_applications
            WHERE application_id = ?
        `;
        db.query(sql, [application_id], callback);
    }
};
