const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
  if (!value || validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const validateUserSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).default('Jacques Cousteau').allow('', null),
    about: Joi.string().min(2).max(30).default('Explorador').allow('', null),
    avatar: Joi.string().custom(validateURL).default('https://amazonaws.com').allow('', null),
  }),
});

const validateUserSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateIdParam = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  validateUserSignup,
  validateUserSignin,
  validateIdParam,
};
