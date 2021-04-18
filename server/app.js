const express = require('express');
const app = express();
const port = 5000;
const consola = require('consola');

// Routes
const indexRoute = require('./routes/index.route');

app.use('/', indexRoute);

app.listen(port, () => {
  consola.ready({ message: `Infiniscan is now listening at http://localhost:${port}`, badge: true });
});
