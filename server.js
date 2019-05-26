import express from 'express'
import nunjucks from 'nunjucks'
import { readJson } from 'fs-extra'
import * as site from './constants/site'

const server = express()
const PORT = process.env.PORT || 4567
const __assets__ = './assets/webpack-assets.json'

nunjucks.configure('.', {
  autoescape: true,
  express: server
})

server.use('/assets', express.static('assets'))

server.get('/m', (request, response) => {
  readJson(__assets__).then((assets) => {
    response.render('mobile.html', { assets, site })
  }).catch(errors => {
    response.sendStatus(500)
  })
})

server.get('*', (request, response) => {
  readJson(__assets__).then((assets) => {
    response.render('index.html', { assets, site })
  }).catch(errors => {
    response.sendStatus(500)
  })
})

server.listen(PORT, () => {
  console.log(`* Listening on http://localhost:${PORT}`)
  console.log('* Use Ctrl-C to stop')
})
