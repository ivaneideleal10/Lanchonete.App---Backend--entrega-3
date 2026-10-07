const express = require("express");
const router = express.Router();

const {
    cadastrarProduto,
    listarProdutos
} = require("../controllers/produtoController");

router.post("/produtos", cadastrarProduto);
router.get("/produtos", listarProdutos);

module.exports = router;