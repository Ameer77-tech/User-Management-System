const express = require('express')
const app = express()

const cors = require('cors')

const userModel = require('./models/user')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get('/',(req,res)=>{
    res.send("Working")
})

app.post('/create',async (req,res)=>{
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
    }
   
})

app.get('/users',async (req,res)=>{
    try{
        let users =await userModel.find()
        res.send({users})
    }catch(err){
        console.log("Cannot get Users")
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