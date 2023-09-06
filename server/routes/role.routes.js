// server/routes/admin.routes.js
const express = require("express");
const router = express.Router();
const RoleController = require("../controllers/role.controller");
const { verifyToken } = require("../middleware/middleware");


router.post("/create", verifyToken, RoleController.create);

router.get("/", RoleController.get);

module.exports = router;
