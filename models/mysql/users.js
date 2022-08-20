/**Segundo importamos el instanciamiento */
const { sequelize } = require("../../config/mysql");

/**Primero se importan los DataTypes */
const { DataTypes } = require("sequelize");

/**declaramos el modelo */
const User = sequelize.define(
  /**nombre de la tabla */
  "users",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.NUMBER,
    },
    email: {
      type: DataTypes.STRING,
      //unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM(["user", "admin"]),
    },
  },
  {
    timestamps: true, // crea createdAt, updatedAt
  }
);

module.exports = User;
