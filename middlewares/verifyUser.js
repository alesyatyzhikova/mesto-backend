
function verifyUser(req, res, next) {
  try {
    if (req.user._id.toString() !== req.params.id) {
      return res.status(401).send({ message: 'Нет прав на изменение профиля' });
    }
  } catch (err) {
    return res.status(500).send({ message: 'Что-то пошло не так', err: err.message });
  }

  next();
}

module.exports = verifyUser;
