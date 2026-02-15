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

module.exports = DiecastBrandService;
