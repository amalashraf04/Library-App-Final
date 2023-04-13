const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SignUpSchema = new Schema({

    username: String,
    password: String,
    email : String
                
});

var SignUpData = mongoose.model('signup',SignUpSchema);

module.exports = SignUpData;
