// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
//added
//const utilities = require("../utilities")
//const inChecks = require("/utilities/inventory-checks")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// week 03 assigfnment - vehicle detail Route
router.get("/detail/:invId", invController.buildDetail)

router.get("/trigger-error", (req, res, next) => {
  try {
    throw new Error("Intentional server error")
  } catch (error) {
    error.status = "Server Error"
    next(error)
  }
})



module.exports = router;



