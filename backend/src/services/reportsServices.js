const Reports = require("../models/reportsModels");

module.exports = {
    getAllReportsService(callback) {
        Reports.getAllReports(callback);
    },

    getReportByIdService(report_id, callback) {
        Reports.getReportById(report_id, callback);
    },

    insertReportService(data, callback) {
        Reports.insertReport(data, callback);
    },

    updateReportService(report_id, data, callback) {
        Reports.updateReport(report_id, data, callback);
    },

    deleteReportService(report_id, callback) {
        Reports.deleteReport(report_id, callback);
    }
};
