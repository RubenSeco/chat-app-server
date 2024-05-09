const { response } = require("express");
const User = require("../models/usuario");
const bcrypt = require("bcryptjs/dist/bcrypt");
const { createJWT } = require("../helpers/jwt");


const createUser = async (req, res = response) => {

  try {
    const { email, password } = req.body;

    // Verificar que el email no exista
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).send({
        ok: false,
        msg: "El correo ya existe",
      });
    }

    const user = new User(req.body);
    // Encriptar password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Guardar user en la DB
    await user.save();

    // Generar el JWT
    const token = await createJWT(user.id);

    res.send({
      ok: true,
      user,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador"
    });
  }
};

// login
const login = async (req, res = response) => {

  const { email, password } = req.body;

  try {
    const userDB = await User.findOne({ email });
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email no encontrado"
      });
    }

    // Validar el password
    const validPassword = bcrypt.compareSync(password, userDB.password);
    if (!validPassword) {
      return res.status(404).json({ ok: false, msg: "El password no es correcto" });
    }

    // Generar JWT
    const token = await createJWT(userDB.id);

    res.json({
      ok: true,
      user: userDB,
      token
    });



  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador"
    });
  }
};


// renewToken
const renewToken = async (req, res = response) => {

  const uid = req.uid;

  // Generar un nuevo JWT

  const token = await createJWT(uid);

  // Obtener el usuario por UID

  const user = await User.findById(uid);

  res.json({
    ok: true,
    user,
    token,
  });
};


module.exports = { createUser, login, renewToken };