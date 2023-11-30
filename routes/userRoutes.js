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
router.post("/", controller.create);

//profile
router.get("/profile", controller.profile);

module.exports = router;