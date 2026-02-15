const DieCastBrandModel = require("@/models/diecast_brands");

const DiecastBrandService = {};

DiecastBrandService.addNewDiecastBrandEntryIntoDB = async (diecast_brand) => {
  try {
    const dieCastBrandItem = new DieCastBrandModel(diecast_brand);
    const dbResponse = await dieCastBrandItem.save();

    if (dbResponse) {
      const responseMessage = `Successfully created new DieCase Brand with name ${dbResponse?.name} and doc _id ${dbResponse?._id}`;
      console.log(`[${new Date().toISOString()}] Info: ${responseMessage}.`);

      return {
        success: true,
        message: responseMessage,
        data: diecast_brand,
      };
    }

    return {
      error: null,
      message: `Successfully inserted the new diecast brand ${diecast_brand?.name}`,
      data: dieCastBrandItem,
    };
  } catch (error) {
    // Duplicate entry error code
    if (error?.errorResponse?.code === 11000) {
      const errMessage = `Duplicate entry! ${diecast_brand?.name} already exists in the database.`;
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
    const errorMessage = `Error while inserting the new diecast brand ${diecast_brand?.name}`;
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

DiecastBrandService.searchForDieCastBrandInTheDB = async (diecast_brand) => {
  try {
    let query = {};
    const diecast_brand_name = diecast_brand?.diecast_brand_name;
    const diecast_brand_id = diecast_brand?.diecast_brand_id;

    if (diecast_brand_id) {
      const dbResponseForId = await DieCastBrandModel.findById(diecast_brand_id);
      if (dbResponseForId) {
        return {
          error: null,
          message: `Successfully queried the db for the diecast brand id ${diecast_brand_id}`,
          data: dbResponseForId,
        };
      } else {
        return {
          error: true,
          message: `No diecast brand found in the db for the diecast brand id ${diecast_brand_id}`,
          data: null,
          errorCode: 404,
        };
      }
    } else if (diecast_brand_name && typeof diecast_brand_name === "string") {
      query = {
        name: diecast_brand_name,
      };

      const dbResponseOne = await DieCastBrandModel.findOne(query);
      if (dbResponseOne) {
        return {
          error: null,
          message: `Successfully queried the db for the diecast brand ${diecast_brand_name}`,
          data: dbResponseOne,
        };
      } else {
        return {
          error: true,
          message: `No diecast brand found in the db for the diecast brand ${diecast_brand_name}`,
          data: null,
          errorCode: 404,
        };
      }
    } else {
      const diecast_brand_list = await DieCastBrandModel.find(query);

      if (diecast_brand_list && Array.isArray(diecast_brand_list)) {
        const responseMessage = `Search query for DieCast Brand was successful!`;
        console.log(`[${new Date().toISOString()}] Info: ${responseMessage}.`);

        return {
          success: true,
          message: responseMessage,
          data: diecast_brand_list,
        };
      } else {
        return {
          error: null,
          message: `No diecast brand found for the given query!`,
          data: null,
        };
      }
    }
  } catch (error) {
    const errorMessage = `Error while searching for the diecast brand for the given query!`;
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

module.exports = DiecastBrandService;
