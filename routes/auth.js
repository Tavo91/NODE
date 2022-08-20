const express = require("express");

const router = express.Router();
const { registerCtrl, loginCtrl } = require("../controllers/auth");
const { validatorRegister, validatorLogin } = require("../validators/auth");

//crear un registro
//register
router.post("/register", validatorRegister, registerCtrl);

//login
router.post("/login", validatorLogin, loginCtrl);

module.exports = router;
