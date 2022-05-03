const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/UnauthorizedError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  try {
    const user = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');

    req.user = user;
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  next();
};
