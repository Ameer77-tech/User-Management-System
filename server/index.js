const express = require('express')
const app = express()

const cors = require('cors')

const userModel = require('./models/user')

const limiter = require('./ratelimit')
const { body, validationResult } = require('express-validator');

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

require('dotenv').config();


const PORT = process.env.PORT 

app.get('/',(req,res)=>{
    res.send("working")
    
})

app.post('/create', limiter ,[
    body('name').trim().notEmpty().withMessage('Name is required').escape(),
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('url').optional().isURL().withMessage('URL must be valid'),
  ],async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({msg:"Server Error"});
    }

    let {name, email, url} = req.body
    try{
     let createdUser = await userModel.create({
        name,
        email,
        url
    })
    res.send({createdUser})
    }catch(err){
        console.log("Error creating User")
         res.status(404).send()
    }
   
})

app.get('/users',async (req,res)=>{
    try{
        let users =await userModel.find()
        res.send({users})
    }catch(err){
        console.log("Cannot get Users")
        res.status(404).send()
    }
})

app.delete('/deleteuser/:user',async (req,res)=>{
    const id = req.params.user
    try{
        let deletedUser = await userModel.findOneAndDelete({_id: id})
        res.send({deletedUser})
    }catch(err){
        console.log("Cannot Delete User")
    }
})


app.get('/updateuser/:id',async (req,res)=>{
    const _id = req.params.id
    try{
        const user = await userModel.findOne({_id})
        res.send({user})
    }catch(err){
        console.log("Error fetching user"+err)
    }
})

app.put('/updateuser/:userid',async (req,res)=>{
    const id = req.params.userid
    const { name,email,url } = req.body
    try{
        const updatedUser = await userModel.findOneAndUpdate({_id: id},{
            name,
            email,
            url
        })
        res.send(updatedUser)
    }catch(err){
        console.log("Error Updating User")
    }
})
app.delete('/deleteallusers',async (req,res)=>{
    try{
        const response = await userModel.deleteMany({})
        res.send(response)
    }catch(err){
        console.log("Error deleting Users"+ err)
    }
})
app.listen(3000,()=>{
    console.log("server Running");  
})