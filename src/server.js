const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

// Rodando em servidor local
const port = 3000;
const app = express();
app.set("port" , port);
const server = http.createServer(app);
server.listen(port)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

require('./controllers/authController')(app);
require('./controllers/projectController')(app);

module.exports = app;