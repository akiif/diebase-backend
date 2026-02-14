const mongoose = require("mongoose");
const { colorLogger } = require("@/utils/log.util");

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);

    await colorLogger(
      "2F3C7E",
      "00539C",
      "EEA47F",
      `Connected to diebaseDB successfully: ${conn.connection.host}!`
    );
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

// Optional: Graceful shutdown
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed due to app termination");
  process.exit(0);
});

module.exports = connectDB;
