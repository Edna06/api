// utilizando o método post


const express = require('express');
const app = express();

const routes = require('./routes'); //vai carregar, por padrão, o index.js para mim

app.use(express.json());// avisando que vamos utilizar o formato json para receber informações do body

app.use(routes); //o meu servidor vai utiliar as rotas (que está no arquivo index)

const PORT = 3333;

app.listen(PORT, () => console.log('server is running on port ' + PORT));
