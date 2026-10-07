const express = require("express");
const router = express.Router();

const { cadastrarUsuario } = require("../controllers/usuarioController");

router.post("/usuarios", cadastrarUsuario);

module.exports = router;