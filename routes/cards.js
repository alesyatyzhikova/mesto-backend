const router = require('express').Router();

const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');

// Получить все карточки
router.get('/cards', getCards);

// Создать карточку
router.post('/cards', createCard);

// Удалить карточку
router.delete('/cards/:id', deleteCard);

// Поставить лайк
router.put('/cards/:id/likes', likeCard);

// Удалить лайк
router.delete('/cards/:id/likes', dislikeCard);

module.exports = router;
