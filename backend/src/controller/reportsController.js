const response = require("../utils/response");
const ReportsService = require("../services/reportsServices");

module.exports = {
    // GET /reports
    getReports(req, res) {
        ReportsService.getAllReportsService((error, result) => {
            if (error) return response(500, error, "Gagal mengambil data laporan", res);
            return response(200, result, "Berhasil mengambil data laporan", res);
        });
    },

    // GET /reports/:id
    getReportById(req, res) {
        const report_id = req.params.id;
        ReportsService.getReportByIdService(report_id, (error, result) => {
            if (error) return response(500, error, "Gagal mengambil laporan", res);
            if (!result || result.length === 0) return response(404, null, "Laporan tidak ditemukan", res);
            return response(200, result[0], "Berhasil mengambil laporan", res);
        });
    },

    // POST /reports
    postReport(req, res) {
        const data = req.body;
        if (!data.name || !data.email || !data.message) {
            return response(400, null, "Name, email, dan message wajib diisi", res);
        }
        ReportsService.insertReportService(data, (error, result) => {
            if (error) return response(500, error, "Gagal menambahkan laporan", res);
            if (result.affectedRows)
                return response(200, { isSuccess: result.affectedRows, report_id: result.insertId }, "Laporan berhasil ditambahkan", res);
            return response(400, null, "Laporan gagal ditambahkan", res);
        });
    },

    // PUT /reports/:id
    updateReport(req, res) {
        const report_id = req.params.id;
        const data = req.body;
        ReportsService.updateReportService(report_id, data, (error, result) => {
            if (error) return response(500, error, "Gagal mengupdate laporan", res);
            if (result.affectedRows)
                return response(200, { isSuccess: result.affectedRows, report_id }, "Laporan berhasil diupdate", res);
            return response(404, null, "Laporan tidak ditemukan", res);
        });
    },

    // DELETE /reports/:id
    deleteReport(req, res) {
        const report_id = req.params.id;
        ReportsService.deleteReportService(report_id, (error, result) => {
            if (error) return response(500, error, "Gagal menghapus laporan", res);
            if (result.affectedRows)
                return response(200, { isSuccess: result.affectedRows, report_id }, "Laporan berhasil dihapus", res);
            return response(404, null, "Laporan tidak ditemukan", res);
        });
    }
};
