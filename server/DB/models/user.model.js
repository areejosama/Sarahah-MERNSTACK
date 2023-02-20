const mongoose= require('mongoose');

const userSchema= new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  confirmEmail:{
    type:Boolean,
    default:false
  },
  profilepic:{
    type:String
  },
  sendcode:{
    type:String,
    default:null
  }
}, {timestamps:true})

const userModel= mongoose.model('user', userSchema)
module.exports={userModel};