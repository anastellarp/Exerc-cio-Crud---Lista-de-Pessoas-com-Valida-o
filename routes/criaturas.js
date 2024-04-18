const express = require('express');
const router = express.Router();

let listaCriaturas = [
    {
        id: 1,
        nome: "Grifo",
        idade: 100,
        email: "grifo@gmail.com",
        telefone: "123456789"
    },
    {
        id: 2,
        nome: "Fênix",
        idade: 500,
        email: "fenix@gmail.com",
        telefone: "987654321"
    },
    {
        id: 3,
        nome: "Unicórnio",
        idade: 300,
        email: "unicornio@gmail.com",
        telefone: "456789123"
    }
];

router.get('/', (req, res) => {
    res.json(listaCriaturas);
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const criatura = listaCriaturas.find(criatura => criatura.id == id);
    if (!criatura) {
        res.status(404).json({ mensagem: "Criatura não encontrada" });
    } else {
        res.json(criatura);
    }
});

router.post('/', (req, res) => {
    const { nome, idade, email, telefone } = req.body;
    if (!nome || !idade || !email || !telefone) {
        res.status(400).json({ mensagem: "Todos os atributos devem ser preenchidos" });
    } else {
        const novaCriatura = {
            id: listaCriaturas.length + 1,
            nome,
            idade,
            email,
            telefone
        };
        listaCriaturas.push(novaCriatura);
        res.status(201).json({ mensagem: "Criatura criada com sucesso!", novaCriatura });
    }
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { nome, idade, email, telefone } = req.body;
    const index = listaCriaturas.findIndex(criatura => criatura.id == id);
    if (index === -1) {
        res.status(404).json({ mensagem: "Criatura não encontrada" });
    } else {
        listaCriaturas[index] = { id: Number(id), nome, idade, email, telefone };
        res.json({ mensagem: "Criatura atualizada com sucesso!", criatura: listaCriaturas[index] });
    }
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const index = listaCriaturas.findIndex(criatura => criatura.id == id);
    if (index === -1) {
        res.status(404).json({ mensagem: "Criatura não encontrada" });
    } else {
        listaCriaturas.splice(index, 1);
        res.json({ mensagem: "Criatura excluída com sucesso!" });
    }
});

module.exports = router;
