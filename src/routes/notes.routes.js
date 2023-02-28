// responsabilidade de conter as rotas das notas

const { Router } = require('express')
const NotesController = require('../controllers/notesController')

const notesRoutes = Router()

const notesController = new NotesController()

//acrescentando a rota(para deixá-la visível)
notesRoutes.get('/', notesController.index) 
notesRoutes.post('/:user_id', notesController.create)
notesRoutes.get('/:id', notesController.show)
notesRoutes.delete('/:id', notesController.delete)

module.exports = notesRoutes
