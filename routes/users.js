const router = require('express').Router();

const { getUsers, getUser, updateUser, updateUserAvatar } = require('../controllers/users');
const verifyUser = require('../middlewares/verifyUser');

// Получаем всех пользователей
router.get('/', getUsers);

// Получаем объект отдельного пользователя по id
router.get('/:id', getUser);

// Обновляем информацию о пользователе
router.patch('/:id', verifyUser, updateUser);

// Обновляем аватар пользователя
router.patch('/:id/avatar', verifyUser, updateUserAvatar);

module.exports = router;
