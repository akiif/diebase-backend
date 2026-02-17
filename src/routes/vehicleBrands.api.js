const express = require("express");
const router = express.Router();

const validateMiddleware = require("@/middleware/validate.middleware");
const VehicleBrandsController = require("@/controllers/vehicleBrands.controller");

/**
 * @route POST /diebase-api/vehicle-brands/add
 * @description api to add a new vehicle brand
 * @access Private
 */
router.post(
  "/vehicle-brands/add",
  validateMiddleware.validateApiKey,
  VehicleBrandsController.addNewVehicleBrand
);

/**
 * @route POST /diebase-api/vehicle-brands/search
 * @description api to search for a new vehicle brand or list all brands
 * @access Private
 */
router.post(
  "/vehicle-brands/search",
  validateMiddleware.validateApiKey,
  VehicleBrandsController.searchVehicleBrand
);

module.exports = router;
