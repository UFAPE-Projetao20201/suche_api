const express = require('express');

const User = require('../model/User');

const router = express.Router();

//Criando Rota de Registro de Usuario (CREATE do CRUD)
router.post("/register", async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.status(201).send({ user }) //Retornando pra visualizacao do User e STATUS 201 (Created)
    } catch (erro) {
        return res.status(400).send( {error: 'Registration failed'});
        //return console.error(erro.response.data);

    }
});

module.exports = app => app.use('/auth', router);