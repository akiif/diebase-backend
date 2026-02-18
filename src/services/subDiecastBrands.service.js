const SubDieCastBrandModel = require("@/models/sub_diecast_brands");

const SubDiecastBrandService = {};

SubDiecastBrandService.addNewSubDiecastBrandEntryIntoDB = async (sub_diecast_brand) => {
  try {
    const subDieCastBrandItem = new SubDieCastBrandModel(sub_diecast_brand);
    const dbResponse = await subDieCastBrandItem.save();

    if (dbResponse) {
      const responseMessage = `Successfully created new Sub-Diecast Brand with name ${dbResponse?.name} and doc _id ${dbResponse?._id}`;
      console.log(`[${new Date().toISOString()}] Info: ${responseMessage}.`);

      return {
        success: true,
        message: responseMessage,
        data: sub_diecast_brand,
      };
    }

    return {
      error: null,
      message: `Successfully inserted the new sub-diecast brand ${sub_diecast_brand?.name}`,
      data: subDieCastBrandItem,
    };
  } catch (error) {
    // Duplicate entry error code
    if (error?.errorResponse?.code === 11000) {
      const errMessage = `Duplicate entry! ${sub_diecast_brand?.name} already exists in the database.`;
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
    const errorMessage = `Error while inserting the new sub-diecast brand ${sub_diecast_brand?.name}`;
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

SubDiecastBrandService.searchForSubDieCastBrandInTheDB = async (sub_diecast_brand) => {
  try {
    let query = {};
    const sub_diecast_brand_name = sub_diecast_brand?.sub_diecast_brand_name;
    const sub_diecast_brand_id = sub_diecast_brand?.sub_diecast_brand_id;

    if (sub_diecast_brand_id) {
      const dbResponseForId =
        await SubDieCastBrandModel.findById(sub_diecast_brand_id).populate(
          "parent_brand"
        );
      if (dbResponseForId) {
        return {
          error: null,
          message: `Successfully queried the db for the sub-diecast brand id ${sub_diecast_brand_id}`,
          data: dbResponseForId,
        };
      } else {
        return {
          error: true,
          message: `No sub-diecast brand found in the db for the sub-diecast brand id ${sub_diecast_brand_id}`,
          data: null,
          errorCode: 404,
        };
      }
    } else if (sub_diecast_brand_name && typeof sub_diecast_brand_name === "string") {
      query = {
        name: sub_diecast_brand_name,
      };

      const dbResponseOne =
        await SubDieCastBrandModel.findOne(query).populate("parent_brand");
      if (dbResponseOne) {
        return {
          error: null,
          message: `Successfully queried the db for the sub-diecast brand ${sub_diecast_brand_name}`,
          data: dbResponseOne,
        };
      } else {
        return {
          error: true,
          message: `No sub-diecast brand found in the db for the sub-diecast brand ${sub_diecast_brand_name}`,
          data: null,
          errorCode: 404,
        };
      }
    } else {
      const sub_diecast_brand_list =
        await SubDieCastBrandModel.find(query).populate("parent_brand");

      if (sub_diecast_brand_list && Array.isArray(sub_diecast_brand_list)) {
        const responseMessage = `Search query for Sub-DieCast Brand was successful!`;
        console.log(`[${new Date().toISOString()}] Info: ${responseMessage}.`);

        return {
          success: true,
          message: responseMessage,
          data: sub_diecast_brand_list,
        };
      } else {
        return {
          error: null,
          message: `No sub-diecast brand found for the given query!`,
          data: null,
        };
      }
    }
  } catch (error) {
    const errorMessage = `Error while searching for the sub-diecast brand for the given query!`;
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

module.exports = SubDiecastBrandService;
