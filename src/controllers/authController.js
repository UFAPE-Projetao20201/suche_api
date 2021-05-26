const express = require('express');

const User = require('../model/user');

const bcrypt = require('bcryptjs');

const router = express.Router();

const simplecrypt = require('simplecrypt');
const sc = simplecrypt({salt: "10"});

const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

function generateToken( params = {}){
    return jwt.sign(params, authConfig.secret, { expiresIn: 86400 ,});
}

//Criando Rota de Registro de Usuario (CREATE do CRUD)
router.post("/register", async (req, res) => {
    const { email, telefone } =  req.body;
    try {
        const user = await User.create(req.body);

        user.password = undefined;
        const token = generateToken({email : user.email});

        return res.status(201).send({ user, token }) //Retornando pra visualizacao do User e STATUS 201 (Created)
    } catch (erro) {
        //throw new Error(erro.message);
        return res.status(404).send( {error: 'Registration failed'});

    }
});

router.post('/authenticate', async (req,res) => {
    const { email, password}  = req.body;

    const user = await User.findOne({email}).select('+password');

    if (!user){
        return res.status(404).send({ error: 'User not found'});
    }
    
    let passBD = password;
    
    
    if ( user.password !=  passBD ){//!await bcrypt.compareSync(password, user.password) || password != user.password
        //console.log(await sc.encrypt(password));
        //console.log(await sc.decrypt(user.password));
        //console.log(await bcrypt.compareSync(password, user.password));
        
        return res.status(400).send({error: "Password not valid"});
    }

    user.password = undefined;

    const token = generateToken({email : user.email});
    res.send({user, token});
});



module.exports = app => app.use('/auth', router);