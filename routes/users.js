const router = require('express').Router();

const { getUsers, getUser, updateUser, updateUserAvatar } = require('../controllers/users');

// Получаем всех пользователей
router.get('/', getUsers);

// Получаем объект отдельного пользователя по id
router.get('/:id', getUser);

// Обновляем информацию о пользователе
router.patch('/me', updateUser);

// Обновляем аватар пользователя
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
