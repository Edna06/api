// responsabilidade de conter as rotas do usuário

const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const UsersController = require('../controllers/UsersController')
const UserAvatarController = require('../controllers/UserAvatarController')

// pegando o middle de autenticação
const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const usersRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

usersRoutes.post('/', usersController.create)
usersRoutes.put('/', ensureAuthenticated, usersController.update) //put -> atualiza vários campos
usersRoutes.patch( '/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update) 
module.exports = usersRoutes
