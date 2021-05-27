const express = require('express');

const User = require('../model/user');

const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const router = express.Router();

const simplecrypt = require('simplecrypt');
const sc = simplecrypt({salt: "10"});

const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

const mailer = require('../modules/mailer');

function generateToken( params = {}){
    return jwt.sign(params, authConfig.secret, { expiresIn: 86400 ,});
}

//Criando Rota de Registro de Usuario (CREATE do CRUD)
router.post("/register", async (req, res) => {
    const { email, phone } =  req.body;
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

router.post('/forgot_password', async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user)
        return res.status(400).send({ error: 'User not found' });
  
      const token = crypto.randomBytes(20).toString('hex');
  
      const now = new Date();
      now.setHours(now.getHours() + 1);
  
      await User.findByIdAndUpdate(user.id, {
        '$set': {
          passwordResetToken: token,
          passwordResetExpires: now,
        }
      });
  
      mailer.sendMail({
        to: email,
        from: 'lfilipe-b35975@inbox.mailtrap.io',
        template: '/auth/forgot_password',
        context: { token },
      }, (err) => {
        if (err){
          //throw new Error(err.message);
          return res.status(400).send({ error: 'Cannot send forgot password email' });
        }
        return res.send();
      })
    } catch (err) {
      res.status(400).send({ error: 'Error on forgot password, try again' });
    }
  });

  router.put('/update', async (req,res) => {
    const { email, phone } =  req.body;
    const body = req.body;
    try {
        const user = await User.findOne({ email });
        const userCheck = user;
        if (!user)
          return res.status(400).send({ error: 'User not found' });
        
        if (body.phone){
          userCheck = await User.findOne({ phone });

          if (!userCheck){
            user.phone = body.phone;
          }
          else{
            return res.status(400).send({ error: 'Phone already in use' });
          }
        }
        
        if (body.name)
          user.name = body.name;
        
        if (body.surname)
          user.surname = body.surname;
        
        const token = generateToken({email : user.email});

        return res.status(200).send({ user, token })
    } catch (err) {
        
        return res.status(404).send( {error: 'Update error'});

    }
});



module.exports = app => app.use('/auth', router);