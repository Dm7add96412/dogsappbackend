//import dotenv from 'dotenv';
import { Error } from 'mongoose'

//dotenv.config();
const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const dogsRouter = require('./controllers/dogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error: Error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/dogs', dogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(config.PORT, () => {
  logger.info(`Server is running at http://localhost:${config.PORT}`)
})