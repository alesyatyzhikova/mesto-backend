const router = require('express').Router();

const { getUsers, getUser, createUser, updateUser, updateUserAvatar } = require('../controllers/users');

// Получаем всех пользователей
router.get('/users', getUsers);

// Получаем объект отдельного пользователя по id
router.get('/users/:id', getUser);

// Создаем пользователя
router.post('/users', createUser);

// Обновляем информацию о пользователе
router.patch('/users/me', updateUser);

// Обновляем аватар пользователя
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
