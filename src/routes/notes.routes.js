// responsabilidade de conter as rotas das notas

const { Router } = require('express')
const NotesController = require('../controllers/notesController')

const notesRoutes = Router()

const notesController = new NotesController()

notesRoutes.post('/:user_id', notesController.create) 
//acrescentando a rota(para deixá-la visível)
notesRoutes.get('/:id', notesController.show) 

module.exports = notesRoutes
