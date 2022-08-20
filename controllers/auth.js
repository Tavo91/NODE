const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");
const { usersModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

const registerCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password }; //sobreecribimos el password
    const dataUser = await usersModel.create(body);
    dataUser.set("password", undefined, { strict: false }); // para no mostrar el password
    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };
    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "Error REGISTER_USER");
  }
};

//encargado de loguear al usuario
const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    //buscamos en la base de datos al usuario
    const user = await usersModel.findOne({ email: req.email });
    /**para my sql quitar la linea select */
    //.select("password name role email");
    if (!user) {
      handleHttpError(res, "USER_Not_ EXIST", 404);
      return;
    }
    const hashPassword = user.get("password");

    const check = await compare(req.password, hashPassword);
    if (!check) {
      handleHttpError(res, "PASSWORD_INVALIDA", 401);
      return;
    }
    user.set("password", undefined, { strict: false }); //para no mostrar el password
    const data = {
      token: await tokenSign(user),
      user,
    };
    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "Error LOGIN_USER");
  }
};

module.exports = { registerCtrl, loginCtrl };
