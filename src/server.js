require('express-async-errors')
const  database = require("./database/sqlite") //importando o database

// utilizando o método post
const AppError = require('./utils/AppError')
const routes = require('./routes') //vai carregar, por padrão, o index.js para mim
const express = require('express')

const app = express()
app.use(express.json()) // avisando que vamos utilizar o formato json para receber informações do body

app.use(routes) //o meu servidor vai utiliar as rotas (que está no arquivo index)

database(); 

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  console.error(error) // para que eu consiga debugar o erro caso eu precise

  return response.status(500).json({
    status: 'error',
    message: 'internal server error'
  })
})

const PORT = 3333
app.listen(PORT, () => console.log('server is running on port ' + PORT))
