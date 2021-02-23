const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/Not-Found-Error');
const UnauthorizedError = require('../errors/Unauthorized-Error');
const ConflictError = require('../errors/Conflict-Error');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new NotFoundError('Такой пользователь не существует');
    } else {
      res.send(user);
    }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Произошла ошибка' });
    }
    next(err);
  }
};

const createUser = (req, res, next) => {
  const {name, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Такой email уже существует');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      User.create({ name, email, password: hash })
        .then(() => {
          res.send({ name, email });
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Введенные данные некоректны');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Проверьте правильность ввода');
          }
          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getUser,
  createUser,
  login,
};
