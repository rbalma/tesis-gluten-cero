const jwt = require("jwt-simple");
const moment = require("moment");

// require('crypto').randomBytes(35).toString("hex")

exports.ensureAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ ok: false, message: "La peticion no tiene la cabecera de Autenticacion." });
  }

  const token = req.headers.authorization.replace(/['"]+/g, "");

  try {
    var payload = jwt.decode(token, process.env.JWT_SECRET);

    if (payload.exp <= moment().unix()) {
      return res.status(404).send({ ok: false, message: "El token ha expirado." });
    }
  } catch (ex) {
    return res.status(404).send({ ok: false, message: "Token invalido." });
  }
  req.user = payload;
  next();
};
