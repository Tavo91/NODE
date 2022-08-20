const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const TracksSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    album: {
      type: String,
    },
    cover: {
      type: String,
      validate: {
        validator: (req) => {
          return true;
        },
        message: "error URL",
      },
    },
    artist: {
      name: {
        type: String,
      },
      nickname: {
        type: String,
      },
      nationality: {
        type: String,
      },
    },
    duration: {
      start: {
        type: Number,
      },
      end: {
        type: Number,
      },
    },
    mediaId: {
      type: mongoose.Types.ObjectId,
    },
  },
  {
    timestamps: true, // crea createdAt, updatedAt
    versionkey: false,
  }
);

/**Implementar metodo propio con relacion a storage */
TracksSchema.statics.findAllData = function () {
  const joinData = this.aggregate([
    //estoy en el modelo padre (tracks)
    {
      $lookup: {
        from: "storages", //desde trakcs , relaciono con storage
        localField: "mediaId", // en el padre utilizo el campo mediaId
        foreignField: "_id", //lo relaciona con storage_id
        as: "audio", // el resultado lo almecena en alias ("audio")
      },
    },
    {
      $unwind: "$audio", //metodo para quitar el array []
    },
  ]);
  return joinData;
};

/**Implementar metodo propio con relacion a storage */
TracksSchema.statics.findOneData = function (id) {
  const joinData = this.aggregate([
    //estoy en el modelo padre (tracks)

    {
      $match: {
        _id: mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "storages", //desde trakcs , relaciono con storage
        localField: "mediaId", // en el padre utilizo el campo mediaId
        foreignField: "_id", //lo relaciona con storage_id
        as: "audio", // el resultado lo almecena en alias ("audio")
      },
    },
    {
      $unwind: "$audio", //metodo para quitar el array []
    },
  ]);
  return joinData;
};

TracksSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("tracks", TracksSchema);
