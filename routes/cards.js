const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');

// Получить все карточки
router.get('/', getCards);

// Создать карточку
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), createCard);

// Удалить карточку
router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().alphanum(),
  }),
}), deleteCard);

// Поставить лайк
router.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().alphanum(),
  }),
}), likeCard);

// Удалить лайк
router.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().alphanum(),
  }),
}), dislikeCard);

module.exports = router;
