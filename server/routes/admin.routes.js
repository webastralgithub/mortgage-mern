const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/middleware"); // Import the verifyToken middleware

// Apply the verifyToken middleware to restrict access
router.post("/create-user",  UserController.createUser);
router.get("/get-users", verifyToken, UserController.getAllUsers);

module.exports = router;
