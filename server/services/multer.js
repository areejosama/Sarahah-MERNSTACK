const multer=require('multer');
const filevalidation={
    image:['image/png','image/jpeg']
}
function myMulter(filevalidation){
    const storage=multer.diskStorage({
        destination:function(req,file,cb){
            cb(null, "upload/profile")
        },
        filename:function(req,file,cb){
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, uniqueSuffix + '-' +file.originalname)
        }
    });

    function fileFilter(req,file,cb){
      if(filevalidation.includes(file.mimetype)){
        cb(null,true)
       }else{
         cb("invalid file type", false)
        }
    }

    const upload = multer({dest:'upload',fileFilter,storage});
    return upload;
}

const HME = (err,req,res,next)=>{
    if(err){
        res.json({message:'multer error',err})
    }else{
        next();
    }
}

module.exports={myMulter,HME,filevalidation}