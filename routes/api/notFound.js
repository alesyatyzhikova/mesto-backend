const router = require('express').Router();

router.all('/*', (req, res) => {
  res.json({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
