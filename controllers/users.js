const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const { JWT_SECRET } = require('../config');

// Получить всех пользователей
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .orFail(() => new NotFoundError('Пользователи отсутствуют'))
    .then((users) => res.send({ data: users }))
    .catch(next);
};

// Объект пользователя по id
module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => new NotFoundError('Нет такого пользователя'))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

// Создаем пользователя
module.exports.createUser = (req, res, next) => {
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
    .catch(next);
};

// Аутентификация
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      }).send(token);
    })
    .catch(next);
};

// Обновляем данные о пользователе
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

// Обновляем аватар пользователя
module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};
