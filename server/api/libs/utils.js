const constants = require('./constants');
const { transform } = require('lodash');
const bcrypt = require('bcrypt');
const AES = require('crypto-js/aes');
const ENC_UTF8 = require('crypto-js/enc-utf8');
const saltRounds = 10;

const authorizeHeader = (req, res, next) => {
  const apiKey = req.headers[constants.HEADER_KEY];
  if (apiKey !== constants.API_KEY) {
    res.json({
      success: false,
      message: 'Unauthorized header'
    });
  } else {
    next();
  }
};

const handleAsyncFunc = async (targetName, func, args) => {
  const [, , next] = args;
  let result;
  try {
    result = await func(...args);
  } catch (error) {
    next(error);
  }
  return result;
};

const aspectFunction = (targetName, func) =>
  (...args) => handleAsyncFunc(targetName, func, args);

const warpAsyncFunc = (module) => {
  return transform(
    module,
    (result, func, key) => {
      result[key] = aspectFunction(key, func);
    }
  );
};

const errorHandler = (
  err,
  request,
  res,
  next
) => {
  console.log(err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(400).json({
    message: err.message,
    error: err
  });
};

const swaggerOption = {
  customCss: '.swagger-ui { margin-right: 7px; margin-bottom: 170px; }',
  explorer: true,
  swaggerOptions: {
    urls: [
      {
        url: '../swagger.json',
        name: 'TrAN API'
      }
    ]
  }
};

const hashPassword = function (password) {
  return bcrypt.hashSync(password, saltRounds);
};

const verifyPassword = function (password, hash) {
  return bcrypt.compareSync(password, hash);
};

const decryptPassword = function (password) {
  return AES.decrypt(password, constants.SQL_CONNECTION_KEY).toString(ENC_UTF8);
};

const encryptPassword = function (password) {
  return AES.encrypt(password, constants.SQL_CONNECTION_KEY).toString();
};

const utils = {
  authorizeHeader,
  warpAsyncFunc,
  errorHandler,
  hashPassword,
  verifyPassword,
  swaggerOption,
  decryptPassword,
  encryptPassword
};

module.exports = utils;
