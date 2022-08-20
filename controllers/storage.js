const { storageModel } = require("../models");
const fs = require("fs");
const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

//lista todo
const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({});
    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "Error en GET_ITEMs");
  }
};

//lista uno
const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await storageModel.findById(id);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "Error en GET_ITEM");
  }
};

// crea
const createItem = async (req, res) => {
  try {
    const { file } = req;
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`,
    };
    const data = await storageModel.create(fileData);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "Error en CREATE_ITEM");
  }
};

// elimina
const deletItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const dataFile = await storageModel.findById(id);
    await storageModel.deleteOne(id);
    const { filename } = dataFile;
    const filePath = `${MEDIA_PATH}/${filename}`; //ruta absoluta
    fs.unlinkSync(filePath); // elimina todo hasta en la bd
    const data = {
      filePath,
      deleted: 1,
    };
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "Error en DELETE_ITEM");
  }
};

module.exports = { getItems, getItem, createItem, deletItem };
