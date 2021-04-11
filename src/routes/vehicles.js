const router = require("express").Router();
const Vehicle = require("../models/Vehicles");
const { isAuthenticated } = require('../utils/auth');

router.get("/", isAuthenticated,  async (req, res) => {
  let vehicles = await Vehicle.find().lean();
  
  res.render("vehicles/all-vehicles",  { vehicles });
});

router.get("/register",isAuthenticated,  (req, res) => {
  res.render("vehicles/register");
});

router.post("/register", isAuthenticated, async (req, res) => {
  const { type, plate, station, _state } = req.body;

  const newVehicle = new Vehicle({
    type,
    plate,
    station,
    _state,
  });

  try {
    const savedVehicle = await newVehicle.save();
    res.redirect("/vehicle");
  } catch (err) {
    res.render("vehicles/register", {
      err,
      type,
      plate,
      station,
      _state,
    });
  }
});

module.exports = router;
