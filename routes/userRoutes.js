const express = require("express");
const controller = require("../controllers/userController");
const { isGuest } = require("../middlewares/auth");
const { isLoggedIn } = require("../middlewares/auth");
const router = express.Router();

//login
router.get("/login", isGuest, controller.login);

//process login
router.post("/", isGuest, controller.authenticate);

//sign up
router.get("/signup", isGuest, controller.signup);

//post new user
router.post("/create", isGuest, controller.create);

//profile
router.get("/profile", isLoggedIn, controller.profile);

//logout
router.get("/logout", isLoggedIn, controller.logout);

module.exports = router;
