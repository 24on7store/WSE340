const utilities = require("./utilities")
/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute")
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
app.use(express.static("public"))



/** Load css codes */
//app.use(express.static("public"))
//const static = require("./routes/static")

/* ***********************
 * Routes
 *************************/


/* ***********************
 * View Engine and Template
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root
//app.use(static)


/* ***********************
 * Routes
 *************************/
app.use(require("./routes/static"));
//Index route - Unit 3, Activity
//app.get("/", baseController.buildHome)
app.get("/",  utilities.handleErrors(baseController.buildHome))
// Inventory routes - Unit 3 assignment
//app.use("/inv", require("./routes/inventoryRoute"));
app.use("/inv", inventoryRoute)

/******************************************************
 * File not found eRoute - must be last route in list
 * Place after all routes
 * Unit 3, Basic Error Handling Activity
 *******************************************************/
app.use(async (req, res, next) => {
  next({ status: 404, message: "Sorry, we appear to have lost that page"});
});



/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  if (err.status == 404) {
    message = err.message
  } else {
    message = "Oh no! There was a crash. Maybe try a different route?"
  }
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  })
})

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})




//app.get("/", function(req, res){
  //res.render("index", {title: "Home"})
//})
// Inventory routes
//app.use("/inv", inventoryRoute)

//Index route added by me
//app.get("/", (req, res)=> {
  //res.render("index", {title: "CSE Motors"})
//})


