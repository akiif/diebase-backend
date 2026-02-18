const mongoose = require("mongoose");

const SubDieCastBrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    parent_brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "diecast_brands",
      required: true,
    },
    website: String,
    logo_url: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("sub_diecast_brands", SubDieCastBrandSchema);
