const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}


/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
 // try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  //} catch (error) {
    //console.error("getclassificationsbyid error " + error)
  //}
}

//const invModel = require("../models/inventory-model")

/* ************************
 * Constructs the nav HTML
 ************************** */
async function getNav(req, res, next) {
  const data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'

  data.rows.forEach((row) => {
    list += `
      <li>
        <a href="/inv/type/${row.classification_id}"
           title="See our inventory of ${row.classification_name} vehicles">
          ${row.classification_name}
        </a>
      </li>
    `
  })

  list += "</ul>"
  return list
}

/* ****************************************
 * Error handling wrapper
 **************************************** */
const handleErrors = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

/* **************************************
 * Build classification grid HTML
 ************************************** */
async function buildClassificationGrid(data) {
  let grid = ""

  if (data.length > 0) {
    grid = '<ul id="inv-display">'

    data.forEach(vehicle => {
      grid += `
        <li>
          <a href="/inv/detail/${vehicle.inv_id}"
             title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
            <img src="${vehicle.inv_thumbnail}"
                 alt="Image of ${vehicle.inv_make} ${vehicle.inv_model} on CSE Motors">
          </a>

          <div class="namePrice">
            <hr>
            <h2>
              <a href="/inv/detail/${vehicle.inv_id}">
                ${vehicle.inv_make} ${vehicle.inv_model}
              </a>
            </h2>
            <span>$${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</span>
          </div>
        </li>
      `
    })

    grid += "</ul>"
  } else {
    grid = '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }

  return grid
}

/* **************************************
 * Build vehicle detail HTML
 ************************************** */
function buildVehicleDetail(vehicle) {
  return `
    <section class="vehicle-detail">
      <div class="vehicle-image">
        <img src="${vehicle.inv_image}"
             alt="${vehicle.inv_make} ${vehicle.inv_model}">
      </div>

      <div class="vehicle-info">
        <h2>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h2>
        <p><strong>Price:</strong> $${Number(vehicle.inv_price).toLocaleString()}</p>
        <p><strong>Mileage:</strong> ${Number(vehicle.inv_miles).toLocaleString()} miles</p>
        <p><strong>Description:</strong> ${vehicle.inv_description}</p>
        <p><strong>Color:</strong> ${vehicle.inv_color}</p>
      </div>
    </section>
  `
}

async function getVehicleById(inv_id) {
  try {
    const data = await pool.query(
      "SELECT * FROM public.inventory WHERE inv_id = $1",
      [inv_id]
    )
    return data.rows[0]
  } catch (error) {
    console.error("getVehicleById error:", error)
    throw error
  }
}




async function getVehicleById(inv_id) {
  try {
    const data = await pool.query(
      "SELECT * FROM public.inventory WHERE inv_id = $1",
      [inv_id]
    )
    return data.rows[0]
  } catch (error) {
    console.error("getVehicleById error:", error)
    throw error
  }
}
module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getVehicleById
}



//module.exports = { getVehicleById }









//module.exports = { getClassifications }
//module.exports = {getClassifications, getInventoryByClassificationId};module.exports = {getClassifications, getInventoryByClassificationId};






