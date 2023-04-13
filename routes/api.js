const express = require('express')
const { findById } = require('../models/book')
const router = express.Router() //routing function
const DATA = require('../models/book') // DB of book
const SignData= require('../models/signup') // DB of signup
const jwt =require('jsonwebtoken')

function verifyToken(req,res,next){
    try {
        console.log(req.headers.authorisation)
        if(!req.headers.authorisation) throw('unauthorized auth')
        let token=req.headers.authorisation.split(' ')[1] 
        if(!token) throw('unauthorized jwt')
        let payload=jwt.verify(token,'ilikeapples')
        if(!payload) throw('unauthorized payload') 
       // res.status(200).send(payload) 
        next()    
    } catch (error) {
        console.log(error)
        res.status(401).send(error)
    }

}

// students full list read 
router.get('/booklist', async (req, res) => {

    try {

        const list = await DATA.find()
        res.send(list)


    } catch (error) {
        console.log(error)
    }

})


// book add 

router.post('/book',verifyToken, async (req, res) => {
    try {

       // console.log(req.body)
        let item = {  //to fetch and save data from front end in server
            name: req.body.name,
            author: req.body.author,
            about:req.body.about,
            language:req.body.language,
            image:req.body.image
        }

        let token=req.headers
        console.log('token',token)
        const newBook = new DATA(item) //to check incoming data
        const saveBook = await newBook.save() //mongoDB save

        res.send(saveBook)
        console.log(item)

    } catch (error) {

        console.log(error)
    }
})


// Book delete 

router.delete('/book/:id',verifyToken, async (req, res) => {
    try {
         let token=req.headers
         console.log('token',token)
        let id = req.params.id
        const deleteBook = await DATA.findByIdAndDelete(id)
        res.send(deleteBook)


    } catch (error) {
        console.log(error)

    }
})


// Book update 


router.put('/book/:id', async (req, res) => {
    try {

        let id = req.params.id
        console.log(id)
        let updateData = req.body
        let updateBook = await DATA.findByIdAndUpdate({ _id:id }, {$set:updateData})
        res.send(updateBook)
      
    } catch (error) {
        console.log(error)

    }
})
let token = '';
//const jwt = require('jsonwebtoken');
router.post('/auth', async (req, res) => {
    let loginemail = req.body.email;
    let loginpassword = req.body.password;

    // mongo check for user
    if (loginemail == 'admin' && loginpassword == '1234') {
        //req.session.role = 'admin';
        let payload = {loginemail:loginemail,loginpassword:loginpassword}
        let token=jwt.sign(payload,'ilikeapples')
        console.log(token)
        console.log("admin login success")
        res.send({ status: true ,token:token});

    } else {
        const user = await SignData.findOne({ email: loginemail, password: loginpassword }).exec();
        let payload = {loginemail:loginemail,loginpassword:loginpassword}
                let token=jwt.sign(payload,'ilikeapples')
            if (user) {
                
  // User found, do something
             res.send({ status: true, data: user,token:token});
            } else {
  // User not found, do something else
            res.send({ status: false, data: 'Invalid email or password' });
            }

        }
});
// router.post('/auth', async (req, res) => {

//     try {

//         let { email, password } = req.body
//         console.log(req.body)
//         console.log(email, password)
//         if (email == 'amal' && password == 'amal123') {     

//             res.status(200).json({ message: 'Success!'})
//         }
//         else {
//             throw ('unauthorized')
//         }
//     } catch (error) {
//         console.log(error)
//         res.status(400).json({ message: error })
//     }
// })

// Single student detail 


router.get('/book/:id', async (req, res) => {
    try {

        let id = req.params.id
        const singleBook = await DATA.findById(id)
        res.send(singleBook)

    } catch (error) {
        console.log(error)

    }
})

router.post('/signup', async (req, res) => {
    try {

        console.log(req.body)
        let item = {  //to fetch and save data from front end in server
            username: req.body.username,
            password: req.body.password,
            email:req.body.email
        }


        const newsignup = new SignData(item) //to check incoming data
        const savesign = await newsignup.save() //mongoDB save

        res.send(savesign)
        console.log(item)

    } catch (error) {

        console.log(error)
    }
})


module.exports = router