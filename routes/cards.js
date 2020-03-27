const router = require('express').Router();

const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');

// Получить все карточки
router.get('/', getCards);

// Создать карточку
router.post('/', createCard);

// Удалить карточку
router.delete('/:id', deleteCard);

// Поставить лайк
router.put('/:id/likes', likeCard);

// Удалить лайк
router.delete('/:id/likes', dislikeCard);

module.exports = router;
