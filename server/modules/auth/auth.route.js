
const { signup, signin, sendcode, forgetpassword } = require('./auth.validation');
const {validation}= require('../../middlewear/validation')

const controller= require('./auth.controller');

const authrouter= require('express').Router();

authrouter.post('/signup',validation(signup),controller.signup)
authrouter.get('/confirmemail/:token', controller.confirmemail)
authrouter.post('/signin',validation(signin),controller.signin)
authrouter.get('/sendcode',validation(sendcode),controller.sendcode)
authrouter.get('/forgetpassword',validation(forgetpassword),controller.forgetpassword)

module.exports=authrouter;