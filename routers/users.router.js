const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const authMiddleware = require("../utils/auth.middleware");

router.post ("/", usersController.registerUser);
router.get ("/", usersController.getUsers);
router.get ("/:userName", usersController.getUserInfo);
router.post ("/login/", usersController.loginUser);
router.put ("/:userName", usersController.updateUser);
router.delete ("/:userName", usersController.deleteUser);
router.get("/check-duplicates", usersController.checkDuplicates);

module.exports = router;
