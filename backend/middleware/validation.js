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

const validateUserProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
});

const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
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
  validateUserProfile,
  validateUserAvatar,
  validateCardBody,
  validateIdParam,
};
