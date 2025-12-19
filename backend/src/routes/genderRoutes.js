const express = require('express');

const {
    getGender,
    getGenderById,
    postGender,
    updateGender,
    deleteGender
} = require('../controller/genderController');

const router = express.Router();

// GET semua data gender
router.get("/", getGender);

// GET gender berdasarkan ID
router.get("/:id", getGenderById);

// POST tambah gender
router.post("/", postGender);

// PUT update gender
router.put("/:id", updateGender);

// DELETE hapus gender
router.delete("/:id", deleteGender);

module.exports = router;
