"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const mongoose_1 = require("mongoose");
const dogSchema = new mongoose_1.Schema({
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
});
dogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
module.exports = mongoose.model('Dog', dogSchema);
