const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FoodSchema = require('./Food').Schema;

const PromoSchema = new Schema({
  item: FoodSchema,
  type: String,
  points: Number,
  discount: Number
});

const Promo = mongoose.model('Promo', PromoSchema);

module.exports = { Schema: PromoSchema, Promo };
