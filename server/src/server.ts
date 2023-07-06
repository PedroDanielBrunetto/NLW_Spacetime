/* eslint-disable prettier/prettier */
import 'dotenv/config'

import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { authRoutes } from './routes/auth'

const app = fastify()

app.register(cors, {
  origin: true, // todas URLs de front-end poderao acessar nosso back-end
})

app.register(jwt, {
  secret: 'spacetime', //secret eh uma maneira de diferenciar os tokens(jwt) gerados por esse back-end por outros jwt (tokens) de outros back-ends (formas de criptografias)
})

app.register(authRoutes)
app.register(memoriesRoutes)

app.listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('HTTP server running on http://localhost:3333')
  })
