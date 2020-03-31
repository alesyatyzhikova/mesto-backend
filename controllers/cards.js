const Card = require('../models/card');
const NotFoundError = require('../errors/notFoundError');
const NotAuthError = require('../errors/notAuthError');

// Получаем все карточки
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .orFail(() => new NotFoundError('Карточки не найдены'))
    .then((card) => res.send({ data: card }))
    .catch(next);
};

// Создаем карточку
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

// Удаляем карточку
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(() => new NotFoundError('Нет такой карточки'))
    .then((card) => {
      if (card.owner._id.toString() !== req.user._id) {
        throw new NotAuthError('Нет прав на удаление карточки');
      }
      return Card.findByIdAndDelete(req.params.id)
        .then((cardId) => res.send({ data: cardId }));
    })
    .catch(next);
};

// Ставим лайк
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .orFail(() => new NotFoundError('Нет такой карточки'))
    .then((card) => res.send({ data: card }))
    .catch(next);
};

// Удаляем лайк
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true })
    .orFail(() => new NotFoundError('Нет такой карточки'))
    .then((card) => res.send({ data: card }))
    .catch(next);
};
