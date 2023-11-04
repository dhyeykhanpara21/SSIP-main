// helper function to generate token
const jwt = require('jsonwebtoken');
const secret_key = require('../config').secret_key;

function generateToken(user) {
     return jwt.sign(user, secret_key, { expiresIn: '1h' });
   }

//export
module.exports = {
     generateToken
}
