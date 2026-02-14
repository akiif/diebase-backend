const DiecastBrandService = require("@/services/diecastBrands.service");

const DieCastBrandsController = {};

DieCastBrandsController.addNewDieCastBrand = async (req, res) => {
  try {
    const diecast_brand = req.body;

    if (!diecast_brand?.name || diecast_brand?.name === "") {
      const errorMessage = `Error: No Die cast brand name provided!`;
      console.log(`[${new Date().toISOString()}] ${errorMessage}`);

      return res.status(400).json({
        success: false,
        message: errorMessage,
        data: null,
      });
    }

    const diecastBrandAddResponse =
      await DiecastBrandService.addNewDiecastBrandEntryIntoDB(diecast_brand);

    if (diecastBrandAddResponse.error) {
      const errorCode = diecastBrandAddResponse?.errorCode
        ? diecastBrandAddResponse?.errorCode
        : 400;
      return res.status(errorCode).json({
        success: false,
        message: diecastBrandAddResponse.message,
        data: null,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: diecastBrandAddResponse.message,
        data: diecastBrandAddResponse.data,
      });
    }
  } catch (error) {
    const errorMessage = `Error: Error while trying to add new diecast brand ${error.message}`;
    console.error(`[${new Date().toISOString()}] ${errorMessage}`);
    return res.status(500).json({
      success: false,
      message: errorMessage,
      data: null,
    });
  }
};

module.exports = DieCastBrandsController;
