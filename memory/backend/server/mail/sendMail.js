const nodeMailer = require('nodemailer');
const config = require('../config/config');

function sendSignupHello(email)
{
    console.log("SEND MAIL");
    let transporter = nodeMailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: process.env.SMTP_PORT,
        secure: true,  //true for 465 port, false for other ports
        tls: {
            ciphers:'SSLv3'
        },
        auth: {
            user: config.mail,
            pass: config.password
        }
    });
    let mailOptions = {
        from: '"Memory team" <lecaille.nathan@outlook.com>', // sender address
        to: email, // list of receivers
        subject: 'Welcome to the memory app', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world? html</b>' // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
       //   res.status(400).send({success: false})
        } else {
         // res.status(200).send({success: true});
        }
      });
}

exports.sendSignupHello = sendSignupHello;