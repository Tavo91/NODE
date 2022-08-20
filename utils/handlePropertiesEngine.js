const ENGINE_DB = process.env.ENGINE_DB;

/**tomamos el valor de la variable de entorno ENGINE_DB */
/**esta funcion normaliza el uso de _id, para el uso en ambas bd */
const getProperties = () => {
  const data = {
    nosql: {
      id: "_id",
    },
    mysql: {
      id: "id",
    },
  };
  /**deestructuramos y puede retornar los datos de nosql o mysql */
  return data[ENGINE_DB];
};

module.exports = getProperties;
