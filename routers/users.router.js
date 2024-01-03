const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");

router.post ("/", usersController.registerUser);
router.get ("/", usersController.getUsers);
router.get ("/", usersController.getUsers);
router.post ("/login/", usersController.loginUser);
router.put ("/:userName", usersController.updateUser);
router.delete ("/:userName", usersController.deleteUser);


module.exports = router;
