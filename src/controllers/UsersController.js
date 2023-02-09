const AppError = require('../utils/AppError');
const sqliteConnection = require('../database/sqlite'); //conexão com o banco de dados

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection(); //fazendo uma conexão com o banco de dados

    const checkUserExist = await database.get( //consultando os dados da minha tabela
      'SELECT * FROM users WHERE email = (?)',
      [email]
    );

    if(checkUserExist) {
      throw new AppError('Este e-mail já está em uso!');
    }

    // INSERINDO DADOS DO USUÁRIO
    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
    [name, email,password]);

    return response.status(201).json();
  }
}

module.exports = UsersController