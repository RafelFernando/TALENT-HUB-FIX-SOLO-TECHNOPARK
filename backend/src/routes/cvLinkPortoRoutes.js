const express = require("express");
const router = express.Router();
const CvLinkPortoController = require("../controller/cvLinkPortoController");

router.get("/user/:user_id", CvLinkPortoController.getByUser);
router.post("/", CvLinkPortoController.create);
router.put("/:id", CvLinkPortoController.update);
router.delete("/:id", CvLinkPortoController.delete);

module.exports = router;
