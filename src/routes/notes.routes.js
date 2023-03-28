// responsabilidade de conter as rotas das notas

const { Router } = require('express')
const NotesController = require('../controllers/notesController')

const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const notesRoutes = Router()

const notesController = new NotesController()

notesRoutes.use(ensureAuthenticated) //para que todas as minhas rotas usem o middleware de autenticação 

//acrescentando a rota(para deixá-la visível)
notesRoutes.post('/', notesController.create)
notesRoutes.get('/:id', notesController.show) //usa o id da nota mesmo
notesRoutes.delete('/:id', notesController.delete) //usa o id da nota mesmo
notesRoutes.get('/', notesController.index) 

module.exports = notesRoutes
