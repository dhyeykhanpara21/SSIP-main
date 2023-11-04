const router = require('express').Router();
const crypto = require('crypto');
const User = require('../models/user');
const { generateToken } = require('../middleware/generateToken');

// Route for user login
router.post('/login', async (req, res) => {
     try {
          const { email, password } = req.body;

          const foundUser = await User.findOne({ email }).exec();
          if (!foundUser) {
               res.status(404).json({ error: 'User not found' });
               return;
          }

          const hashedPassword = crypto
               .createHash('sha256')
               .update(password)
               .digest('hex');

          if (foundUser.password === hashedPassword) {
               const token = generateToken({ email });
               res.json({ message: 'Login successful', token });
          } else {
               res.status(401).json({ error: 'Incorrect password' });
          }
     } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
     }
});

//export
module.exports = router;
