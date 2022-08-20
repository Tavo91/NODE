const { Sequelize } = require("sequelize");

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

/**Instanciamientos de Sequelize */
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: "mysql",
});

/**Llamamos la funcion de conexion a la base de datos */
const dbConnectMySql = async () => {
  try {
    await sequelize.authenticate();
    console.log("MYSQL, conexion correcta");
  } catch (e) {
    console.log("MYSQL, error de conexion", e);
  }
};

module.exports = { sequelize, dbConnectMySql };
