const path = require('path')

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'database.db')
    },
    // para automatizar a criação de tabelas dentro da minha aplicação

    //para que eu consiga utilizar a opção de apagar por CASCADE
    //recuperando minha conexão e a função de callback
    pool: {
      afterCreate: (conn, cb ) => conn.run("PRAGMA foreign_keys = ON", cb)
    },

    migrations: {
      directory: path.resolve(
        __dirname,
        'src',
        'database',
        'knex',
        'migrations'
      )
    },
    useNullAsDefault: true
  }
}
