const User = require('../models/user');

// Получить всех пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (!users) {
        return res.status(404).send({ message: 'Нет пользователей' });
      }
      return res.send({ data: users });
    })
    .catch((err) => res.status(500).send({ message: 'Что-то пошло не так', err: err.message }));
};

// Объект пользователя по id
module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      return res.send({ data: user });
    })
    .catch((err) => res.status(500).send({ message: 'Что-то пошло не так', err: err.message }));
};

// Создаем пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Что-то пошло не так', err: err.message }));
};

// Обновляем данные о пользователе
module.exports.updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(userId,
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
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Что-то пошло не так', err: err.message }));
};
