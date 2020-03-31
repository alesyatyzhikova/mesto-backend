const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');
const NotAuthError = require('../errors/notAuthError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) throw new NotAuthError('Необходима авторизация');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    const error = new NotAuthError('Необходима авторизация');
    next(error);
  }

  req.user = payload;

  next();
};
