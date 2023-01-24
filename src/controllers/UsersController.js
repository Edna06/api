class UsersController {

  // lembrar que se trata de uma função
  create(request,response) {
    const { name, email, password } = request.body;

    response.json({name, email, password});
  }
} 

module.exports = UsersController


//vai lidar com o processamento e fazer a resposta dessa requisição 