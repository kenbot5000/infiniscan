const express = require('express');
const router = express.Router();
const Ingredient = require('../models/Ingredient').Ingredient;

router.get('/', async (req, res) => {
  const ingredients = await Ingredient.find();
  res.json({ res: ingredients });
});

router.get('/:id', async (req, res) => {
  const exists = await Ingredient.exists({ _id: req.params.id });
  if (exists) {
    const ingredient = await Ingredient.findById(req.params.id);
    res.json({ res: ingredient });
  }
});

router.post('/', async (req, res) => {
  const exists = await Ingredient.exists({ name: req.body.name });
  if (exists) {
    res.status(400).json({ message: 'An ingredient with this name already exists' });
  } else {
    const newIngredient = new Ingredient({
      name: req.body.name,
      serving: req.body.serving,
      itemtype: req.body.itemtype,
      stock: req.body.stock
    });
    await newIngredient.save();
    res.sendStatus(201);
  }
});
