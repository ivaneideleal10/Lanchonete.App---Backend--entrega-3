const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function cadastrarProduto(req, res) {
    try {
        const { nome, descricao, preco, imagem } = req.body;

        if (!nome || preco === undefined) {
            return res.status(400).json({
                mensagem: "Nome e preço são obrigatórios."
            });
        }

        const produto = await prisma.produto.create({
            data: {
                nome,
                descricao,
                preco: Number(preco),
                imagem
            }
        });

        res.status(201).json({
            mensagem: "Produto cadastrado com sucesso!",
            produto
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensagem: "Erro ao cadastrar produto."
        });
    }
}

async function listarProdutos(req, res) {
    try {
        const produtos = await prisma.produto.findMany();

        res.status(200).json(produtos);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensagem: "Erro ao listar produtos."
        });
    }
}

module.exports = {
    cadastrarProduto,
    listarProdutos
};