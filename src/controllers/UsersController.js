const AppError = require('../utils/AppError');

class UsersController {
  // lembrar que se trata de uma função
  create(request, response) {
    const { name, email, password } = request.body

    if (!name) {
      throw new AppError('Nome é obrigatório')
    }

    response.status(201).json({ name, email, password })
  }
}

module.exports = UsersController
//vai lidar com o processamento e fazer a resposta dessa requisição
