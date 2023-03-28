// responsabilidade de conter as rotas do usuário

const { Router } = require('express')
const UsersController = require('../controllers/UsersController')

// pegando o middle de autenticação 
const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const usersRoutes = Router()

const usersController = new UsersController()

usersRoutes.post("/", usersController.create) 
//quando o usuário vai cadastrar nem conta ele possui, por isso n tem necessidade de adicionar o middleware aqui 
usersRoutes.put("/", ensureAuthenticated, usersController.update) //para atualizar o perfil do usuário ele precisará estar autenticado 
// o middle de autenticação vai interceptar essa autenticação (captura o id do usuário que está dentro do token, por isso não preciso adicionar o id na rota)
//depois vai ser direcionado para a função de atualizar

module.exports = usersRoutes
