/**Segundo importamos el instanciamiento */
const { sequelize } = require("../../config/mysql");

/**Primero se importan los DataTypes */
const { DataTypes } = require("sequelize");

const Storage = sequelize.define(
  /**nombre de la tabla */
  "storages",
  {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true, // crea createdAt, updatedAt
  }
);

module.exports = Storage;
