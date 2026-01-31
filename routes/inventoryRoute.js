// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
//added
//const utilities = require("../utilities")
//const inChecks = require("/utilities/inventory-checks")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

module.exports = router;



