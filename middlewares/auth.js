const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // const token = req.headers.cookie;
  const token = req.headers.cookie.replace('jwt=', '');

  if (!token) return res.status(401).send('Ошибка');

  let payload;

  try {
    payload = jwt.verify(token, 'some-key');
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  req.user = payload;

  next();
};
