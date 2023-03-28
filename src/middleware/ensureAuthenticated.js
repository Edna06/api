const { verify } = require('jsonwebtoken') 
const AppError = require('../utils/AppError')
const authConfig = require('../configs/auth') 

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT Token não informado', 401)
  }

  //agora, se de fato o token existir, vou acessar, através de um vetor, o que está lá dentro do header. 

  const [, token] = authHeader.split(' ') 

  //usando tratamento de exceção

  try {
    //verificando se de fato esse token é válido
    const { sub: user_id } = verify(token, authConfig.jwt.secret) 

    request.user = {
      id: Number(user_id)
    }

    return next() //chamando a próxima função
  } catch {
    throw new AppError('JWT Token inválido', 401)
  }
}

module.exports = ensureAuthenticated;
