const Joi = require('joi');


const signup={
    body:Joi.object().required().keys({
        name:Joi.string().min(3).max(20).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(5).max(20).required(),
        cpassword:Joi.string().valid(Joi.ref('password')).required()
    })
}

const signin = {
    body:Joi.object().required().keys({
        email:Joi.string().email().required(),
        password:Joi.string().min(5).max(20).required()
    })
}

const sendcode={
     body:Joi.object().required().keys({
        email:Joi.string().email().required().messages({
            'any.required':'DO NOT MISS YOUR EMAIl', 
        })
     })
}

const forgetpassword={
    body:Joi.object().required().keys({
        code:Joi.string().required().min(5).max(5),
        email:Joi.string().required().email(),
        newpass:Joi.string().required().min(5).max(20),
        cpassword:Joi.string().valid(Joi.ref('newpass')).required()
    })
}

module.exports={signup,signin,sendcode,forgetpassword}