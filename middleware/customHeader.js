const customHeader = (req, res, next) => {
  try {
    const apikey = req.headers.api_key;
    if (apikey === "tavo") {
      next();
    } else {
      res.status(403);
      res.send({ error: "apikey no es correcta" });
    }
  } catch (e) {
    res.status(403);
    res.send({ error: "algo ocurrio en el custom header" });
  }
};

module.exports = customHeader;
