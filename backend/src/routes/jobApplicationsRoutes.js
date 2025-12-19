const express = require("express");
const {
    getApplications,
    getApplicationById,
    getApplicationsByJobId,
    getApplicationsByCandidateId,
    postApplication,
    updateApplicationStatus,
    deleteApplication
} = require("../controller/jobApplicationsController");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Job Applications Routes
|--------------------------------------------------------------------------
*/

// GET semua aplikasi
router.get("/", getApplications);

// GET aplikasi berdasarkan job_id (harus di atas /:id)
router.get("/job/:job_id", getApplicationsByJobId);

// GET aplikasi berdasarkan candidate_id
router.get("/candidate/:candidate_id", getApplicationsByCandidateId);

// GET aplikasi berdasarkan application_id
router.get("/:id", getApplicationById);

// POST tambah aplikasi
router.post("/", postApplication);

// PUT update status aplikasi
router.put("/:id/status", updateApplicationStatus);

// DELETE hapus aplikasi
router.delete("/:id", deleteApplication);

module.exports = router;
