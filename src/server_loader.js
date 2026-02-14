const { colorLogger } = require("@/utils/log.util");
const mongoDB = require("@/helpers/db.helper");

/**
 * This function is used to load all the db connections,
 * configs and other requirements which are needed before the server
 * is started/listening.
 * @param {express.Application} app
 */
const serverLoader = async (app) => {
  try {
    await mongoDB();
    
    app.emit("start_server");
  } catch (error) {
    await colorLogger(
      "B85042",
      "CC313D",
      "F7C5CC",
      `Error in server loader`,
      "[server_loader]"
    );
    console.log("message", error.message);
  }
};

module.exports = serverLoader;
