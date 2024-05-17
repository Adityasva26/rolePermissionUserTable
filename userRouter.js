const express = require('express');
const router = express.Router();

const User = require('./userModel');
module.exports = (redis) => {
router.get('/', async (req, res) => {

    res.status(200).json("Hii wellcome to backend");
 
});
router.get('/users', async (req, res) => {
  try {
    const cachedUsers = await redis.get('users');

    if (cachedUsers) {
      return res.status(200).json(JSON.parse(cachedUsers));
    }

    // If not, fetch from MongoDB
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ message: 'No users found' });
    }

    // Save the fetched data in Redis with an expiration time of 1 hour
    await redis.set('users', JSON.stringify(users), 'EX', 1000);

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/users', async (req, res) => {
//   try {
    console.log(req.body)
    const newUser = await User.create(req.body);
    await redis.del('users');
    res.status(201).json(newUser);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
});
return router;
}
