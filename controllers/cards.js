const Card = require('../models/card');

// Получаем все карточки
module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => {
      if (!cards) {
        return res.status(404).send({ message: 'Карточки не найдены' });
      }
      return res.send({ data: cards });
    })
    .catch((err) => res.status(500).send({ message: 'Что-то пошло не так', err: err.message }));
};

// Создаем карточку
module.exports.createCard = (req, res) => {
  const { name, link, likes } = req.body;
  const ownerId = req.user._id;

  Card.create({ name, link, owner: ownerId, likes })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: 'Что-то пошло не так', err: err.message }));
};

// Удаляем карточку
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.id)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Нет такой карточки' });
      }
      return res.send({ data: card });
    })
    .catch((err) => res.status(500).send({ message: 'Что-то пошло не так', err: err.message }));
};

// Ставим лайк
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => res.status(500).send({ message: 'Что-то пошло не так', err: err.message }));
};

// Удаляем лайк
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => res.status(500).send({ message: 'Что-то пошло не так', err: err.message }));
};
