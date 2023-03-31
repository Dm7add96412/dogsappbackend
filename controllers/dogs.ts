import { Request, Response } from 'express'

const Dog = require('../models/dog')
const dogsRouter = require('express').Router()

let dogstest = [
    {
      id: 1,
      name: "dog1",
      likes: 2,
      dislikes: 1
    },
    {
      id: 2,
      name: "dog2",
      likes: 3,
      dislikes: 0
    }
  ]
  
dogsRouter.get('/', async (req: Request, res: Response) => {
    const dogs = await Dog.find({})
    res.json(dogs)
  })
  
dogsRouter.get('/:id', async (req: Request, res: Response) => {
    const dog = await Dog.findById(req.params.id)
    if (dog) {
        res.json(dog)
    } else {
        res.status(404).json({error: 'invalid id'})
    }
})
  
dogsRouter.post('/', async (req: Request, res: Response) => {
    const body = req.body
    console.log(body)
  
    const dog = new Dog({
      name: body.name,
      likes: body.likes,
      dislikes: body.dislikes,
      url: body.url
    })
  
    const savedDog = await dog.save()
    res.json(savedDog)
  })

dogsRouter.put('/:id', async (req: Request, res: Response) => {
  const body = req.body

  const dog = {
    likes: body.likes,
    dislikes: body.dislikes,
    url: body.url
  }

  const newdog = await Dog.findByIdAndUpdate(req.params.id, dog, { new: true })
  res.json(newdog)

})

module.exports = dogsRouter