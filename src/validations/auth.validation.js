const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.email': 'email:Not a valid email address.',
      'string.empty': 'email:Please provide your email.',
      'any.required': 'email:Please provide your email.',
    }),
    password: Joi.string().required().custom(password).messages({
      'string.empty': 'password:Please provide a password.',
      'any.required': 'password:Please provide a password.',
    }),
    confirmPassword: Joi.string().required().equal(Joi.ref('password')).messages({
      'string.empty': 'confirmPassword:Passwords do not match.',
      'any.required': 'confirmPassword:Passwords do not match.',
      'any.ref': 'confirmPassword:Passwords do not match.',
      'any.only': 'confirmPassword:Passwords do not match.',
    }),
    firstName: Joi.string().required().messages({
      'string.empty': 'firstName:Please provide your first name.',
      'any.required': 'firstName:Please provide your first name.',
    }),
    lastName: Joi.string().required().messages({
      'string.empty': 'lastName:Please provide your last name.',
      'any.required': 'lastName:Please provide your last name.',
    }),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.email': 'email:Not a valid email address.',
      'string.empty': 'email:Please provide your email.',
      'any.required': 'email:Please provide your email.',
    }),
    password: Joi.string().required().messages({
      'string.empty': 'password:Please provide a password.',
      'any.required': 'password:Please provide a password.',
    }),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
    confirmPassword: Joi.string().required().equal(Joi.ref('password')),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
