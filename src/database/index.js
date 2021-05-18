const mongoose = require('mongoose');
//Inicializacao do BD padrao
mongoose.connect('mongodb://localhost:27017/noderest');

mongoose.Promise = global.Promise;

module.exports = mongoose;