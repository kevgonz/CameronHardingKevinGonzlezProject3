const express = require("express");
const controller = require("../controllers/connectionController");

const router = express.Router();

//send all connections
router.get("/", controller.index);

//send about
router.get("/about", controller.about);

//send contact
router.get("/contact", controller.contact);

//new connections
router.get("/new", controller.new);

//post new connections
router.post("/", controller.create);

//id connections
router.get("/:id", controller.show);

//connection edit
router.get("/:id/edit", controller.edit);

//put connection update
router.put("/:id", controller.update);

//delete
router.delete("/:id", controller.delete);

module.exports = router;
