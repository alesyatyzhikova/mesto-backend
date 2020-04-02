
const NotAuthError = require('../errors/notAuthError');

function verifyUser(req, res, next) {
  try {
    if (req.user._id.toString() !== req.params.id) {
      throw new NotAuthError('Нет прав на изменение профиля');
    }
  } catch (err) {
    next(err);
  }

  next();
}

module.exports = verifyUser;
