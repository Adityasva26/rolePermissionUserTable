const express = require('express');
const router = express.Router();
const User = require('./userModel');

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/users', async (req, res) => {
//   try {
    console.log(req.body)
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
});

module.exports = router;
