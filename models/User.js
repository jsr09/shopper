const mongoose = require("mongoose");
const {productOrderSchema} = require("./ProductOrder");


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
  cart:{
    type: [productOrderSchema],
    required: true,
   
  },
  orders:{
    type: [mongoose.Schema.Types.ObjectId],
    
  }
});

module.exports = {User: mongoose.model("User", userSchema)}
