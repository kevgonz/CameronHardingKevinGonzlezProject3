const express = require("express");
const controller = require("../controllers/connectionController");
const { isLoggedIn } = require("../middlewares/auth");
const { isHost } = require("../middlewares/auth");

const router = express.Router();

//send all connections
router.get("/", controller.index);

//send about
router.get("/about", controller.about);

//send contact
router.get("/contact", controller.contact);

//new connections
router.get("/new", isLoggedIn, controller.new);

//post new connections
router.post("/", isLoggedIn, controller.create);

//id connections
router.get("/:id", controller.show);

//connection edit
router.get("/:id/edit", isLoggedIn, isHost, controller.edit);

//put connection update
router.put("/:id", isLoggedIn, isHost, controller.update);

//delete
router.delete("/:id", isLoggedIn, isHost, controller.delete);

module.exports = router;
