const Joi = require('joi');

const sendmessage={
  params:Joi.object().required().keys({
    userid:Joi.string().min(24).max(24).required()
  }),
  body:Joi.object().required().keys({
    text:Joi.string().required().min(2).max(100)
  })
}

const deletemesg={
    params:Joi.object().required().keys({
        mesgid:Joi.string().min(24).max(24).required()
    })
}
module.exports={sendmessage,deletemesg}