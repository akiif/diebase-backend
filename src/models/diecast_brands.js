const mongoose = require("mongoose");

const dieCastBrandsSchema = new mongoose.Schema({
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
});

const DieCastBrandModel = mongoose.model("diecast_brands", dieCastBrandsSchema);
module.exports = DieCastBrandModel;
