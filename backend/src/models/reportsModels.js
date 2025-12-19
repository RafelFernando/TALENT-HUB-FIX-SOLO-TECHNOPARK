const db = require("../config/connections");

module.exports = {
    // Ambil semua laporan
    getAllReports(callback) {
        const sql = `
            SELECT r.*, u.full_name AS admin_name
            FROM reports r
            LEFT JOIN users u ON r.admin_id = u.user_id
        `;
        db.query(sql, callback);
    },

    // Ambil laporan berdasarkan ID
    getReportById(report_id, callback) {
        const sql = `
            SELECT r.*, u.full_name AS admin_name
            FROM reports r
            LEFT JOIN users u ON r.admin_id = u.user_id
            WHERE r.report_id = ?
        `;
        db.query(sql, [report_id], callback);
    },

    // Tambah laporan baru
    insertReport(data, callback) {
        const sql = `
            INSERT INTO reports
            (name, email, message, status, admin_response, admin_id, created_at, updated_at, reviewed_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        db.query(
            sql,
            [
                data.name,
                data.email,
                data.message,
                data.status || "Pending",
                data.admin_response || null,
                data.admin_id || null,
                data.created_at || new Date(),
                data.updated_at || new Date(),
                data.reviewed_at || null
            ],
            callback
        );
    },

    // Update laporan
    updateReport(report_id, data, callback) {
        const sql = `
            UPDATE reports SET
                name = ?,
                email = ?,
                message = ?,
                status = ?,
                admin_response = ?,
                admin_id = ?,
                updated_at = ?,
                reviewed_at = ?
            WHERE report_id = ?
        `;
        db.query(
            sql,
            [
                data.name,
                data.email,
                data.message,
                data.status || "Pending",
                data.admin_response || null,
                data.admin_id || null,
                new Date(),
                data.reviewed_at || null,
                report_id
            ],
            callback
        );
    },

    // Hapus laporan
    deleteReport(report_id, callback) {
        const sql = `DELETE FROM reports WHERE report_id = ?`;
        db.query(sql, [report_id], callback);
    }
};
