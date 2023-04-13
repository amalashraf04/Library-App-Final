const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    language:{ type: String,
    required: true
    },
    image:{ type: String,
        required: true
        }
})


let BookDATA = mongoose.model('bookdetail', BookSchema)

module.exports = BookDATA