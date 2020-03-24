const router = require('express').Router();

const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');
const verifyCardOwner = require('../middlewares/verifyCardOwner');

// Получить все карточки
router.get('/', getCards);

// Создать карточку
router.post('/', createCard);

// Удалить карточку
router.delete('/:id', verifyCardOwner, deleteCard);

// Поставить лайк
router.put('/:id/likes', likeCard);

// Удалить лайк
router.delete('/:id/likes', dislikeCard);

module.exports = router;
