const express = require('express');
const app = express();
const port = 5000;
const consola = require('consola');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/infiniscan');

// Routes
const indexRoute = require('./routes/index.route');

app.use('/', indexRoute);

app.listen(port, () => {
  consola.ready({ message: `Infiniscan is now listening at http://localhost:${port}`, badge: true });
});
