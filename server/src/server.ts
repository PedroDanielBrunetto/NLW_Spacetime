/* eslint-disable prettier/prettier */
import 'dotenv/config'

import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { authRoutes } from './routes/auth'
import multipart from '@fastify/multipart'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'node:path'

const app = fastify()

app.register(multipart)

//torna uma pagina do servico publica
app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(cors, {
  origin: true, // todas URLs de front-end poderao acessar nosso back-end
})

app.register(jwt, {
  secret: 'spacetime', //secret eh uma maneira de diferenciar os tokens(jwt) gerados por esse back-end por outros jwt (tokens) de outros back-ends (formas de criptografias)
})

app.register(uploadRoutes)
app.register(authRoutes)
app.register(memoriesRoutes)

app.listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('HTTP server running on http://localhost:3333')
  })
