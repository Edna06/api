require('express-async-errors')

const migrationsRun = require('./database/sqlite/migrations') //importando a migrations
const AppError = require('./utils/AppError')
const uploadConfig = require('./configs/upload')

const cors = require('cors')

const routes = require('./routes') //vai carregar, por padrão, o index.js para mim
const express = require('express')

migrationsRun()


const app = express()

app.use=(cors())

//prestar atenção porque aqui a ordem importa!!
app.use(express.json()) // avisando que vamos utilizar o formato json para receber informações do body

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes) //o meu servidor vai utilizar as rotas (que está no arquivo index)

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
