const mongoose = require('mongoose');
const dataAcess = require('../sensitive');

//Inicializacao do BD padrao
mongoose.connect(dataAcess());
mongoose.Promise = global.Promise;
module.exports = mongoose;