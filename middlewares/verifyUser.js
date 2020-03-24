
function verifyUser(req, res, next) {
  try {
    if (req.card.owner.toString() !== req.body._id) {
      return res.status(401).send({ message: 'Нет прав на изменение профиля' });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }

  next();
}

module.exports = verifyUser;
