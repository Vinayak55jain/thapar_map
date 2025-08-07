// routes/homeroute.js
const express = require("express");
const router = express.Router();
const homeController = require("../controller/homeController");

router.get("/buildings/location", homeController.getAllBuildingLocations);

module.exports = router;
