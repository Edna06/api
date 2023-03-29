// responsabilidade de conter as rotas do usuário

const { Router } = require('express')
const UsersController = require('../controllers/UsersController')

// pegando o middle de autenticação 
const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const usersRoutes = Router()

const usersController = new UsersController()

usersRoutes.post("/", usersController.create) 
usersRoutes.put("/", ensureAuthenticated, usersController.update) 

module.exports = usersRoutes
