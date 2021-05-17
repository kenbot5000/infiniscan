const express = require('express');
const router = express.Router();
const IngredientArchive = require('../models/Ingredient').IngredientArchive;
// Models for restoration
const Ingredient = require('../models/Ingredient').Ingredient;

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

module.exports = router;
