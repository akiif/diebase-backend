const mongoose = require("mongoose");

const vehicleModelsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    vehicle_brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vehicle_brands",
    },
    year: Number,
    generation: String,
    notes: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("vehicle_models", vehicleModelsSchema);
