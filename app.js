const express = require('express')
const cors = require('cors')
const logger = require('morgan') // for seeing api calls in terminal
const PORT = 1234
const app = new express()


require('dotenv').config()

const mongoose= require('./middleware/mongoDB') //to init mongoDB


app.use(cors()) //to connect frontend and backend without any disturbance
app.use(express.json()) // to recieve data from front end
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))


//api

const api = require('./routes/api')
app.use('/api',api)



//hosting

const path = require('path');
app.use(express.static('./dist/frontend/'))
app.get('/*', function(req, res) { res.sendFile(path.join(__dirname + '/dist/frontend/index.html')); });

// Server code 
app.listen(PORT, () => {
    console.log(`...........Server running at ${PORT}.............`)
})