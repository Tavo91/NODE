const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");

const {
  validatorCreateItem,
  validatorGetItem,
} = require("../validators/tracks");

const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deletItem,
} = require("../controllers/tracks");

//ruta que nos lista los tacks
router.get("/", authMiddleware, getItems);

//ruta que nos lista un tracks por id
router.get("/:id", authMiddleware, validatorGetItem, getItem);

//ruta para insertar o crear tracks
router.post(
  "/",
  authMiddleware,
  checkRol(["admin", "user"]),
  validatorCreateItem,
  createItem
);

//ruta para actualizar tracks
router.put(
  "/:id",
  authMiddleware,
  checkRol,
  validatorGetItem,
  validatorCreateItem,
  updateItem
);

//ruta para eliminar tracks
router.delete("/:id", authMiddleware, validatorGetItem, deletItem);

module.exports = router;
