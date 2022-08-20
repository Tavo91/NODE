/**Segundo importamos el instanciamiento */
const { sequelize } = require("../../config/mysql");

/**Primero se importan los DataTypes */
const { DataTypes } = require("sequelize");
const Storage = require("./storage");

const Tracks = sequelize.define(
  /**nombre de la tabla */
  "tracks",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    album: {
      type: DataTypes.STRING,
    },
    cover: {
      type: DataTypes.STRING,
    },
    artist_name: {
      type: DataTypes.STRING,
    },
    artist_nickname: {
      type: DataTypes.STRING,
    },
    artist_nationality: {
      type: DataTypes.STRING,
    },
    duration_start: {
      type: DataTypes.INTEGER,
    },
    duration_end: {
      type: DataTypes.INTEGER,
    },
    mediaId: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true, // crea createdAt, updatedAt
  }
);
/**Implentado modelo relacion uno  a muchos */
Tracks.findAllData = function () {
  Tracks.belongsTo(Storage, {
    foreignKey: "mediaId",
    as: "audio",
  });
  /**findAll metodo nativo de sequeliza */
  return Tracks.findAll({ include: "audio" });
};


Tracks.findOneData = function (id) {
  Tracks.belongsTo(Storage, {
    foreignKey: "mediaId",
    as: "audio",
  });
  /**findAll metodo nativo de sequeliza */
  return Tracks.findOne({where:{id}, include: "audio" });
};

module.exports = Tracks;
