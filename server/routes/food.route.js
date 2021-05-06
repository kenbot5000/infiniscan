const express = require('express');
const router = express.Router();
const Food = require('../models/Food').Food;

router.get('/', async (req, res) => {
  const food = await Food.find();
  res.json({ res: food });
});

router.get('/:id', async (req, res) => {
  const exists = await Food.exists({ _id: req.params.id });
  if (exists) {
    const foodItem = await Food.findById(req.params.id);
    res.json({ res: foodItem });
  } else {
    res.status(404).json({ message: 'Food item does not exist' });
  }
});

router.post('/', async (req, res) => {
  const exists = await Food.exists({ name: req.body.name });
  if (exists) {
    res.status(400).json({ message: 'A food item with this name currently exists.' });
  } else {
    const newFoodItem = new Food({
      name: req.body.name,
      type: req.body.type,
      ingredients: req.body.ingredients,
      price: req.body.price
    });
    await newFoodItem.save();
    res.sendStatus(201);
  }
});

router.patch('/:id', async (req, res) => {
  const exists = await Food.exists({ _id: req.params.id });
  if (exists) {
    const food = await Food.findOne({ _id: req.params.id });
    food.name = req.body.name;
    food.type = req.body.type;
    food.ingredients = req.body.ingredients;
    food.price = req.body.price;
    await food.save();
    res.json({ res: food });
  } else {
    res.status(404).json({ message: 'Food item does not exist' });
  }
});

router.delete('/:id', async (req, res) => {
  const exists = await Food.exists({ _id: req.params.id });
  if (exists) {
    await Food.findByIdAndRemove(req.params.id);
  } else {
    res.status(404).json({ message: 'Food item does not exist' });
  }
});

module.exports = router;
