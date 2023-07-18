const { hash, compare } = require('bcryptjs'); //tive que importar o compare para conseguir fazer a comparações entre as senhas que estão criptografadas
const AppError = require('../utils/AppError');

const UserRepository = require('../repositories/UserRepository');
const sqliteConnection = require('../database/sqlite'); //conexão com o banco de dados

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    //instanciando o meu UserRepository
    const userRepository = new UserRepository();

    const checkUserExist =  await userRepository.findByEmail(email)

    if (checkUserExist) {
      throw new AppError('Este e-mail já está em uso!')
    }

    const hashedPassword = await hash(password, 8)

    // INSERINDO DADOS DO USUÁRIO
    await userRepository.create({name, email, password: hashedPassword});

    return response.status(201).json()
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body
    const user_id = request.user.id; //consigo fazer isso pelo middle que eu passei na rota


    const database = await sqliteConnection()
    const user = await database.get('SELECT * FROM users WHERE id = (?)', [user_id])

    if (!user) {
      throw new AppError('Usuário não encontrado')
    }

    const userWithUpdatedEmail = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    )

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Este e-mail já está em uso.')
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if (password && !old_password) {
      throw new AppError(
        'Você precisa informar a senha antiga para definir a nova senha'
      )
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError('A senha antiga não confere')
      }

      user.password = await hash(password, 8)
    }

    await database.run(
      `
    UPDATE users SET
    name = ?,
    email = ?,
    password = ?,
    updated_at = DATETIME('now')
    WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
    )

    return response.json()
  }
}

module.exports = UsersController
