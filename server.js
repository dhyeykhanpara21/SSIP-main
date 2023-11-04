const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/logiApi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Failed to connect to MongoDB:', error);
});

// Use body-parser to parse incoming requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Import routes
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const reset = require('./routes/reset');
const verifyEmail = require('./routes/verifyregister');
const resetEmail = require('./routes/verifyreset');
const addProduct = require('./routes/addProduct');

// use routes
app.use(loginRoute);
app.use(registerRoute);
app.use(reset);
app.use(verifyEmail);
app.use(resetEmail);
app.use(addProduct);



// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
