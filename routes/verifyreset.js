const router = require('express').Router();
const User = require('../models/user');
const crypto = require('crypto');

// Route for accepting and verifying reset password OTP
router.post('/verifyreset', async (req, res) => {
     try {
          const { email, otp, password } = req.body;

          const foundUser = await User.findOne({ email }).exec();
          if (!foundUser) {
               res.status(404).json({ error: 'User not found' });
               return;
          }

          if (foundUser.resetOTP !== otp) {
               res.status(400).json({ error: 'Incorrect OTP' });
               return;
          }

          // OTP verification successful, proceed with password update
          const hashedPassword = crypto
               .createHash('sha256')
               .update(password)
               .digest('hex');

          foundUser.password = hashedPassword;
          foundUser.resetOTP = null;
          await foundUser.save();

          res.json({ message: 'Password reset successful' });
     } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
     }
});

//export
module.exports = router;