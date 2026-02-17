const VehicleBrandModel = require("@/models/vehicle_brands");

const VehicleBrandService = {};

VehicleBrandService.addNewVehicleBrandEntryIntoDB = async (vehicle_brand) => {
  try {
    const vehicleBrandItem = new VehicleBrandModel(vehicle_brand);
    const dbResponse = await vehicleBrandItem.save();

    if (dbResponse) {
      const responseMessage = `Successfully created new Vehicle Brand with name ${dbResponse?.name} and doc _id ${dbResponse?._id}`;
      console.log(`[${new Date().toISOString()}] Info: ${responseMessage}.`);

      return {
        success: true,
        message: responseMessage,
        data: vehicle_brand,
      };
    }

    return {
      error: null,
      message: `Successfully inserted the new vehicle brand ${vehicle_brand?.name}`,
      data: vehicleBrandItem,
    };
  } catch (error) {
    // Duplicate entry error code
    if (error?.errorResponse?.code === 11000) {
      const errMessage = `Duplicate entry! ${vehicle_brand?.name} already exists in the database.`;
      console.error(
        `[${new Date().toISOString()}] Error: ${errMessage}, ${error?.message}`
      );

      return {
        error: errMessage,
        errorCode: 409,
        message: errMessage,
        data: null,
      };
    }
    const errorMessage = `Error while inserting the new vehicle brand ${vehicle_brand?.name}`;
    console.error(
      `[${new Date().toISOString()}] Error: ${errorMessage}, ${error?.message}`
    );

    return {
      error: error,
      message: errorMessage,
      data: null,
    };
  }
};

VehicleBrandService.searchForVehicleBrandInTheDB = async (vehicle_brand) => {
  try {
    let query = {};
    const vehicle_brand_name = vehicle_brand?.vehicle_brand_name;
    const vehicle_brand_id = vehicle_brand?.vehicle_brand_id;

    if (vehicle_brand_id) {
      const dbResponseForId = await VehicleBrandModel.findById(vehicle_brand_id);
      if (dbResponseForId) {
        return {
          error: null,
          message: `Successfully queried the db for the vehicle brand id ${vehicle_brand_id}`,
          data: dbResponseForId,
        };
      } else {
        return {
          error: true,
          message: `No vehicle brand found in the db for the vehicle brand id ${vehicle_brand_id}`,
          data: null,
          errorCode: 404,
        };
      }
    } else if (vehicle_brand_name && typeof vehicle_brand_name === "string") {
      query = {
        name: vehicle_brand_name,
      };

      const dbResponseOne = await VehicleBrandModel.findOne(query);
      if (dbResponseOne) {
        return {
          error: null,
          message: `Successfully queried the db for the vehicle brand ${vehicle_brand_name}`,
          data: dbResponseOne,
        };
      } else {
        return {
          error: true,
          message: `No vehicle brand found in the db for the vehicle brand ${vehicle_brand_name}`,
          data: null,
          errorCode: 404,
        };
      }
    } else {
      const vehicle_brand_list = await VehicleBrandModel.find(query);

      if (vehicle_brand_list && Array.isArray(vehicle_brand_list)) {
        const responseMessage = `Search query for vehicle Brand was successful!`;
        console.log(`[${new Date().toISOString()}] Info: ${responseMessage}.`);

        return {
          success: true,
          message: responseMessage,
          data: vehicle_brand_list,
        };
      } else {
        return {
          error: null,
          message: `No vehicle brand found for the given query!`,
          data: null,
        };
      }
    }
  } catch (error) {
    const errorMessage = `Error while searching for the vehicle brand for the given query!`;
    console.error(
      `[${new Date().toISOString()}] Error: ${errorMessage}, ${error?.message}`
    );

    return {
      error: error,
      message: errorMessage,
      data: null,
    };
  }
};

module.exports = VehicleBrandService;
