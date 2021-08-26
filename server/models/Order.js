const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = require('./User').Schema;
const FoodSchema = require('./Food').Schema;
const PromoSchema = require('./Promo').Schema;

const OrderSchema = new Schema({
  user: UserSchema,
  items: [FoodSchema],
  total: Number,
  promo: [PromoSchema],
  subtotal: Number
});

const Order = mongoose.model('Order', OrderSchema);
const OrderArchive = mongoose.model('OrderArchive', OrderSchema);

module.exports = { Order, OrderArchive };
