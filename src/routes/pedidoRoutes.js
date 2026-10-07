const express = require("express");
const router = express.Router();

const {
    criarPedido,
    listarPedidos,
    atualizarStatusPedido
} = require("../controllers/pedidoController");

router.post("/pedidos", criarPedido);
router.get("/pedidos", listarPedidos);
router.put("/pedidos/:id/status", atualizarStatusPedido);

module.exports = router;