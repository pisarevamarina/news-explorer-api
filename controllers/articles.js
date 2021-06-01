const Article = require('../models/article');
const ForbiddenError = require('../errors/Forbidden-Error');
const NotFoundError = require('../errors/Not-Found-Error');
const BadRequestError = require('../errors/Bad-Request-Error');

const getArticles = async (req, res, next) => {
  try {
    const owner = req.user.id;
    const articles = await Article.find({ owner })
      .orFail(new NotFoundError('У пользователя нет сохраненных статей'));
    res.status(200).send(articles);
  } catch (err) {
    next(err);
  }
};

const createArticle = async (req, res, next) => {
  try {
    const {
      keyword, title, text, date, source, link, image,
    } = req.body;
    const owner = req.user.id;
    await Article.create({
      keyword, title, text, date, source, link, image, owner,
    });
    res.status(200).send({
      keyword, title, text, date, source, link, image,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданные данные - некоректны'));
    } else {
      next(err);
    }
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const owner = req.user.id;
    const article = await Card.findById(req.params.id);
    if (!article) {
      throw new NotFoundError('Нет карточки с таким id');
    } else if (owner !== article.owner.toString()) {
      throw new ForbiddenError('Эту карточку нельзя удалить');
    }
    const validArticle = await Article.findByIdAndRemove(article);
    res.send(validArticle);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Произошла ошибка' });
    }
    next(err);
  }
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
