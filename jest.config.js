module.exports = {
  bail: true, //se um teste falhar, ele vai continuar executando os outros
  coverageProvider: "v8",

  testMatch: [ //expressão regular para dizer qual o padrão dos arquivos de teste
  "<rootDir>/src/**/*.spec.js"//Partindo da raiz do meu projeto, dentro de qualquer pasta, vai ter um arquivo de qualquer nome(que a extensão vai ser .spec.js)
  //na hora que o teste iniciar ele vai ignorar os outros arquivos, indo direto para os arquivos de teste
  ],
}