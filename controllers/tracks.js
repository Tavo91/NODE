const { matchedData } = require("express-validator");
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
//lista todo
const getItems = async (req, res) => {
  try {
    const user = req.user;
    const data = await tracksModel.findAllData({});
    res.send({ data, user });
  } catch (e) {
    handleHttpError(res, "error en Get_Items_");
  }
};

//lista uno
const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await tracksModel.findOneData(id);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "Error en GET_ITEM");
  }
};

// crea
const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await tracksModel.create(body);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "error en Create_Items_");
  }
};

// actualiza
const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const data = await tracksModel.findOneAndUpdate(id, body);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "error en UPDate_Items_");
  }
};

// elimina
const deletItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await tracksModel.delete({ _id: id });
    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "Error en DELETE_ITEM");
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deletItem };
