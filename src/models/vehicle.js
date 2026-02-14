const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    vehicle_model: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vehicle_models",
      required: true,
    },
    vehicle_brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vehicle_brands",
      required: true,
    },
    diecast_brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "diecast_brands",
      required: true,
    },
    sub_diecast_brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sub_diecast_brands",
      required: false,
    },
    scale: {
      type: String,
      required: true,
      default: "1:64",
    },
    condition: {
      type: String,
      enum: ["Mint", "Good", "Opened", "Loose"],
      default: "Mint",
    },
    purchase_date: {
      type: Date,
    },
    purchase_price: {
      type: Number,
    },
    store: {
      type: String,
    },
    imageUrls: [
      {
        type: String,
      },
    ],
    notes: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("vehicle", vehicleSchema);
