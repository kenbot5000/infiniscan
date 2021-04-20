const express = require('express');
const app = express();
const port = 5000;
const consola = require('consola');
const mongoose = require('mongoose');
const dbConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
mongoose.connect('mongodb://localhost/infiniscan', dbConfig);

app.use(express.json());

// Routes
const userRoute = require('./routes/user.route');

app.use('/user', userRoute);

app.listen(port, () => {
  consola.ready({ message: `Infiniscan is now listening at http://localhost:${port}`, badge: true });
});
