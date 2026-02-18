const express = require("express");
const router = express.Router();

const validateMiddleware = require("@/middleware/validate.middleware");
const SubDieCastBrandsController = require("@/controllers/subDiecastBrands.controller");

/**
 * @route POST /diebase-api/sub-diecast-brands/add
 * @description api to add a new sub diecast brand
 * @access Private
 */
router.post(
  "/sub-diecast-brands/add",
  validateMiddleware.validateApiKey,
  SubDieCastBrandsController.addNewSubDieCastBrand
);


/**
 * @route POST /diebase-api/sub-diecast-brands/search
 * @description api to search for a new sub diecast brand or list all brands
 * @access Private
 */
router.post(
  "/sub-diecast-brands/search",
  validateMiddleware.validateApiKey,
  SubDieCastBrandsController.searchSubDieCastBrand
);

module.exports = router;
