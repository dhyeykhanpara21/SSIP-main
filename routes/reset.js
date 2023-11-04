const router = require('express').Router();
const User = require('../models/user');
const { sendResetOTP } = require('../middleware/sendResetOTP');
const { generateOTP } = require('../middleware/generateOTP');

// reset password endpoint
router.post('/reset', async (req, res) => {
     try {
          const { email } = req.body;

          const foundUser = await User.findOne({ email }).exec();
          if (!foundUser) {
               res.status(404).json({ error: 'User not found' });
               return;
          }

          const otp = generateOTP(); // Generate OTP for resetting password

          // Sending reset password OTP email
          await sendResetOTP(email, otp);

          foundUser.resetOTP = otp; // Store OTP in user document
          await foundUser.save();

          res.json({ message: 'Reset password OTP sent successfully' });
     } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
     }
});

// export
module.exports = router;
