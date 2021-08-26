const express = require('express');
const router = express.Router();
const User = require('../models/User').User;
const Order = require('../models/Order');
const Food = require('../models/Food').Food;

router.get('/', async (req, res) => {
  const orders = await Order.find();
  res.json({ res: orders });
});

router.get('/:id', async (req, res) => {
  const exists = await Order.exists({ _id: req.params.id });
  if (exists) {
    const order = await Order.findById(req.params.id);
    res.json({ res: order });
  }
});

module.exports = router;
