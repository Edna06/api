//Para cada serviço teremos um teste
const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory")

//garante que o usuário seja criado
it("user should be create", async () => { //adicionei o async aqui para poder utilizar o await
  //dados fictícios para fazer a simulação dos dados que foram enviados por uma requisição
  const user = {
    name: "User Test",
    email: "user@test.com",
    password: "123"
  }; // simularei os inputs (valores enviados)

  const userRepositoryInMemory = new UserRepositoryInMemory();
  const userCreateService = new UserCreateService(userRepositoryInMemory);
  const userCreated = await userCreateService.execute(user);

  console.log(userCreated)

  expect(userCreated).toHaveProperty("id");
});
