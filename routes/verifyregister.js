const router = require('express').Router();
const User = require('../models/user');
const { temporaryUsers } = require('../middleware/temporaryUsers');
const crypto = require('crypto');

// OTP verification endpoint
router.post('/verifyregister', async (req, res) => {
  try {
    const { otp, email } = req.body;
    const user = temporaryUsers[email];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ error: 'Incorrect OTP' });
    }

    // Save user in the database
    const { username, password, mobile } = user;
    const hashedPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      mobile,
      isVerified: true,
    });

    await newUser.save();

    // Remove user details from temporary storage
    delete temporaryUsers[email];

    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//export
module.exports = router;