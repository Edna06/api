const fs = require('fs') // é do próprio node, e nos ajuda a lidar com manipulação de arquivos
const path = require('path')
const uploadConfig = require('../configs/upload')

class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename(
      //rename nãe é mudar o nome do arquivo não, estamos nos referindo a mudar de lugar
      path.resolve(uploadConfig.TMP_FOLDER, file), //tira o file da pasta temporária
      path.resolve(uploadConfig.UPLOADS_FOLDER, file) // adiciona ela na pasta de upload (que é onde, de fato, ela irá ficar)
    ) // quando fizermos upload de uma imagem no backend, ela irá ficar esperando na pasta temporária - ela ficará esperando na pasta temporária para o nosso backend decidir o que fará com a imagem.

    return file
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file) //buscando pelo arquivo na pasta uploads

    //tratamento de exceções (caso o arquivo não exista mais)
    try{
      await fs.promises.static(filePath)
    } catch {
      return //caso alguma coisa dê errado, ele irá retornar 
    }

    await fs.promises.unlink(filePath) //vai deletar através do unlink
  }
}

module.exports = DiskStorage