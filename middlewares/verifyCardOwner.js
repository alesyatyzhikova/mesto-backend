
function verifyCardOwner(req, res, next) {
  try {
    if (req.user._id.toString() !== req.body.owner) {
      return res.status(401).send({ message: 'Нет прав на удаление карточки' });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }

  next();
}

module.exports = verifyCardOwner;
