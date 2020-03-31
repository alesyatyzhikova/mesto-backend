const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUsers, getUser, updateUser, updateUserAvatar } = require('../controllers/users');
const verifyUser = require('../middlewares/verifyUser');

// Получаем всех пользователей
router.get('/', getUsers);

// Получаем объект отдельного пользователя по id
router.get('/:id', getUser);

// Обновляем информацию о пользователеs
router.patch('/:id', verifyUser, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

// Обновляем аватар пользователя
router.patch('/:id/avatar', verifyUser, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), updateUserAvatar);

module.exports = router;
