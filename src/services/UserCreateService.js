//serviço de criação do usuário

const { hash} = require('bcryptjs');
const AppError = require('../utils/AppError');

//quem for usar esse classe é quem tem que passar o banco que será utilizado
class UserCreateService {
  constructor(userRepository){
    this.userRepository = userRepository; //colocando o userRepository no contexto global(dentro de toda a classe)
  };


  //vai conter a regra de negócio do nosso código
  async execute({ name, email, password }) { //vai ter um único método
    const checkUserExist =  await this.userRepository.findByEmail(email);

    if (checkUserExist) {
      throw new AppError('Este e-mail já está em uso!');
    }

    const hashedPassword = await hash(password, 8);
    // INSERINDO DADOS DO USUÁRIO
    await this.userRepository.create({name, email, password: hashedPassword});
  };
};

module.exports = UserCreateService;
