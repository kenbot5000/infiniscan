const express = require('express');
const router = express.Router();
const IngredientArchive = require('../models/Ingredient').IngredientArchive;
const FoodArchive = require('../models/Food').FoodArchive;
// Models for restoration
const Ingredient = require('../models/Ingredient').Ingredient;
const Food = require('../models/Food').Food;

router.get('/ingredient', async (req, res) => {
  const ingredients = await IngredientArchive.find();
  res.json({ res: ingredients });
});

router.post('/ingredient/:id/restore', async (req, res) => {
  const archive = await IngredientArchive.findById(req.params.id);
  const toIngredient = new Ingredient(archive.toJSON());
  await toIngredient.save();

  await IngredientArchive.findByIdAndRemove(req.params.id);
  res.json({ res: 'Item has been successfully restored' });
});

router.delete('/ingredient/:id/delete', async (req, res) => {
  const deleteRequest = await IngredientArchive.deleteOne({ _id: req.params.id });
  if (deleteRequest.ok === 1 && deleteRequest.deletedCount === 1) {
    res.json({ res: 'Item has been successfully deleted.' });
  } else {
    res.status(404).json({ message: 'Item not found.' });
  }
});

router.get('/food', async (req, res) => {
  const food = await FoodArchive.find();
  res.json({ res: food });
});

router.post('/food/:id/restore', async (req, res) => {
  const archive = await FoodArchive.findById(req.params.id);
  const toFood = new Food(archive.toJSON());
  await toFood.save();

  await FoodArchive.findByIdAndRemove(req.params.id);
  res.json({ res: 'Item has been successfully restored.' });
});

router.delete('/food/:id/delete', async (req, res) => {
  const deleteRequest = await FoodArchive.deleteOne({ _id: req.params.id });
  if (deleteRequest.ok === 1 && deleteRequest.deletedCount === 1) {
    res.json({ res: 'Item has been successfully deleted.' });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

module.exports = router;
