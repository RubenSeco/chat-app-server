const { Router } = require("express");
const { createUser, login, renewToken } = require("../controllers/auth");
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const validateJWT = require("../middlewares/validateJWT");


const router = Router();

// Crear nuevos usuarios

router.post("/new", [
  check("name", "El nombre es obligatorio y debe ser un string").not().isEmpty().isString(),
  check("password", "El password es obligatorio").not().isEmpty(),
  check("email", "El email es obligatorio").isEmail(),
  validateFields
], createUser);

// Login

router.post("/", [
  check("email", "El email es obligatorio").isEmail(),
  check("password", "El password es obligatorio").not().isEmpty(),
  validateFields
], login);

// Revalidar Token

router.get("/renew", validateJWT, renewToken);


module.exports = router;