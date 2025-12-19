const express = require("express");
const {
    getSavedJobs,
    getSavedJobById,
    getSavedJobsByUserId,
    postSavedJob,
    deleteSavedJob
} = require("../controller/savedJobsController");

const router = express.Router();

// GET semua saved jobs
router.get("/", getSavedJobs);

// GET saved job by ID
router.get("/:id", getSavedJobById);

// GET saved jobs by user_id
router.get("/user/:user_id", getSavedJobsByUserId);

// POST tambah saved job
router.post("/", postSavedJob);

// DELETE saved job
router.delete("/:id", deleteSavedJob);

module.exports = router;
