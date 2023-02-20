const nodemailer = require("nodemailer");

const sendEmail= async (destinations, subject, message)=> {
  let transporter = nodemailer.createTransport({
      service:'gmail',
      auth: {
        user: 'areejosama33@gmail.com', 
        pass: 'sgonoddnhsqjiykg'
      },
    });
    let info = await transporter.sendMail({
        from: '"Saraha App" <areejosama33@gmail.com>', // sender address
        to: destinations, // list of receivers
        subject: subject, // Subject line
        html: message
      });
}  
module.exports={sendEmail};