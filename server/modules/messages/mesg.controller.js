const {userModel}=require('../../DB/models/user.model')
const {mesgModel}= require('../../DB/models/mesg.model');
var QRCode = require('qrcode');

const sendmesg= async(req,res)=>{
     try{
          const {userid}=req.params;
          const {text}=req.body;
          const user= await userModel.findById(userid)
   
          if(!user){
               res.status(400).json({message:'user not found'})
          }else{
            const message = new mesgModel({text, receiverid:userid});
            const savemesg= await message.save();
            res.status(200).json({message:'message sent successfully'})
          }
     }catch(error){
          res.status(400).json({message:'catch error', error})
        }    
     
}

const mesgslist= async(req,res)=>{
     try{
          let messages= await mesgModel.find({receiverid:req.user._id})
          res.status(200).json({message:'all messages', messages})
     }catch(error){
          res.status(400).json({message:'catch error', error})
        }  
}

const deletemesg= async (req, res)=>{
     try{
          const {mesgid}= req.params;
          const message = await mesgModel.findOneAndDelete({_id:mesgid, receiverid:req.user._id})
          if(message){
               res.status(200).json({message:'successfully deleted'})
          }else{
               res.status(400).json({message:'unable to delete the message'})
          }
     }catch(error){
          res.status(400).json({message:'catch error', error})
        }        
 }
     

module.exports={sendmesg,mesgslist,deletemesg}