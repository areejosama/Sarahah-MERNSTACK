const {userModel}=require('../../DB/models/user.model');
const {sendEmail}= require('../../services/email');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const {nanoid}= require('nanoid');


const signup= async(req,res)=>{ 
    try{
        const {name, email, password}=req.body;
        const user= await userModel.findOne({email:email});
        if(!user){
            const hashpassword= await bcrypt.hash(password, parseInt(process.env.saltround));
            const newuser= new userModel({name:name, email:email, password:hashpassword});
            const saveuser= await newuser.save();
            let token= await jwt.sign({id:saveuser._id}, process.env.secretkey)
            let emailContent=`
            <a href="${req.protocol}://${req.headers.host}/api/v1/auth/confirmemail/${token}">verify email</a>
            `;
            await sendEmail(email, 'Emailconfirmation', emailContent);
            res.status(200).json({message:'success', saveuser})
        }else{
            res.status(409).json({message:'email already exist'})
        }
    }catch(error){
        res.status(400).json({message:'catch error', error})
    }        
}

const confirmemail= async (req,res)=>{
    try{
        const {token}=req.params;
        const decode= jwt.verify(token, process.env.secretkey);
        if(!decode){
            res.json({message:'invalid payload'})
        }else{
            let user= await userModel.findByIdAndUpdate(
                {_id:decode.id, confirmEmail:false}, 
                {confirmEmail:true});
            res.json({message:'your email is confirmed'})
        }
    }catch(error){
        res.status(400).json({message:'catch error', error})
    }   
        
}

const signin= async (req,res)=>{
    try{
        const {email, password}=req.body;
        let user = await userModel.findOne({email})
        if(!user){
            res.json({message:'you have to register first'})
        }else{
            if(!user.confirmEmail){
                res.json({message:'please verify your email'})
            }else{
                let compare= await bcrypt.compare(password, user.password)
                if(!compare){
                    res.json({message:'incorrect password'})
                }else{
                    const token= await jwt.sign({id:user._id}, process.env.secretkey)
                    res.json({message:'success login', token})
                }
            }
        }
    }catch(error){
        res.status(400).json({message:'catch error', error})
    }       
}

const sendcode = async(req,res)=>{
  try{
    const {email}= req.body;
    const user= await userModel.findOne({email}).select('email');
    if(!user){
       res.status(400).json({message:'invalid email'})
    }else{
       const code = nanoid(5);
       await sendEmail(email, 'forget password', `Saraha Code ${code}`);
       const updateuser= await userModel.findOneAndUpdate({email},{sendcode:code});
       res.status(200).json({message:'success'})
    }
  }catch(error){
    res.status(400).json({message:'catch error', error})
} 
        
}

const forgetpassword = async(req,res)=>{
    try{
        const {code, email, newpass}=req.body;
        if(code==null){
            res.status(400).json({message:'failed'})
        }else{
            const hash= await bcrypt.hash(newpass, parseInt(process.env.saltround))
            const updateuser= await userModel.findOneAndUpdate({email:email,sendcode:code},{password:hash,sendcode:null}) 
            res.status(200).json({message:'success'})
        }
    }catch(error){
        res.status(400).json({message:'catch error', error})
    }        
}


module.exports={signup, confirmemail, signin,sendcode, forgetpassword};