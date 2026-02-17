const VehicleBrandService = require("@/services/vehicleBrands.service");

const VehicleBrandsController = {};

VehicleBrandsController.addNewVehicleBrand = async (req, res) => {
  try {
    const vehicle_brand = req.body;

    if (!vehicle_brand?.name || vehicle_brand?.name === "") {
      const errorMessage = `Error: No vehicle brand name provided!`;
      console.log(`[${new Date().toISOString()}] ${errorMessage}`);

      return res.status(400).json({
        success: false,
        message: errorMessage,
        data: null,
      });
    }

    const vehicleBrandAddResponse =
      await VehicleBrandService.addNewVehicleBrandEntryIntoDB(vehicle_brand);

    if (vehicleBrandAddResponse.error) {
      const errorCode = vehicleBrandAddResponse?.errorCode
        ? vehicleBrandAddResponse?.errorCode
        : 400;
      return res.status(errorCode).json({
        success: false,
        message: vehicleBrandAddResponse.message,
        data: null,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: vehicleBrandAddResponse.message,
        data: vehicleBrandAddResponse.data,
      });
    }
  } catch (error) {
    const errorMessage = `Error: Error while trying to add new vehicle brand ${error.message}`;
    console.error(`[${new Date().toISOString()}] ${errorMessage}`);
    return res.status(500).json({
      success: false,
      message: errorMessage,
      data: null,
    });
  }
};

VehicleBrandsController.searchVehicleBrand = async (req, res) => {
  try {
    const vehicle_brand = req.body;

    const vehicleBrandAddResponse =
      await VehicleBrandService.searchForVehicleBrandInTheDB(vehicle_brand);

    if (vehicleBrandAddResponse.error) {
      const errorCode = vehicleBrandAddResponse?.errorCode
        ? vehicleBrandAddResponse?.errorCode
        : 400;
      return res.status(errorCode).json({
        success: false,
        message: vehicleBrandAddResponse.message,
        data: null,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: vehicleBrandAddResponse.message,
        data: vehicleBrandAddResponse.data,
      });
    }
  } catch (error) {
    const errorMessage = `Error: Error while searching for the vehicle brands for the given query!`;
    console.error(`[${new Date().toISOString()}] ${errorMessage}`);
    return res.status(500).json({
      success: false,
      message: errorMessage,
      data: null,
    });
  }
};

module.exports = VehicleBrandsController;
