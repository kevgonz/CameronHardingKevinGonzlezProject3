const express = require("express");
const {body} = require('express-validator');
const controller = require("../controllers/userController");
const {isGuest, isLoggedIn} = require("../middlewares/auth");
const {logInLimiter} = require('../middlewares/rateLimiters');
const {validateSignUp, validateLogIn, validateResults} = require('../middlewares/validator');

const router = express.Router();

//login
router.get("/login", isGuest, controller.login);

//process login
router.post("/", logInLimiter, isGuest, validateLogIn, validateResults, controller.authenticate);

//sign up
router.get("/signup", isGuest, controller.signup);

//post new user
router.post("/create", isGuest, validateSignUp, controller.create);

//profile
router.get("/profile", isLoggedIn, controller.profile);

//logout
router.get("/logout", isLoggedIn, controller.logout);

module.exports = router;
