require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morganBody = require("morgan-body");
const loggerStream = require("./utils/handleLogger");
const dbConnectNoSql = require("./config/mongo");
const { dbConnectMySql } = require("./config/mysql");
const app = express();
const ENGINE_DB = process.env.ENGINE_DB;
app.use(cors());

app.use(express.json());
// para obtener los recursos publicos de la carpeta storage
app.use(express.static("storage"));

morganBody(app, {
  noColors: true,
  stream: loggerStream,
  skip: function (req, res) {
    return res.statusCode < 400; //todo: envia solo msj de error
  },
});
const port = process.env.PORT || 3000;

//Aqui invocamos las rutas de Tracks
app.use("/api", require("./routes"));

app.listen(port, () => {
  console.log(
    "La aplicacion esta en linea en el puerto http://localhost: " + port
  );
});

ENGINE_DB === "nosql" ? dbConnectNoSql() : dbConnectMySql();
