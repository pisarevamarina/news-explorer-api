const { celebrate, Joi, CelebrateError } = require('celebrate');


const validateDeleteArticle = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).id(),
  }),
});

const validatePostArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom((value, helpers) => {
      if (/https?:\/\/(www\.)?([a-zA-Zа-яА-я0-9/_%-])+\.[a-zA-Zа-яА-я0-9/_%-]+#?$/.test(value)) {
        return value;
      }
      return helpers.message('Невалидная ссылка');
    }),
    image: Joi.string().required().custom((value, helpers) => {
      if (/https?:\/\/(www\.)?([a-zA-Zа-яА-я0-9/_%-])+\.[a-zA-Zа-яА-я0-9/_%-]+#?$/.test(value)) {
        return value;
      }
      return helpers.message('Невалидная ссылка');
    }),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().trim().required().min(8),
  }),
});

const validateUserOnRegister = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().trim().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports = {
  validateUser,
  validateUserOnRegister,
  validatePostArticle,
  validateDeleteArticle,
};
