const SubDiecastBrandService = require("@/services/subDiecastBrands.service");

const SubDieCastBrandsController = {};

SubDieCastBrandsController.addNewSubDieCastBrand = async (req, res) => {
  try {
    const diecast_brand = req.body;

    if (!diecast_brand?.name || diecast_brand?.name === "") {
      const errorMessage = `Error: No sub diecast brand name provided!`;
      console.log(`[${new Date().toISOString()}] ${errorMessage}`);

      return res.status(400).json({
        success: false,
        message: errorMessage,
        data: null,
      });
    }

    const subDiecastBrandAddResponse =
      await SubDiecastBrandService.addNewSubDiecastBrandEntryIntoDB(diecast_brand);

    if (subDiecastBrandAddResponse.error) {
      const errorCode = subDiecastBrandAddResponse?.errorCode
        ? subDiecastBrandAddResponse?.errorCode
        : 400;
      return res.status(errorCode).json({
        success: false,
        message: subDiecastBrandAddResponse.message,
        data: null,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: subDiecastBrandAddResponse.message,
        data: subDiecastBrandAddResponse.data,
      });
    }
  } catch (error) {
    const errorMessage = `Error: Error while trying to add new sub-diecast brand ${error.message}`;
    console.error(`[${new Date().toISOString()}] ${errorMessage}`);
    return res.status(500).json({
      success: false,
      message: errorMessage,
      data: null,
    });
  }
};

SubDieCastBrandsController.searchSubDieCastBrand = async (req, res) => {
  try {
    const sub_diecast_brand = req.body;

    const subDiecastBrandSearchResponse =
      await SubDiecastBrandService.searchForSubDieCastBrandInTheDB(sub_diecast_brand);

    if (subDiecastBrandSearchResponse.error) {
      const errorCode = subDiecastBrandSearchResponse?.errorCode
        ? subDiecastBrandSearchResponse?.errorCode
        : 400;
      return res.status(errorCode).json({
        success: false,
        message: subDiecastBrandSearchResponse.message,
        data: null,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: subDiecastBrandSearchResponse.message,
        data: subDiecastBrandSearchResponse.data,
      });
    }
  } catch (error) {
    const errorMessage = `Error: Error while searching for the sub-diecast brands for the given query!`;
    console.error(`[${new Date().toISOString()}] ${errorMessage}`);
    return res.status(500).json({
      success: false,
      message: errorMessage,
      data: null,
    });
  }
};

module.exports = SubDieCastBrandsController;
