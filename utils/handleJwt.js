const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require("../utils/handlePropertiesEngine");

const propertiesKey = getProperties();

/**se pasa el usuario con sus propiedades(objeto de usuario) */
const tokenSign = async (user) => {
  //firma del usuario para generar el token
  const sign = jwt.sign(
    {
      /**payload */
      [propertiesKey.id]: user[propertiesKey.id],
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "2h", // expira el token
    }
  );
  return sign;
};

// se verifica el toquen para inicio de sesion el JWT
const verifyToken = async (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET);
  } catch (e) {
    return null;
  }
};

module.exports = { tokenSign, verifyToken };
