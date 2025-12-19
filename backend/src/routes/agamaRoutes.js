const express = require('express');

const {
    getAgama,
    getAgamaById,
    postAgama,
    updateAgama,
    deleteAgama
} = require('../controller/agamaController');

const router = express.Router();

// GET semua data agama
router.get("/", getAgama);

// GET agama berdasarkan ID
router.get("/:id", getAgamaById);

// POST tambah agama
router.post("/", postAgama);

// PUT update agama
router.put("/:id", updateAgama);

// DELETE hapus agama
router.delete("/:id", deleteAgama);

module.exports = router;
