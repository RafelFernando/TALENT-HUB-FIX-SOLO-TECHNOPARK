const express = require("express");
const {
    getAllUsers,
    getEmployers,
    getJobSeekers
} = require("../controller/adminUserRoleController");

const router = express.Router();

// Semua user + role
router.get("/", getAllUsers);

// Semua employer
router.get("/employer", getEmployers);

// Semua job seeker
router.get("/job_seeker", getJobSeekers);

module.exports = router;
