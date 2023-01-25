// adicionando a bilbioteca async-errors (aqui que eu vou fazer a configuração de como ele vai ter que lidar com o tratamento de excessões ). Obs: a importação deve ser feita bem no começo do arquivo.

require("express-async-errors")

// utilizando o método post
const AppError = require("./utils/AppError")
const routes = require('./routes'); //vai carregar, por padrão, o index.js para mim
const express = require('express');

const app = express();

app.use(express.json());// avisando que vamos utilizar o formato json para receber informações do body

app.use(routes); //o meu servidor vai utiliar as rotas (que está no arquivo index)

app.use((error,request,response, next) => {  //é nessa ordem que extraimos as informações 

  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error", 
      message: error.message});
  }//se a intancia do error for a mesma indtância desse tipo AppError, é porque é um erro que foi gerado pelo cliente.

console.error(error); // para que eu consiga debugar o erro caso eu precise  

  // Se o error não for desse tipo(do lado do cliente), eu vou imitir um erro padrão
return response.status(500).json({
  status: "error", 
  message: "internal server error"})

})//o que eu vou capturar do express-async-errors


const PORT = 3333;
app.listen(PORT, () => console.log('server is running on port ' + PORT));
