const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  const users = await User.find();
  res.json({ res: users });
});

router.get('/:id', async (req, res) => {
  const exists = await User.exists({ _id: req.params.id });
  if (exists) {
    const user = await User.findById(req.params.id);
    res.json({ res: user });
  } else {
    res.status(404).json({ message: 'User does not exist' });
  }
});

router.post('/', async (req, res) => {
  const exists = await User.exists({ email: req.body.email });
  if (exists) {
    res.status(400).json({ message: 'A user with the email currently exists.' });
  } else {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname
    });
    await newUser.save();
    res.sendStatus(201);
  }
});

router.patch('/:id', async (req, res) => {
  const exists = await User.exists({ _id: req.params.id });
  if (exists) {
    const user = await User.findOne({ _id: req.query.id });
    user.email = req.body.email;
    user.password = req.body.password;
    user.lastname = req.body.lastname;
    user.firstname = req.body.firstname;
    await user.save();
    res.json({ res: user });
  } else {
    res.status(404).json({ message: 'User does not exist' });
  }
});

router.delete('/:id', async (req, res) => {
  const exists = await User.exists({ _id: req.params.id });
  if (exists) {
    await User.findByIdAndRemove(req.params.id);
  } else {
    res.status(404).json({ message: 'User does not exist' });
  }
});

module.exports = router;
