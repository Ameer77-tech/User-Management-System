const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(() => console.log("Not Connected"));

const user_details_Schema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'posts'  
    },
  ],
});

module.exports = mongoose.model("user_details",user_details_Schema)