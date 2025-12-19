const express = require("express");
const router = express.Router();
const JobseekerInfoController = require("../controller/userProfileController");

// CRUD
router.get("/", JobseekerInfoController.getAll);
router.get("/:id", JobseekerInfoController.getById);
router.get("/user/:user_id", JobseekerInfoController.getByUserId); // tambahan
router.post("/", JobseekerInfoController.create);
router.put("/:id", JobseekerInfoController.update);
router.delete("/:id", JobseekerInfoController.delete);

module.exports = router;
