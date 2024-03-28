const express = require("express");
const router = express.Router();
const roleContoller = require("../controllers/role.controller");

router.get("/", roleContoller.getAllRoles);
router.post("/", roleContoller.createRole);
router.delete("/:id", roleContoller.deleteRole);

module.exports = router;
