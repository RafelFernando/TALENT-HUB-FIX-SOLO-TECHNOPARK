const express = require("express");
const { login } = require("../controller/authController");

const router = express.Router();

// POST login
router.post("/login", login);

module.exports = router;
