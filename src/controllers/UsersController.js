const AppError = require('../utils/AppError')

class UsersController {
  // lembrar que se trata de uma função
  create(request, response) {
    const { name, email, password } = request.body

    // verificando se um usuário não informou o nome
    if (!name) {
      //se o espaço do name estiver vazio, vai me retornar isso
      throw new AppError('Nome é obrigatório')
    }

    response.status(201).json({ name, email, password })
  }
}

module.exports = UsersController

//vai lidar com o processamento e fazer a resposta dessa requisição
