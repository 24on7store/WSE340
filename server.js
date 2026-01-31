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

//Index route
app.get("/", baseController.buildHome)
// Inventory routes
app.use("/inv", inventoryRoute)

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


