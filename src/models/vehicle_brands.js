const mongoose = require("mongoose");

const vehicleBrandsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    founded_year: {
      type: Number,
    },
    description: {
      type: String,
    },
    website: String,
    logo_link: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("vehicle_brands", vehicleBrandsSchema);
