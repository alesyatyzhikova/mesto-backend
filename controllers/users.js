const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');

// Получить всех пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail(() => new NotFoundError('Пользователи отсутствуют'))
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(err.statusCode || 500).send({ message: 'Что-то пошло не так', err: err.message }));
};

// Объект пользователя по id
module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => new NotFoundError('Нет такого пользователя'))
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(err.statusCode || 500).send({ message: 'Что-то пошло не так', err: err.message }));
};

// Создаем пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send({
      data: {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      },
    }))
    .catch((err) => res.status(500).send({ message: 'Что-то пошло не так', err: err.message }));
};

// Аутентификация
module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-key', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      }).send(token);
    })
    .catch((err) => res.status(401).send({ message: 'Что-то пошло не так', err: err.message }));
};

// Обновляем данные о пользователе
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Что-то пошло не так', err: err.message }));
};

// Обновляем аватар пользователя
module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Что-то пошло не так', err: err.message }));
};
