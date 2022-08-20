const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const  {validatorGetItem} = require ("../validators/storage")
const { createItem, getItems, getItem, deletItem } = require("../controllers/storage");


//lista de almacenamiento
router.get("/", getItems )

//un archivo del almacenamiento
router.get("/:id",validatorGetItem, getItem)

//elimina un archivo
router.delete("/:id",validatorGetItem, deletItem)

//subir un archivo al almacenamiento
router.post("/", uploadMiddleware.single("myfile"), createItem);

module.exports = router;
