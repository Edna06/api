// Esse arquivo terá a função de reunir todas as rotas da minha aplicação

const {Router} = require('express');
const usersRouter = require('./users.routes.js')
const notesRouter = require('./notes.routes.js')
const tagsRouter = require('./tags.routes.js')
const sessionRoutes = require('./sessions.routes')

const routes = Router(); 

routes.use("/users", usersRouter); 
routes.use("/notes", notesRouter); 
routes.use("/tags", tagsRouter);
routes.use("/session", sessionRoutes)

module.exports = routes;