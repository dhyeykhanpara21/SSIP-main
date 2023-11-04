const config = require('../config');
const your_email = config.email;
const your_password = config.password;
const nodemailer = require('nodemailer');

// Helper function to send reset password OTP email
async function sendResetOTP(email, otp) {
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
      subject: 'Reset Password OTP',
      text: 'Your OTP for resetting the password is ' + otp,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send reset password OTP email');
  }
}

//export
module.exports = {
  sendResetOTP
}
