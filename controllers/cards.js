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
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(err.statusCode || 500).send({ message: 'Что-то пошло не так', err: err.message }));
};

// Удаляем карточку
module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .orFail(() => new NotFoundError('Нет такой карточки'))
    .then((card) => {
      if (card.owner._id.toString() !== req.user._id) {
        return res.status(401).send({ message: 'Нет прав на удаление' });
      }
      return Card.findByIdAndDelete(req.params.id)
        .then((cardId) => {
          res.send({ data: cardId });
        })
        .catch((err) => res.status(404).send({ message: 'Нет такой карточки', err: err.message }));
    })
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
