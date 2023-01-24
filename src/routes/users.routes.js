// responsabilidade de conter as rotas do usuário

const {Router} = require('express');
const UsersController = require('../controllers/UsersController');

const usersRoutes = Router();
// reservando um lugar na memória para a minha classe - criando instâncias 
const usersController = new UsersController()

//chegando aqui o meu servidor vai bucar a raiz (representado pelo '/')
usersRoutes.post('/', usersController.create) //passando a rsponsabilidade para o meu create, que existe dentro do meu controller 
  //a rota vai ter a responsabilidade de receber a requisição e a resposta e repassar para o controller equivalente 
  


module.exports = usersRoutes;
