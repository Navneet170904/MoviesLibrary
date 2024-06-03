const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router(); 
require('dotenv').config()
const User = require('../models/User.model'); // Adjust the path according to your project structure

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Create a new user instance
    const newUser = new User({ name, email });

    // Hash the password before saving
    const saltRounds = 10;
    newUser.password = await bcrypt.hash(password, saltRounds);

    // Save the user to the database
    await newUser.save();

    res.status(201).send('User registered');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error registering user');
  }
});



router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.table(req.body)
    // Find the user by email
    const user = await User.findOne({ email });

    let username = user.name
    let userId = user._id
    if (!user) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    // console.log(isMatch)
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Create a token (assuming you want to use JWT for authentication)
    const token = jwt.sign({ id: user._id }, process.env.ENV_SECRET, { expiresIn: '1h' });

    // Send the token to the client
    res.status(200).json({ 'token':token , username:username , userid:userId });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

