const {userModel}= require('../../DB/models/user.model');
const cloudinary=require('../../services/cloudinary')
var bcrypt = require('bcryptjs');
var QRCode = require('qrcode');

const updatepassword = async(req,res)=>{
      try{
        const {oldpass, newpass}= req.body;
                const user= await userModel.findOne({_id:req.user._id});
                const match = await bcrypt.compare(oldpass, user.password)
                if(match){
                        let hash= await bcrypt.hash(newpass, parseInt(process.env.saltround))
                        const updatepass= await userModel.findOneAndUpdate(req.user._id,{password:hash})
                        res.status(200).json({message:'password updated'})
                }else{
                    res.status(400).json({message:'incorrect password'})
                }
      }
      catch(error){
        res.status(400).json({message:'catch error', error})
      }          
}

const uploadpic = async(req,res)=>{
    try{
        const image = await cloudinary.uploader.upload(req.file.path,{
            folder:'user/profile'
        });
        // const imageurl=req.file.destination+"/"+req.file.filename;
        await userModel.findOneAndUpdate({_id:req.user._id}, {profilepic:image.secure_url})
        res.json({message:"success"});
    }catch(error){
        res.json({message:"catch error", error})
    }     
}


const getuser = async (req,res)=>{
    try{
        let user= await userModel.findOne({_id:req.user._id})
        let link=`${req.protocol}://${req.headers.host}/api/v1/users/${req.user._id}`
        QRCode.toDataURL(link,function (err, url){
           res.json({message:'success',user,url});
        })
    }catch(error){
        res.json({message:"catch error", error})
    }  
   
}


const deleteaccount= async(req,res)=>{
   try{
     const user= await userModel.findOneAndDelete({_id:req.user._id})
     if(user){
        res.status(200).json({message:"success"});
     }else{
        res.status(400).json({message:"user not found"}); 
     }
     
   }catch(error){
        res.status(400).json({message:"catch error", error})
    }  
}
module.exports={updatepassword, uploadpic, getuser, deleteaccount}