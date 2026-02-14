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
  },
  { timestamps: true }
);

model.exports = mongoose.model("sub_diecast_brands", SubDieCastBrandSchema);
