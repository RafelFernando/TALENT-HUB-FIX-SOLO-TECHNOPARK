const express = require('express');

const {
    getJobCategories,
    getJobCategoryById,
    postJobCategory,
    updateJobCategory,
    deleteJobCategory
} = require('../controller/jobKategoriController');

const router = express.Router();

// GET semua kategori pekerjaan
router.get("/", getJobCategories);

// GET kategori pekerjaan berdasarkan ID
router.get("/:id", getJobCategoryById);

// POST tambah kategori pekerjaan
router.post("/", postJobCategory);

// PUT update kategori pekerjaan
router.put("/:id", updateJobCategory);

// DELETE hapus kategori pekerjaan
router.delete("/:id", deleteJobCategory);

module.exports = router;
