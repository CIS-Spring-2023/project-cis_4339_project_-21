const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Importing data model schemas
const { User } = require('../models/models');

// POST endpoint for creating a new user
router.post('/signup', async (req, res, next) => {
  const { username, password, role } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // The second parameter is the salt round
    const newUser = new User({ username, password: hashedPassword, role });

    const data = await newUser.save();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// POST endpoint for logging in a user
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    res.json({ 
        message: 'Authentication successful',
        user: {
            username: user.username,
            role: user.role 
        }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;