const { NotFoundError } = require('./NotFoundError');

// проверка на поиск по некорректным данным
const checkRes = (res) => {
  if (res === null) {
    throw new NotFoundError('Объект с указанным _id не найден');
  }
  return res;
};

module.exports = { checkRes };
