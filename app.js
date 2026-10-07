const express = require("express");
const usuarioRoutes = require("./src/routes/usuarioRoutes");
const produtoRoutes = require("./src/routes/produtoRoutes");
const pedidoRoutes = require("./src/routes/pedidoRoutes");

const app = express();

app.use(express.json());

app.use("/api", usuarioRoutes);
app.use("/api", produtoRoutes);
app.use("/api", pedidoRoutes);

app.get("/", (req, res) => {
    res.json({
        mensagem: "Lanchonete App API funcionando!"
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Servidor rodando na porta 3000");
});