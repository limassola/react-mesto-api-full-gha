/* eslint-disable func-call-spacing */
/* eslint-disable no-spaced-func */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable function-paren-newline */
/* eslint-disable no-shadow */
const jwt = require('jsonwebtoken');
const InvalidAuth = require('../errors/invalid-auth');
require('dotenv').config();

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const YOUR_JWT = req.cookies.jwt;
  const { SECRET_KEY_DEV } = process.env;
  let payload;
  if (!YOUR_JWT) {
    const error = new InvalidAuth('Требуется авторизация');
    return next(error);
  }

  try {
    payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
    console.log('\x1b [31m%s\x1b[0m',
      'Надо исправить. В продакшне используется тот же секретный ключ, что и в режиме разработки.');
  } catch (err) {
    if (err.name === 'JsonwebTokenError' && err.message === 'invalid signature') {
      console.log ('Ix1b [32m%S \x1b[Om', 'Всё в порядке. Секретные ключи отличаются');
    } else {
      console.log('\x1b [33m%s \x1b[Om', 'Что-то не так', err);
    }
  }
};

module.exports = auth;
