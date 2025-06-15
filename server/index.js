const express = require('express')
const app = express()

const cors = require('cors')

const userModel = require('./models/user')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())



app.post('/create',async (req,res)=>{
    let {name, email, url} = req.body
    try{
     let createdUser = await userModel.create({
        name,
        email,
        url
    })
    res.send(createdUser)
    }catch(err){
        console.log("Error creating User")
    }
   
})

app.get('/users',async (req,res)=>{
    try{
        let users =await userModel.find()
        res.send(users)
    }catch(err){
        console.log("Cannot get Users")
    }
})

app.delete('/deleteuser/:user',async (req,res)=>{
    const id = req.params.user
    try{
        let deletedUSer = await userModel.findOneAndDelete({_id: id})
        res.send(deletedUSer)
    }catch(err){
        console.log("Cannot Delete User")
    }
})


app.put('/updateuser/:user',async (req,res)=>{
    const id = req.params.user
    try{
        const updatedUser = await userModel.findOneAndUpdate({_id: id},{
            name:"Shama",
            email:"S@gmail.com",
            url:"Hello World"
        })
        res.send(updatedUser)
    }catch(err){
        console.log("Error Updating User")
    }
})

app.listen(3000,()=>{
    console.log("server Running");  
})