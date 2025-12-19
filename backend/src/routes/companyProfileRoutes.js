const express = require('express');

const {
    getCompanyProfiles,
    getCompanyProfileById,
    getCompanyProfileByUserId,
    postCompanyProfile,
    updateCompanyProfile,
    deleteCompanyProfile
} = require('../controller/companyProfileController');

const router = express.Router();

// GET semua company profile
router.get("/", getCompanyProfiles);

// GET company profile berdasarkan primary key (profileid)
router.get("/:id", getCompanyProfileById);

// GET company profile berdasarkan user_id
router.get("/user/:user_id", getCompanyProfileByUserId);

// POST tambah company profile
router.post("/", postCompanyProfile);

// PUT update company profile
router.put("/:id", updateCompanyProfile);

// DELETE hapus company profile
router.delete("/:id", deleteCompanyProfile);

module.exports = router;
