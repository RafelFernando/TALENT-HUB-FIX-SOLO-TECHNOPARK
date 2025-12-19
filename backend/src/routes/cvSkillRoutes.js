const express = require("express");
const router = express.Router();
const CvSkillController = require("../controller/cvSkillController");

router.get("/user/:user_id", CvSkillController.getByUserId);
router.post("/", CvSkillController.create);
router.put("/:id", CvSkillController.update);
router.delete("/:id", CvSkillController.delete);

module.exports = router;
