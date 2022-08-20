const bcryptjs = require("bcryptjs");

//recibe passwordPlain, es igual a contraseña sin encriptar
const encrypt = async (passwordPlain) => {
  //encripta la contraseña
  const hash = await bcryptjs.hash(passwordPlain, 10);
  return hash;
};

const compare = async (passwordPlain, hashPassword) => {
    return await bcryptjs.compare(passwordPlain, hashPassword)
};

module.exports = { encrypt, compare };
