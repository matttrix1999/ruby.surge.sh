import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import express from 'express'
import bodyParser from 'body-parser'
import leancloud, { createOAuth2 } from './leanengine'

const server = express()
const oauth2 = createOAuth2()
const { LEANCLOUD_APP_PORT } = process.env
const PORT = LEANCLOUD_APP_PORT || process.env.PORT || 4567

if (LEANCLOUD_APP_PORT) {
  server.use(leancloud.express())
}

server.use(bodyParser.json())
server.use(morgan('dev'))
server.use(helmet())
server.use(cors())

server.post('/sessions', (request, response) => {
  const { username, password } = request.body
  oauth2.ownerPassword.getToken({ username, password }).then(data => {
    response.json(data)
  }).catch(errors => {
    response.sendStatus(403)
  })
})

server.listen(PORT, () => {
  console.log(`* Listening on http://localhost:${PORT}`)
  console.log('* Use Ctrl-C to stop')
})
