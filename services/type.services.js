const pool = require("../database/postgres");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const getAllTypes = async (req, res) => {
  try {
    let query = "SELECT * FROM type;";
    const response = await pool.query(query);
    if (!response) {
      return res.status(404).json({
        message: "No hay tipos de productos",
        code: 404,
      });
    }
    res.status(200).json(response.rows);
  } catch (error) {
    {
      console.log(error);
      res.status(500).json({
        message: "Ocurrió un error al obtener los tipos de productos",
      });
    }
  }
};

const createNewType = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { role } = jwt.verify(token, SECRET_KEY);
    if (role == "client") {
      return res.status(401).json({
        message: "No autorizado, token no pertenece a un usuario administrador",
        code: 401,
      });
    }
    const { name } = req.body;
    const query = "INSERT INTO type (name) VALUES ($1) RETURNING *;";
    const values = [name];
    const response = await pool.query(query, values);
    res.status(201).json(response.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      res.status(409).json({ message: "El tipo ya existe" });
      console.error(error.detail);
      console.error("Constraint:", error.constraint);
    } else {
      console.log(error.code);
      res
        .status(500)
        .json({ message: "Ocurrio un error al registrar el tipo" });
    }
  }
};

module.exports = {
  getAllTypes,
  createNewType,
};
