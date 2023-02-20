const methods=['body','params','headers','file','query'];

const validation= (schema)=>{
    let validationerror=[];
    return (req,res,next)=>{
        methods.map((key)=>{
            if(schema[key]){
                const validationresult= schema[key].validate(req[key], {abortEarly:false}); 
                if(validationresult?.error?.details){
                    validationerror.push(validationresult.error.details)
                }
            }
        });
        if(validationerror.length >0){
            res.status(400).json({message:'catch validation error', error:validationerror})
            validationerror=[]
        }else{
            next();
        }
    }
}
module.exports={validation}