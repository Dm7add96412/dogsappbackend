const logger = require('./logger')
import { NextFunction, Request, Response } from 'express';

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (req: Request, res: Response) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}