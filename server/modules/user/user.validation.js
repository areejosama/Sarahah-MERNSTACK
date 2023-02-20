const Joi = require('joi');

const updatepassword={
    body:Joi.object().required().keys({
        oldpass:Joi.string().required().min(5).max(20),
        newpass:Joi.string().required().min(5).max(20)
    })
}

module.exports={updatepassword}