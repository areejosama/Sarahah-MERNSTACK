const {userModel}=require('../DB/models/user.model');
var jwt = require('jsonwebtoken');

const auth = ()=>{
    return async (req, res, next)=>{
        try{
            let {token}= req.headers;
            if(!token.startsWith(process.env.bearertoken)){
                res.json({message:'invalid bearer token'})  
            }else{
                let mytoken= token.split(process.env.bearertoken)[1];
                let decode= await jwt.verify(mytoken, process.env.secretkey)
                let user= await userModel.findById(decode.id)
                req.user= user;
                next();
            }
        }
        catch(error){
            res.json({message:'catch error', error})
        }
       
}
}
module.exports={auth}
