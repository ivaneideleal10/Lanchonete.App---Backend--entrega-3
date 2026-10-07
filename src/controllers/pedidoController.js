const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function criarPedido(req, res) {
    try {
        const { usuarioId, pagamento, itens } = req.body;

        if (!usuarioId || !pagamento || !itens || itens.length === 0) {
            return res.status(400).json({
                mensagem: "Usuário, forma de pagamento e itens são obrigatórios."
            });
        }

        const pedido = await prisma.pedido.create({
            data: {
                usuarioId,
                pagamento,
                itens: {
                    create: itens.map(item => ({
                        produtoId: item.produtoId,
                        quantidade: item.quantidade || 1
                    }))
                }
            },
            include: {
                itens: {
                    include: {
                        produto: true
                    }
                }
            }
        });

        res.status(201).json({
            mensagem: "Pedido criado com sucesso!",
            pedido
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensagem: "Erro ao criar pedido."
        });
    }
}

async function listarPedidos(req, res) {
    try {
        const pedidos = await prisma.pedido.findMany({
            include: {
                usuario: {
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                        telefone: true,
                        createdAt: true
                    }
                },
                itens: {
                    include: {
                        produto: true
                    }
                }
            }
        });

        res.status(200).json(pedidos);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensagem: "Erro ao listar pedidos."
        });
    }
}

async function atualizarStatusPedido(req, res) {
    try {
        const id = Number(req.params.id);
        const { status } = req.body;

        const statusPermitidos = [
            "Pedido recebido",
            "Em preparo",
            "Finalizado",
            "Pronto para retirada"
        ];

        if (!statusPermitidos.includes(status)) {
            return res.status(400).json({
                mensagem: "Status inválido."
            });
        }

        const pedido = await prisma.pedido.update({
            where: {
                id: id
            },
            data: {
                status: status
            }
        });

        res.status(200).json({
            mensagem: "Status do pedido atualizado com sucesso!",
            pedido
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensagem: "Erro ao atualizar status do pedido."
        });
    }
}

module.exports = {
    criarPedido,
    listarPedidos,
    atualizarStatusPedido
};