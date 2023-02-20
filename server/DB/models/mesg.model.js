const mongoose= require('mongoose');

const mesgsSchema= new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    receiverid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
},{timestamps:true})

const mesgModel= mongoose.model('mesg', mesgsSchema)
module.exports={mesgModel}