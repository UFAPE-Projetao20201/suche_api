const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const morgan = require('morgan');

// Rodando em servidor local
const port = 3000;
const app = express();
app.set("port" , port);
const server = http.createServer(app);
server.listen(port)

console.log('API rodando na porta ' + port);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

require('./controllers/authController')(app);
require('./controllers/eventController')(app);

module.exports = app;