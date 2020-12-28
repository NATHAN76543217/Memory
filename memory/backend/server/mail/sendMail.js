const nodeMailer = require('nodemailer');
const config = require('../config/config');

function buildTransporter()
{
    return nodeMailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: process.env.SMTP_PORT,
        secureConnection: false,  //true for 465 port, false for other ports
        tls: {
            ciphers:'SSLv3'
        },
        auth: {
            user: config.mail,
            pass: config.password
        }
    });
}

function sendSignupHello(username, email)
{
    //TODO check why email go into spambox
    let mailContent = 'Hello <b>'+ username + '</b><br/><br/>Thanks for signup on Memory!<br/>We can even send email!<br/>So, impressed? :)<br/><br/>Nathan Lecaille.';
    let transporter = buildTransporter();
    let mailOptions = {
        from: '"Memory team" <lecaille.nathan@outlook.fr>', // sender address
        to: email, // list of receivers
        subject: 'Welcome to the memory app', // Subject line
        text: 'Hello world?', // plain text body
        html: mailContent // html body
    };
    console.log("SEND MAIL");
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