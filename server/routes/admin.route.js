const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

router.get('/', async (req, res) => {
  const admins = await Admin.find();
  res.json({ res: admins });
});

router.get('/:id', async (req, res) => {
  const exists = await Admin.exists({ _id: req.params.id });
  if (exists) {
    const admin = await Admin.findById(req.params.id);
    res.json({ res: admin });
  } else {
    res.status(404).json({ message: 'Admin does not exist' });
  }
});

router.post('/', async (req, res) => {
  const exists = await Admin.exists({ email: req.body.email });
  if (exists) {
    res.status(400).json({ message: 'An admin account with the email already exists.' });
  } else {
    const newAdmin = new Admin({
      email: req.body.email,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname
    });
    await newAdmin.save();
    res.sendStatus(201);
  }
});

router.patch('/:id', async (req, res) => {
  const exists = await Admin.exists({ _id: req.params.id });
  if (exists) {
    const admin = await Admin.findOne({ _id: req.params.id });
    admin.email = req.body.email;
    admin.password = req.body.password;
    admin.firstname = req.body.firstname;
    admin.lastname = req.body.lastname;
    await admin.save();
    res.json({ res: admin });
  } else {
    res.status(404).json({ message: 'Admin does not exist' });
  }
});

router.delete('/:id', async (req, res) => {
  const exists = await Admin.exists({ _id: req.params.id });
  if (exists) {
    await Admin.deleteOne({ _id: req.params.id });
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: 'Admin does not exist' });
  }
});

router.post('/auth/login', async (req, res) => {
  const exists = await Admin.exists({ email: req.body.email });
  if (exists) {
    const admin = await Admin.findOne({ email: req.body.email });
    if (admin.password === req.body.password) {
      res.json({
        res: JSON.stringify({
          firstname: admin.firstname,
          id: admin._id
        })
      });
    } else {
      res.status(401).json({ message: 'Incorrect password.' });
    }
  } else {
    res.status(404).json({ message: 'An account with that email does not exist.' });
  }
});

module.exports = router;
