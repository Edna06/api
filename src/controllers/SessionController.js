// lembrando: O controller vai receber no máximo 5 métodos: criar, atualiza, deletar, exibir vários e exibir um específico
const knex = require('../database/knex')
const AppError = require('../utils/AppError')

const { compare } = require('bcryptjs')

const authConfig = require('../configs/auth')
const { sign } = require('jsonwebtoken') 


class SessionController {
  //vai envolver conexão com o banco de dados por isso será assíncrona
  //  vamos criar uma sessão para o usuário
  async create(request, response) {
    const { email, password } = request.body

    const user = await knex('users').where({ email }).first()

    if (!user) {
      throw new AppError('E-mail e/ou senha incorreta', 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('E-mail e/ou senha incorreta', 401)
    }
    //se passou pelas duas etapas, o usuário tem as credenciais de acesso. Agora, vou entregar um token(chave, para que ele consiga e utilize para fazer as requisições depois) de acesso para ele:

    const { secret, expiresIn } = authConfig.jwt
    const token = sign({}, secret, {
      
      subject: String(user.id),
      expiresIn
    })

    return response.json({user, token})
  }
}

module.exports = SessionController
