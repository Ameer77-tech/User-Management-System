const mongoose = require("mongoose");
require("dotenv").config();


mongoose
  .connect(process.env.MONGO_URI)
  .then("DB Connected")
  .catch("Not Connected");

const postsSchema = mongoose.Schema({
  author:{
   type:mongoose.Schema.Types.ObjectId,
   ref: 'user_details'
  },
  name: String,
  email: String,
  url: String,
});

module.exports = mongoose.model("posts", postsSchema);
