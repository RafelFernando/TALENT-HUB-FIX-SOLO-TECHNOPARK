const express = require("express");
const router = express.Router();
const CvBahasaController = require("../controller/cvBahasaController");

router.get("/", CvBahasaController.getAll);
router.get("/user/:user_id", CvBahasaController.getByUserId);
router.get("/:id", CvBahasaController.getById);
router.post("/", CvBahasaController.create);
router.put("/:id", CvBahasaController.update);
router.delete("/:id", CvBahasaController.delete);

module.exports = router;
