// Helper function to send OTP email

const nodemailer = require('nodemailer');
const config = require('../config');
const your_email = config.email;
const your_password = config.password;


async function sendOTP(email, otp) {
     try {
       const transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
           user: your_email,
           pass: your_password,
         },
       });
   
       const mailOptions = {
         from: your_email,
         to: email,
         subject: 'OTP for registration',
         text: 'Your OTP is ' + otp,
       };
   
       await transporter.sendMail(mailOptions);
     } catch (error) {
       console.error(error);
       throw new Error('Failed to send OTP email');
     }
   }

//export
module.exports = {
     sendOTP
}