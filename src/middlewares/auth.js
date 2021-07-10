const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');


module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader){
        return res.status(401).send({ error: "No token provided"});
    }

    const parts = authHeader.split(" ");

    if ( !parts.lenght === 2){
        return res.status(401).send({error: "Token error"});
    }

    const [ scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)){
        return res.status(401).send({error: "Token formatted error"});
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err){
            return res.status(401).send({error: "Token Invalid"});
        }

        req.email = decoded.email;
        return next();
    });
    return
};