const express = require("express");
const { 
    getUsers, 
    postUser, 
    updateUser,
    deleteUser 
} = require("../controller/userController")
const UserController = require("../controller/userController");
const router = express.Router();

router.get("/", getUsers);
router.post("/", postUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/register", UserController.register);
router.get("/verify/:token", UserController.verifyEmail);

module.exports = router;
