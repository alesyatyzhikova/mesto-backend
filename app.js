const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { PORT, DATABASE } = require('./config');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const routes = require('./routes');

// Init express
const app = express();

// База данных
mongoose.connect(DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', createUser);
app.post('/signin', login);
app.use(auth);
app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({ message: err.statusCode === 500 ? 'Ошибка сервера' : err.message });
});

app.listen(PORT);
