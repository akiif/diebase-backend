const express = require("express");
const router = express.Router();

const validateMiddleware = require("@/middleware/validate.middleware");
const DieCastBrandsController = require("@/controllers/diecastBrands.controller");

/**
 * @route POST /diebase-api/diecast-brands/add
 * @description api to add a new diecast brand
 * @access Private
 */
router.post(
  "/diecast-brands/add",
  validateMiddleware.validateApiKey,
  DieCastBrandsController.addNewDieCastBrand
);


/**
 * @route POST /diebase-api/diecast-brands/search
 * @description api to search for a new diecast brand or list all brands
 * @access Private
 */
router.post(
  "/diecast-brands/search",
  validateMiddleware.validateApiKey,
  DieCastBrandsController.searchDieCastBrand
);

module.exports = router;
