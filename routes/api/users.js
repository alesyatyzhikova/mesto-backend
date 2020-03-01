const router = require('express').Router();
const users = require('../../data/users.json');

router.get('/', (req, res) => {
  res.json(users);
});

// Запрос для получения объекта отдельного пользователя по id
router.get('/:id', (req, res) => {
  const userId = req.params.id;

  const foundId = users.some((user) => user._id === userId);

  if (foundId) {
    res.json(users.filter((user) => user._id === userId));
  } else {
    res.status(404).json({ message: 'Нет пользователя с таким id' });
  }
});

module.exports = router;
