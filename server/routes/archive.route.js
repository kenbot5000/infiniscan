const express = require('express');
const router = express.Router();
const IngredientArchive = require('../models/Ingredient').IngredientArchive;

router.get('/ingredient', async (req, res) => {
  const ingredients = await IngredientArchive.find();
  res.json({ res: ingredients });
});

module.exports = router;
