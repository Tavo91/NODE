const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const { usersModel } = require("../models");

const getProperties = require("../utils/handlePropertiesEngine");

const propertiesKey = getProperties();

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, "NOT TOKEN", 401);
      return;
    }
    //obtenemos solo el token
    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await verifyToken(token);
    if (!dataToken) {
      handleHttpError(res, "NOT PAYLOAD DATA", 401);
      return;
    }

    const query = {
      [propertiesKey.id]: dataToken[propertiesKey.id],
    };
    /**para saber que usuario inicia sesio */
    /**realiza una busqueda dependiendo la bd y su propiedad id */
    const user = await usersModel.findOne(query);
    req.user = user;
    next();
  } catch (e) {
    handleHttpError(res, "NOT Session", 401);
  }
};

module.exports = authMiddleware;
