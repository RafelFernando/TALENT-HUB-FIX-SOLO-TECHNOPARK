const express = require("express");
const { loginAdmin } = require("../controller/authAdminController");

const router = express.Router();

// POST login admin
router.post("/admin/login", loginAdmin);

module.exports = router;
