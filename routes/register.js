const router = require('express').Router();
const User = require('../models/user');
// const { sendOTP } = require('../middleware/sendOTP');
const { generateOTP } = require('../middleware/generateOTP');
const { temporaryUsers } = require('../middleware/temporaryUsers');

// Register endpoint
router.post('/register', async (req, res) => {
     try {
          const { username, password, email, mobile } = req.body;

          const foundUser = await User.findOne({ email }).exec();
          if (foundUser) {
               return res.json({ error: 'User already exists' });
          }

          const otp = generateOTP();
          // await sendOTP(email, otp);
          console.log(otp);

          // Store user details temporarily
          temporaryUsers[email] = { username, password, otp, mobile };

          res.json({ message: 'OTP sent successfully' });
     } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
     }
});

// export
module.exports = router;