// criando uma api
import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const app = fastify()
const prisma = new PrismaClient()

// criando a primeira rota
// metodo get porque o navegador quando acessa uma url diretamente de dentro, ele sempre vai utilizar o: HTTP Method: GET

app.get('/users', async () => {
  const users = await prisma.user.findMany()

  return users
})

// API RESTfull

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('💻 HTTP server running on http://localhost:3333')
  }) // assim que o servidor estiver no ar, eu quero entao declarar uma funcao
// essa porta significa que acessando essa porta, vai bater nesse servidor.
