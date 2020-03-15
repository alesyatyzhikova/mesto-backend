const ownerId = (req, res, next) => {
  req.user = {
    _id: '5e6611dbf987ac221d273c6f',
  };

  next();
};

module.exports = ownerId;
