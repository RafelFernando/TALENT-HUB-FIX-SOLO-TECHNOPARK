const express = require("express");
const router = express.Router();
const CvTentangSayaController = require("../controller/aboutMeController");

router.get("/", CvTentangSayaController.getAll);
router.get("/:id", CvTentangSayaController.getById);
router.get("/user/:user_id", CvTentangSayaController.getByUserId);
router.post("/", CvTentangSayaController.create);
router.put("/:id", CvTentangSayaController.update);
router.delete("/:id", CvTentangSayaController.delete);

module.exports = router;
