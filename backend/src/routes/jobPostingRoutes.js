const express = require("express");
const {
    getJobs,
    getJobById,
    getJobsByEmployer,
    getJobsByCategory,
    postJob,
    updateJob,
    deleteJob
} = require("../controller/jobPostingController");

const router = express.Router();

// GET semua job
router.get("/", getJobs);

// GET job berdasarkan ID
router.get("/:id", getJobById);

// GET job berdasarkan employer_id
router.get("/employer/:employer_id", getJobsByEmployer);

// GET job berdasarkan category_id
router.get("/category/:category_id", getJobsByCategory);

// POST tambah job
router.post("/", postJob);

// PUT update job
router.put("/:id", updateJob);

// DELETE hapus job
router.delete("/:id", deleteJob);

module.exports = router;
