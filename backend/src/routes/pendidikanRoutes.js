const express = require('express');

const {
    getPendidikan,
    getPendidikanById,
    postPendidikan,
    updatePendidikan,
    deletePendidikan
} = require('../controller/pendidikanController');

const router = express.Router();

// GET semua data pendidikan
router.get("/", getPendidikan);

// GET pendidikan berdasarkan ID
router.get("/:id", getPendidikanById);

// POST tambah pendidikan
router.post("/", postPendidikan);

// PUT update pendidikan
router.put("/:id", updatePendidikan);

// DELETE hapus pendidikan
router.delete("/:id", deletePendidikan);

module.exports = router;
