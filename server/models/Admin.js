const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  email: String,
  password: String,
  firstname: String,
  lastname: String
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
