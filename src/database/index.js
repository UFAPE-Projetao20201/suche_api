const mongoose = require('mongoose');
const dataAcess = require('../sensitive');
//Inicializacao do BD padrao
//mongoose.connect('mongodb://localhost:27017/noderest');
mongoose.connect(dataAcess());


mongoose.Promise = global.Promise;

module.exports = mongoose;