const express = require("express");
const DesignationController = require("../controllers/desgination.controller");
const router = express.Router();

// Define the routes and associate them with controller methods
router.post("/", DesignationController.createDesignation);
router.get("/", DesignationController.getAllDesignations);

// Additional routes for update and delete can be added here...

module.exports = router;
