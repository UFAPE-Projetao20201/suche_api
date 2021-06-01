const express = require('express');
const authMiddleware = require('../middlewares/auth');

const User = require('../model/user');

const router = express.Router();

const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

const mailer = require('../modules/mailer');

function generateToken( params = {}){
    return jwt.sign(params, authConfig.secret, { expiresIn: 86400 ,});
}

//Criando Rota de Registro de Usuario (CREATE)
router.post("/register", async (req, res) => {
    const { email, phone } =  req.body;
    try {
        const user = await User.create(req.body);

        const token = generateToken({email : user.email});

        return res.status(201).send({ user, token }) //Retornando pra visualizacao do User e STATUS 201 (Created)
    } catch (erro) {
        return res.status(404).send( {error: erro.message});

    }
});

//AUTENTICACAO DE LOGIN
router.post('/authenticate', async (req,res) => {
    const { email, password}  = req.body;

    const user = await User.findOne({email}).select('+password');

    if (!user){
        return res.status(404).send({ error: 'User not found'});
    }
    
    let passBD = password;
    
    
    if ( user.password !=  passBD ){
        
        return res.status(400).send({error: "Password not valid"});
    }

    user.password = undefined;

    const token = generateToken({email : user.email});
    res.send({user, token});
});
//Rotas a seguir precisam da validação por token
router.use(authMiddleware);

//ATUALIZAR PERFIL(NAME, SURNAME, GENDER)
  router.put('/update', async (req,res) => {
    const { email, phone } =  req.body;
    const body = req.body;
    
    try {
        const user = await User.findOne({ email });
        const userCheck = user;
        if (!user)
          return res.status(400).send({ error: 'User not found' });
        
        if (body.phone || body.birthDate){
          if (body.phone !== user.phone || body.birthDate !== user.birthDate){
            return res.status(400).send({error: 'You can only change Name, Surname and Gender'})
          }
        }
        
        if (body.name)
          user.name = body.name;
        
        if (body.surname)
          user.surname = body.surname;
        
        if (body.gender){
          user.gender = body.gender;
        }
        
        const token = generateToken({email : user.email});
        user.save();
        return res.status(200).send({ user, token })
    } catch (err) {
        
        return res.status(404).send( {error: 'Update error'});

    }
});

//promover para promotor de eventos
router.put('/promote', async (req,res) => {
  
  try {
    const { email , CPF_CNPJ }  = req.body;
    const body = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).send({ error: 'User not found' });
    
    if (!body.CPF_CNPJ){
      return res.status(400).send({ error: 'No CPF_CNPJ provided' });
    }
    const userCheck = await User.findOne({ CPF_CNPJ });

    if (userCheck){
      return res.status(400).send({ error: 'CPF_CNPJ is already in use' });
    }

    if (user.isPromoter){
      return res.status(404).send({ error: 'User is already a promoter' });
    }
    user.CPF_CNPJ = body.CPF_CNPJ;
    user.isPromoter = true;
    
    
    user.save();
    const token = generateToken({email : user.email});
    return res.status(200).send({ user, token })
} catch (err) {
    return res.status(404).send( {error: 'Cannot Update to promoter'});

}
});



module.exports = app => app.use('/auth', router);