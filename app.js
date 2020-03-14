const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT, DATABASE } = require('./config');

const ownerId = require('./middlewares/ownerId');
const cards = require('./routes/cards');
const users = require('./routes/users');
const notFound = require('./routes/notFound');

// Init express
const app = express();

// База данных
mongoose.connect(DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Id пользователя
app.use(ownerId);

// Карточки
app.use(cards);

// Пользователи
app.use(users);

// Ошибки для несуществующих страниц
app.use(notFound);

app.listen(PORT);
