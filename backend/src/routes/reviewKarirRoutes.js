const express = require("express");
const {
    getAll,
    getById,
    create,
    update,
    delete: deleteReview
} = require("../controller/reviewKarirController");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteReview);

module.exports = router;
