const mesgrouter= require('express').Router();
const { auth } = require('../../middlewear/auth');
const { validation } = require('../../middlewear/validation');
const mesgcontroller = require('./mesg.controller');
const { sendmessage } = require('./mesg.validation');

mesgrouter.post('/:userid',validation(sendmessage),mesgcontroller.sendmesg)
mesgrouter.get('/mymessages',auth(),mesgcontroller.mesgslist)
mesgrouter.delete('/deletemesg/:mesgid',auth(),mesgcontroller.deletemesg)
module.exports=mesgrouter;