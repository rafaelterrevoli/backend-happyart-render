const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const validateJWT = (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    return res.status(401).json({
      message: "No autorizado, falta token",
      code: 401,
    });
  }

  jwt.verify(accessToken, SECRET_KEY, (err) => {
    if (err) {
      return res.status(403).json({
        message: "No autorizado, token expirado o inválido",
        code: 403,
      });
    }
    next();
  });
};

module.exports = validateJWT;