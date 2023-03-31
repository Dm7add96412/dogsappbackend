"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Dog = require('../models/dog');
const dogsRouter = require('express').Router();
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
];
dogsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dogs = yield Dog.find({});
    res.json(dogs);
}));
dogsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dog = yield Dog.findById(req.params.id);
    if (dog) {
        res.json(dog);
    }
    else {
        res.status(404).json({ error: 'invalid id' });
    }
}));
dogsRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log(body);
    const dog = new Dog({
        name: body.name,
        likes: body.likes,
        dislikes: body.dislikes,
        url: body.url
    });
    const savedDog = yield dog.save();
    res.json(savedDog);
}));
dogsRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const dog = {
        likes: body.likes,
        dislikes: body.dislikes,
        url: body.url
    };
    const newdog = yield Dog.findByIdAndUpdate(req.params.id, dog, { new: true });
    res.json(newdog);
}));
module.exports = dogsRouter;
