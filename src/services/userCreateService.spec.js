//Para cada serviço teremos um teste
const UserCreateService = require('./UserCreateService')
const UserRepositoryInMemory = require('../repositories/UserRepositoryInMemory');
const AppError = require('../utils/AppError');

describe('UserCreateService', () => { //testar coisas que estão dentro dessa regra de nogócio

  let userRepositoryInMemory = null;
  let userCreateService = null;

 beforeEach(() => {
  userRepositoryInMemory = new UserRepositoryInMemory();
  userCreateService = new UserCreateService(userRepositoryInMemory)
 });



  //garante que o usuário seja criado
  it('user should be create', async () => {
    //adicionei o async aqui para poder utilizar o await
    //dados fictícios para fazer a simulação dos dados que foram enviados por uma requisição
    const user = {
      name: 'User Test',
      email: 'user@test.com',
      password: '123'
    } // simularei os inputs (valores enviados)


    const userCreated = await userCreateService.execute(user)

    console.log(userCreated)

    expect(userCreated).toHaveProperty('id')
  });



  it("user not should be create with exists email", async () => {
    const user1 = {
      name: "User test 1",
      email: "user@test.com",
      password: "123"
    };

    const user2 = {
      name: "User test 2",
      email: "user@test.com",
      password: "456"
    };

    await userCreateService.execute(user1);

    await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este e-mail já está em uso!"));
  });
});




