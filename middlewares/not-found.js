const NotFoundError = require('../errors/Not-Found-Error');

const notFound = (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
};

module.exports = notFound;
