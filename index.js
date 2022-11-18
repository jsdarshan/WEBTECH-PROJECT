import express from 'express'
import { dbURI, port } from './config/environment.js'
import mongoose from 'mongoose'
import router from './config/router.js'
import path from 'path'

const app = express()
const __dirname = path.resolve()

const startServer = async () => {
  try {
    await mongoose.connect(dbURI)
    console.log('🚀 database connected')
    app.use(express.static(`${__dirname}/front-end/build`))
    app.use((req,_res,next) => {
      console.log(`🚨🚨 Incoming request ${req.method} = ${req.url}`)
      next()
    })
    app.use(express.json())
    app.use('/api',router)
    app.use('/*', (_, res) => res.sendFile(`${__dirname}/front-end/build/index.html`))
    app.listen(port,() => console.log(`🍾 Server listening on port ${port}`))
  } catch (error) {
    console.log(error)
    console.log('🚨 something has gone wrong')
  }
}
startServer()