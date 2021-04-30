const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const IngredientSchema = require('./Ingredient').Schema;

const FoodSchema = new Schema({
  name: String,
  type: String,
  ingredients: [IngredientSchema],
  price: Number
});

const Food = mongoose.model('Food', FoodSchema);

module.exports = { Schema: FoodSchema, Food };
