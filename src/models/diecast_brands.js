const mongoose = require("mongoose");

const dieCastBrandsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    website: String,
    manufacturer: {
      type: String,
      trim: true,
    },
    description: String,
  },
  { timestamps: true }
);

const DieCastBrandModel = mongoose.model("diecast_brands", dieCastBrandsSchema);
module.exports = DieCastBrandModel;
