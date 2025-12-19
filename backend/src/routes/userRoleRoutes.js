const express = require("express");
const { 
    getUserRoles, 
    postUserRole,
    updateUserRole,
    deleteUserRole
} = require("../controller/userRoleController");

const router = express.Router();

router.get("/:user_id", getUserRoles);
router.post("/", postUserRole);
router.put("/:role_id", updateUserRole);
router.delete("/:role_id", deleteUserRole);

module.exports = router;
