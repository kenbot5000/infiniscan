const express = require('express');
const router = express.Router();
const Ingredient = require('../models/Ingredient').Ingredient;
const IngredientArchive = require('../models/Ingredient').IngredientArchive;

router.get('/', async (req, res) => {
  let ingredients;
  if (req.query.sortBy) {
    if (req.query.sortBy === 'type') {
      const query = await Ingredient.find({}).select({ _id: 0, itemtype: 1 });
      ingredients = query.map(function (item) { return item.itemtype; });
      ingredients = [...ingredients.reduce((p, c) => p.set(c, true), new Map()).keys()];
    }
  } else if (req.query.search) {
    ingredients = await Ingredient.find({ name: { $regex: req.query.search } });
  } else {
    ingredients = await Ingredient.find();
  }
  res.json({ res: ingredients });
});

router.get('/:id', async (req, res) => {
  if ((/^[0-9a-fA-F]{24}$/).test(req.params.id)) {
    const exists = await Ingredient.exists({ _id: req.params.id });
    if (exists) {
      const ingredient = await Ingredient.findById(req.params.id);
      res.json({ res: ingredient });
    } else {
      res.status(404).json({ message: 'Ingredient not found.' });
    }
  } else {
    res.status(404).json({ message: 'Ingredient not found.' });
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

router.patch('/:id', async (req, res) => {
  if ((/^[0-9a-fA-F]{24}$/).test(req.params.id)) {
    const exists = await Ingredient.exists({ _id: req.params.id });
    if (exists) {
      const ingredient = await Ingredient.findById(req.params.id);
      ingredient.name = req.body.name;
      ingredient.serving = req.body.serving;
      ingredient.itemtype = req.body.itemtype;
      ingredient.stock = req.body.stock;
      await ingredient.save();
      res.json({ res: ingredient });
    } else {
      res.status(404).json({ message: 'Ingredient does not exist' });
    }
  } else {
    res.status(404).json({ message: 'Ingredient not found.' });
  }
});

router.delete('/:id', async (req, res) => {
  const exists = await Ingredient.exists({ _id: req.params.id });
  if (exists) {
    const ingredient = await Ingredient.findById(req.params.id);
    const toArchive = new IngredientArchive(ingredient.toJSON());
    await toArchive.save();

    await Ingredient.findByIdAndRemove(req.params.id);
    res.json({ res: 'Item has been successfully moved to archive .' });
  } else {
    res.status(404).json({ message: 'Ingredient does not exist' });
  }
});

module.exports = router;
