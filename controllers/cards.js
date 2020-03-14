const Card = require('../models/card');
const NotFoundError = require('../errors/notFoundError');

// Получаем все карточки
module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .orFail(() => new NotFoundError('Карточки не найдены'))
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(err.statusCode || 500).send({ message: 'Что-то пошло не так', err: err.message }));
};

// Создаем карточку
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  Card.create({ name, link, owner: ownerId })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(err.statusCode || 500).send({ message: 'Что-то пошло не так', err: err.message }));
};

// Удаляем карточку
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.id)
    .orFail(() => new NotFoundError('Нет такой карточки'))
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(err.statusCode || 500).send({ message: 'Что-то пошло не так', err: err.message }));
};

// Ставим лайк
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .orFail(() => new NotFoundError('Нет такой карточки'))
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(err.statusCode || 500).send({ message: 'Что-то пошло не так', err: err.message }));
};

// Удаляем лайк
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true })
    .orFail(() => new NotFoundError('Нет такой карточки'))
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(err.statusCode || 500).send({ message: 'Что-то пошло не так', err: err.message }));
};
