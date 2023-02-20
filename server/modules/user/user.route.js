
const {auth}= require('../../middlewear/auth')
const {myMulter,HME,filevalidation} = require('../../services/multer')
const {validation}= require('../../middlewear/validation')
const usercontroller= require('./user.controller')
const { updatepassword } = require('./user.validation')

const userrouter= require('express').Router()

userrouter.patch('/updateuser',auth(),validation(updatepassword),usercontroller.updatepassword)
userrouter.post('/uploadpic',auth(),myMulter(filevalidation.image).single('image'),HME,usercontroller.uploadpic)
userrouter.get('/getuser',auth(),usercontroller.getuser)
userrouter.delete('/deleteaccount',auth(),usercontroller.deleteaccount)
module.exports=userrouter;