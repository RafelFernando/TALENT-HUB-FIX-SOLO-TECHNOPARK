const express = require("express");
const router = express.Router();
const notifikasiController = require("../controller/notificationsController");
 
router.get("/", notifikasiController.getAll);
router.get("/:id", notifikasiController.getNotifikasiById);
router.get("/user/:user_id", notifikasiController.getNotifikasiByUserId);
router.post("/", notifikasiController.create);
router.put("/:id", notifikasiController.update);
router.delete("/:id", notifikasiController.delete);

module.exports = router;
