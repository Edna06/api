//deixaremos aqui as configurações de autenticação da nossa aplicação

module.exports = {
  jwt: {
    secret: process.env.AUTH_SECRET || 'default', //utilizando o .env que eu criei ou o default(se não encontrar)
    expiresIn: '1d'
  }

}