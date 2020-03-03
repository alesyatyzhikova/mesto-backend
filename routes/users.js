const router = require('express').Router();

const users = require('../data/users.json');

router.get('/', (req, res) => {
  res.json(users);
});

// Запрос для получения объекта отдельного пользователя по id
router.get('/:id', (req, res) => {
  const userId = req.params.id;

  const foundUser = users.find((user) => user._id === userId);

  if (!foundUser) {
    res.status(404).json({ message: 'Нет пользователя с таким id' });
    return;
  }

  return res.json(foundUser);
});

module.exports = router;
