const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function cadastrarUsuario(req, res) {
    try {
        const { nome, email, telefone, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({
                mensagem: "Nome, e-mail e senha são obrigatórios."
            });
        }

        const usuarioExistente = await prisma.usuario.findUnique({
            where: {
                email: email
            }
        });

        if (usuarioExistente) {
            return res.status(400).json({
                mensagem: "Este e-mail já está cadastrado."
            });
        }

        const usuario = await prisma.usuario.create({
            data: {
                nome,
                email,
                telefone,
                senha
            }
        });

        res.status(201).json({
    mensagem: "Usuário cadastrado com sucesso!",
    usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone,
        createdAt: usuario.createdAt
    }
});

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensagem: "Erro ao cadastrar usuário."
        });
    }
}

module.exports = {
    cadastrarUsuario
};