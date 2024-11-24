const pool = require("../database/postgres");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization;
    const { email } = jwt.verify(token, SECRET_KEY);
    const query = "SELECT * FROM users WHERE userid = $1";
    const response = await pool.query(query, [id]);
    if (!response.rows.length) {
      return res.status(404).json({
        message: "Usuario no existe",
        code: 404,
      });
    }
    if (response.rows[0].email !== email) {
      return res.status(401).json({
        message: "No autorizado, token no pertenece al usuario",
        code: 401,
      });
    }
    res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error al obtner el usuario" });
  }
};

const createNewUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, phone, addresses } = req.body;
    const query =
      "INSERT INTO users (firstname, lastname, email, password, phone, addresses, role) VALUES ($1, $2, $3, $4, $5, $6, 'client') RETURNING *;";
    const values = [
      firstname,
      lastname,
      email,
      bcrypt.hashSync(password),
      phone,
      JSON.stringify(addresses),
    ];
    const response = await pool.query(query, values);
    const user = response.rows[0];
    res.status(200).json({
      id: user.userid,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      message: "Usuario registrado correctamente",
    });
  } catch (error) {
    if (error.code === "23505") {
      res.status(409).json({ message: "El email ya esta registrado" });
      console.error(error.detail);
      console.error("Constraint:", error.constraint);
    } else {
      console.log(error.code);
      res
        .status(500)
        .json({ message: "Ocurrio un error al registrar usuarios" });
    }
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const query = "SELECT * FROM users WHERE email = $1;";
    const values = [email];
    const { rows } = await pool.query(query, values);
    if (!rows.length) {
      return res.status(401).json({
        message: "Usuario o contraseña incorrectos",
      });
    }
    const user = rows[0];
    //* Valida el password ingresado
    const verifyUser = bcrypt.compareSync(password, user.password);
    if (!verifyUser) {
      return res.status(401).json({
        message: "Usuario o contraseña incorrectos",
      });
    }
    //* Firmar token
    const token = jwt.sign(
      { id: user.userid, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: "6h" }
    );
    res
      .status(200)
      .json({
        id: user.userid,
        firstName: user.firstname,
        email: user.email,
        role: user.role,
        token,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrió un error al iniciar sesión" });
  }
};

module.exports = {
  getUser,
  createNewUser,
  userLogin,
};
