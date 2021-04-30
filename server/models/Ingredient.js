const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  name: String,
  serving: String,
  itemtype: String,
  stock: Number
});

const Ingredient = mongoose.model('Ingredient', IngredientSchema);

// ? Remember to use Ingredient.Ingredient when importing
module.exports = { Schema: IngredientSchema, Ingredient };
