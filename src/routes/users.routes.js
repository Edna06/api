// responsabilidade de conter as rotas do usuário

const { Router } = require('express')
const UsersController = require('../controllers/UsersController')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

// pegando o middle de autenticação
const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const usersRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const usersController = new UsersController()

usersRoutes.post('/', usersController.create)
usersRoutes.put('/', ensureAuthenticated, usersController.update) //put -> atualiza vários campos
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  (request, response) => {
    console.log(request.file.filename)

    response.json()
  }
)

module.exports = usersRoutes
