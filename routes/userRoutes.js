const express = require("express");
const controller = require("../controllers/userController");

const router = express.Router();

//login
router.get("/login", controller.login);

//process login
router.post("/", controller.authenticate);

//sign up
router.get("/signup", controller.signup);

//post new user
router.post("/create", controller.create);

//profile
router.get("/profile", controller.profile);

//logout
router.get("/logout", controller.logout);

module.exports = router;