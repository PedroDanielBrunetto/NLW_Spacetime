import { randomUUID } from "node:crypto"
import { extname, resolve } from "node:path"
import { FastifyInstance } from "fastify"
import { createWriteStream } from "node:fs"
import { pipeline } from "node:stream"
import { promisify } from "node:util"

//promisify transformar algumas funcoes do node mais antigas a ter suporte as promises
//pipeline permite aguardar o processo de upload finalizar(verificar quando um processo chegou no final)
const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance){
  app.post('/upload', async (request, reply) => {
    const upload = await request.file({
      limits: {
        fileSize: 5_242_800, //5mb in bytes
      }
    })
    if(!upload){
      return reply.status(400).send()
    }

    //mimetype: categorizacao de todos os arquivos
    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]*/
    const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

    if(!isValidFileFormat){
      return reply.status(400).send()
    }
    
    const fileId = randomUUID()
    const extension = extname(upload.filename)
    const fileName = fileId.concat(extension)

    //streaming(feature do node): quando faz upload, nao precisa esperar carregar para guardar dentro do disco, ele ja vai armazenando aos poucos
    const writeStream = createWriteStream(
      //resolve padroniza os caminhos de todos os S.O
      //salvando os arquivos
      resolve(__dirname, '../../uploads/', fileName)
    )

    await pump(upload.file, writeStream)

    //pega a url do server
    const fullUrl = request.protocol.concat('://').concat(request.hostname)
    //url pro arquivo
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()

    return {fileUrl}
  })
}