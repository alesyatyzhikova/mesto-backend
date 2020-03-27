const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = require('../config');

module.exports = (req, res, next) => {
  const token = req.headers.cookie;

  if (!token) return res.status(401).send({ message: 'Необходима авторизация' });

  let payload;

  try {
    payload = jwt.verify(token.replace('jwt=', ''), JWT_SECRET_KEY);
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  req.user = payload;

  next();
};
