//A LÓGICA DO BANCO


const sqliteConnection = require('../database/sqlite') //conexão com o banco de dados

class UserRepository {
  async findByEmail(email) {
    const database = await sqliteConnection() //fazendo uma conexão com o banco de dados
    const user = await database.get('SELECT * FROM users WHERE email = (?)', [
      email
    ]);
    return user;
  } //como o banco vai lidar com a busca pelo email

  async create({ name, email, password }) {
    // INSERINDO DADOS DO USUÁRIO
    const database = await sqliteConnection(); //fazendo uma conexão com o banco de dados

    const userId = await database.run( //para que me seja retornado o id do usuário cadastrado
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );

    return {id: userId};
  } //como o banco vai lidar com a criação
}

module.exports = UserRepository;
