const express = require("express");
const router = express.Router();
const controller = require("../controller/cvRiwayatKerjaController");

// GET by user
router.get("/user/:user_id", controller.getByUser);

// CREATE
router.post("/", controller.create);

// UPDATE
router.put("/:id", controller.update);

// DELETE
router.delete("/:id", controller.delete);

module.exports = router;
