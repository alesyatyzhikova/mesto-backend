const router = require('express').Router();

const cards = require('./cards');
const users = require('./users');

router.use('/cards', cards);
router.use('/users', users);
router.all('*', (req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
