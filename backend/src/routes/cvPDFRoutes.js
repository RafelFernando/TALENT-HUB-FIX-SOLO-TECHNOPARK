const express = require("express");
const router = express.Router();
const CvPdfController = require("../controller/cvPDFController");

router.get("/", CvPdfController.getAll);
router.get("/:id", CvPdfController.getById);
router.get("/user/:user_id", CvPdfController.getByUserId);
router.post("/", CvPdfController.create);
router.put("/:id", CvPdfController.update);
router.delete("/:id", CvPdfController.delete);

module.exports = router;
