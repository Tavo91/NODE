const { handleHttpError } = require("../utils/handleError");

/**
 * array con roles permitidos
 */
const checkRol = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    console.log({ user });
    const rolesByUser = user.role; //todos los usuarios
    const checkValueRol = roles.some((rolSingle) =>
      rolesByUser.includes(rolSingle)
    ); //TODO:true o false
    if (!checkValueRol) {
      handleHttpError(res, "USUARIO NO TIENE PERMISOS", 403);
      return;
    }
    next();
  } catch (e) {
    handleHttpError(res, "ERROR NO TIENE PERMISOS", 403);
    return;
  }
};

module.exports = checkRol;
