const validateMiddleware = {};

/**
 * Validate middleware used to validate that the correct api-key is
 * sent in the request header.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
validateMiddleware.validateApiKey = (req, res, next) => {
  if (req.headers["api-key"] && req.headers["api-key"] === process.env.DIEBASE_API_KEY) {
    return next();
  } else {
    const responseMessage = "Invalid Api Key";
    const response = { success: false, message: responseMessage, data: null };
    return res.status(401).json(response);
  }
};

module.exports = validateMiddleware;
