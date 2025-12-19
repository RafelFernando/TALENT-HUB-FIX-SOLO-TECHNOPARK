const express = require("express");
const {
    getReports,
    getReportById,
    postReport,
    updateReport,
    deleteReport
} = require("../controller/reportsController");

const router = express.Router();

// GET semua laporan
router.get("/", getReports);

// GET laporan berdasarkan ID
router.get("/:id", getReportById);

// POST tambah laporan
router.post("/", postReport);

// PUT update laporan
router.put("/:id", updateReport);

// DELETE hapus laporan
router.delete("/:id", deleteReport);

module.exports = router;
