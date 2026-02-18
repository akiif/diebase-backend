require("module-alias/register");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const serverLoader = require("./server_loader");
const { colorLogger } = require("./utils/log.util");

const app = express();

// import routes
const dieCastBrandRoutes = require("@/routes/diecastBrands.api");
const subDiecastBrandRoutes = require("@/routes/subDiecastBrands.api");
const vehicleBrandRoutes = require("@/routes/vehicleBrands.api");

// Middleware to log request response metadata
app.use(morgan("common"));

// Configure express Middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// For security
app.use(
  helmet({
    // ❌ Disable COOP/COEP/CORP (handled at proxy/CDN if needed)
    crossOriginEmbedderPolicy: false,
  })
);

// configure routes
app.use("/diebase-api", dieCastBrandRoutes);
app.use("/diebase-api", subDiecastBrandRoutes);
app.use("/diebase-api", vehicleBrandRoutes);

const port = process.env.DIEBASE_BACKEND_PORT || 8868;

// Load the db connections and other configs
// that are required before the server is started.
serverLoader(app);

app.on("start_server", () => {
  app.listen(port, async () => {
    await colorLogger(
      "2F3C7E",
      "234E70",
      "FBF8BE",
      `DieBase Backend is running on port ${port}.`
    );
  });
});
