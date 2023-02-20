require('dotenv').config();
const express = require('express');
var cors = require('cors');
const corsOptions ={
  // "origin": "*"
  // "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  // "preflightContinue": false,
  // "optionsSuccessStatus": 204
}
const app = express();
const port = 3000;
const indexroute= require('./modules/index.route');
const {dbconnection}= require('./DB/connection');
dbconnection();
app.use(express.json());
app.use(cors(corsOptions));
app.use('/api/v1/upload', express.static('./upload'));
app.use('/api/v1/users', indexroute.userrouter);
app.use('/api/v1/mesgs', indexroute.mesgrouter);
app.use('/api/v1/auth', indexroute.authrouter);
app.get('*', (req, res) => res.status(404).json({message: 'ERROR 404, PAGE NOT FOUND'}));
app.listen(port);