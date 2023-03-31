const mongoose = require('mongoose')
import { AnyObject, Document, Types, Schema } from "mongoose"

interface IDog {
    _id: Types.ObjectId,
    name: string,
    likes: number,
    dislikes: number,
    url: string
}

const dogSchema = new Schema<IDog>({
    name: {
        type: String,
        required: false
    },
    likes: {
        type: Number,
        required: false
    },
    dislikes: {
        type: Number,
        required: false
    },
    url: {
        type: String,
        required: true
    }
})

dogSchema.set('toJSON', {
  transform: (document: Document, returnedObject: AnyObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Dog', dogSchema)