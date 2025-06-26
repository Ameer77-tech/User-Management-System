const mongoose = require('mongoose')
require('dotenv').config(); 

mongoose.connect(process.env.MONGO_URI)
.then("DB Connected")
.catch("Not Connected")


const userSchema = mongoose.Schema({
    name:String,
    email:String,
    url:String
})

module.exports = mongoose.model('user',userSchema)