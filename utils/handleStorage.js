const multer = require("multer");
//configuramos  multer para cargar los archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const pathStorage = `${__dirname}/../storage`;
      cb(null, pathStorage);
    },
    filename: function (req, file, cb) {
      //obtenemos la extension del archivo
      const ext = file.originalname.split(".").pop();
      const filename = `file-${Date.now()}.${ext}`; // damos un nuevo nombre aleatorio
      cb(null, filename);
    },
  });
  ////
  ///middleware
  const uploadMiddleware = multer({ storage });
  ///

  module.exports= uploadMiddleware