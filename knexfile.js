const path = require('path')

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'database.db')
    },
    // para automatizar a criação de tabelas dentro da minha aplicação
    // em que lugar vasi ter que armazenar essas informações
    migrations: { //o diretório deve conter o mesmo nome da pasta local da migration
      directory: path.resolve(__dirname, 'src', 'database', 'knex', 'migrations')
    },
    useNullAsDefault: true
  }
}


